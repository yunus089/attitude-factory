import { prisma } from "@/src/lib/prisma";

const PORTFOLIO_TARGET = {
  total: 24,
  launchWave: 6,
  backlog: 18
};

const optionalPersonaColumns = [
  "ownerUserId",
  "operatorUserId",
  "launchWave",
  "launchWaveOrder",
  "launchOrder",
  "backlogActivationNote",
  "setcardStatus",
  "mediaReadinessStatus"
] as const;

const personaAccentByName: Record<string, string> = {
  "David Chen": "#2F6FED",
  "Zara Patel": "#D85C82",
  "Luna Stone": "#8C7A54",
  "Alex Moreno": "#F36B2D",
  "Sophie Larue": "#D14FB4",
  "Emma Winters": "#4D8A72"
};

type StablePersonaRow = {
  id: string;
  name: string;
  publicName: string;
  lane: string;
  niche: string;
  status: string;
  priorityScore: number;
};

type PersonaOptionalFields = Partial<Record<(typeof optionalPersonaColumns)[number], unknown>> & {
  id: string;
};

type UserOwnerRow = {
  id: string;
  name: string;
  role: string | null;
};

type InstagramAccountRow = {
  personaId: string;
  handle: string | null;
  status: string | null;
};

type AssetCountRow = {
  personaId: string;
  count: number;
};

export type PersonaBoardStatusTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "active";

export type PersonaPortfolioEntry = {
  id: string;
  name: string;
  publicName: string;
  lane: string;
  niche: string;
  statusLabel: string;
  statusTone: PersonaBoardStatusTone;
  ownerLabel: "Gründer" | "Partner" | "Offen";
  isLaunchWave: boolean;
  launchOrder: number | null;
  priorityScore: number;
  scoreLabel: string;
  scoreTone: PersonaBoardStatusTone;
  activationLabel: string;
  nextStep: string;
  setcardLabel: string;
  setcardState: "bereit" | "pruefen" | "fehlt" | "offen";
  mediaLabel: string;
  mediaState: "bereit" | "aufbauen" | "offen";
  instagramHandle: string | null;
  instagramStatusLabel: string;
  accentColor: string;
};

export type PersonaPortfolioSummary = {
  totalTarget: number;
  totalActual: number;
  launchTarget: number;
  launchActual: number;
  backlogTarget: number;
  backlogActual: number;
  founderOwned: number;
  partnerOwned: number;
  ownerOpen: number;
  setcardsReady: number;
  setcardsOpen: number;
  mediaReady: number;
  mediaOpen: number;
};

export type PersonaPortfolioBoardData = {
  loadState: "bereit" | "teilweise" | "leer" | "nicht_erreichbar";
  issueTitle: string | null;
  issueDescription: string | null;
  personas: PersonaPortfolioEntry[];
  summary: PersonaPortfolioSummary;
};

export async function getPersonaPortfolioBoardData(): Promise<PersonaPortfolioBoardData> {
  try {
    const rows = await prisma.persona.findMany({
      select: {
        id: true,
        name: true,
        publicName: true,
        lane: true,
        niche: true,
        status: true,
        priorityScore: true
      },
      orderBy: [{ priorityScore: "desc" }, { name: "asc" }]
    });

    if (rows.length === 0) {
      return {
        loadState: "leer",
        issueTitle: "Persona-Datenkern ist leer",
        issueDescription:
          "Die Arbeitsfläche ist bereit, aber es wurden noch keine Persona-Datensätze gefunden. Sobald der Seed für alle 20 Personas gelaufen ist, erscheint hier das komplette Portfolio.",
        personas: [],
        summary: buildSummary([])
      };
    }

    const [
      optionalFields,
      usersById,
      instagramAccounts,
      setcardAssetCounts,
      mediaAssetCounts
    ] = await Promise.all([
      readOptional("optionale Persona-Felder", readOptionalPersonaFields, []),
      readOptional("Owner-Nutzer", readUsersById, new Map<string, UserOwnerRow>()),
      readOptional("Instagram-Konten", readInstagramAccounts, []),
      readOptional("Setcard-Medien", () => readAssetCounts("setcard"), []),
      readOptional("Medien-Zähler", () => readAssetCounts(), [])
    ]);

    const optionalById = new Map(optionalFields.map((item) => [item.id, item]));
    const instagramByPersonaId = new Map(
      instagramAccounts.map((account) => [account.personaId, account])
    );
    const setcardCountByPersonaId = new Map(
      setcardAssetCounts.map((asset) => [asset.personaId, Number(asset.count)])
    );
    const mediaCountByPersonaId = new Map(
      mediaAssetCounts.map((asset) => [asset.personaId, Number(asset.count)])
    );

    const personas = rows.map((row) =>
      toPersonaEntry({
        row,
        optional: optionalById.get(row.id),
        usersById,
        instagram: instagramByPersonaId.get(row.id),
        setcardAssetCount: setcardCountByPersonaId.get(row.id) ?? 0,
        mediaAssetCount: mediaCountByPersonaId.get(row.id) ?? 0
      })
    );

    const summary = buildSummary(personas);
    const loadState =
      summary.totalActual === PORTFOLIO_TARGET.total &&
      summary.launchActual === PORTFOLIO_TARGET.launchWave
        ? "bereit"
        : "teilweise";

    return {
      loadState,
      issueTitle:
        loadState === "teilweise" ? "Persona-Portfolio ist teilweise gefüllt" : null,
      issueDescription:
        loadState === "teilweise"
          ? "Die Oberfläche arbeitet mit den vorhandenen DB-Daten. Für die Startlogik fehlen noch Datensätze oder Startwellen-Markierungen."
          : null,
      personas,
      summary
    };
  } catch (error) {
    console.error("Persona-Portfolio konnte nicht geladen werden.", error);

    return {
      loadState: "nicht_erreichbar",
      issueTitle: "Persona-Datenkern nicht erreichbar",
      issueDescription:
        "Prüfe Datenbank, Migration und Persona-Seed. Die Seite bleibt absichtlich erklärend, damit kein Operator eine leere Arbeitsfläche mit einem leeren Portfolio verwechselt.",
      personas: [],
      summary: buildSummary([])
    };
  }
}

async function readOptional<T>(
  label: string,
  read: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await read();
  } catch (error) {
    console.warn(`Optionale Persona-Daten übersprungen: ${label}`, error);

    return fallback;
  }
}

async function readOptionalPersonaFields(): Promise<PersonaOptionalFields[]> {
  if (!(await tableExists("Persona"))) return [];

  const columns = await readColumns("Persona");
  const selectedOptionalColumns = optionalPersonaColumns.filter((column) =>
    columns.has(column)
  );

  if (selectedOptionalColumns.length === 0) {
    return [];
  }

  const selectList = [
    `"id"`,
    ...selectedOptionalColumns.map((column) => `"${column}" AS "${column}"`)
  ].join(", ");

  return prisma.$queryRawUnsafe<PersonaOptionalFields[]>(
    `SELECT ${selectList} FROM "Persona"`
  );
}

async function readUsersById(): Promise<Map<string, UserOwnerRow>> {
  if (!(await tableExists("user"))) return new Map();

  const rows = await prisma.$queryRaw<UserOwnerRow[]>`
    SELECT "id", "name", "role"::text AS "role"
    FROM "user"
  `;

  return new Map(rows.map((row) => [row.id, row]));
}

async function readInstagramAccounts(): Promise<InstagramAccountRow[]> {
  if (!(await tableExists("PlatformAccount"))) return [];

  return prisma.$queryRaw<InstagramAccountRow[]>`
    SELECT "personaId", "handle", "status"
    FROM "PlatformAccount"
    WHERE "platform"::text = 'instagram'
  `;
}

async function readAssetCounts(assetType?: "setcard"): Promise<AssetCountRow[]> {
  if (!(await tableExists("AssetFile"))) return [];

  if (assetType === "setcard") {
    return prisma.$queryRaw<AssetCountRow[]>`
      SELECT "personaId", COUNT(*)::int AS "count"
      FROM "AssetFile"
      WHERE "personaId" IS NOT NULL
        AND "assetType"::text = 'setcard'
      GROUP BY "personaId"
    `;
  }

  return prisma.$queryRaw<AssetCountRow[]>`
    SELECT "personaId", COUNT(*)::int AS "count"
    FROM "AssetFile"
    WHERE "personaId" IS NOT NULL
    GROUP BY "personaId"
  `;
}

async function tableExists(tableName: string): Promise<boolean> {
  const rows = await prisma.$queryRaw<Array<{ exists: boolean }>>`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = current_schema()
        AND table_name = ${tableName}
    ) AS "exists"
  `;

  return rows[0]?.exists ?? false;
}

async function readColumns(tableName: string): Promise<Set<string>> {
  const rows = await prisma.$queryRaw<Array<{ columnName: string }>>`
    SELECT column_name AS "columnName"
    FROM information_schema.columns
    WHERE table_schema = current_schema()
      AND table_name = ${tableName}
  `;

  return new Set(rows.map((row) => row.columnName));
}

function toPersonaEntry({
  row,
  optional,
  usersById,
  instagram,
  setcardAssetCount,
  mediaAssetCount
}: {
  row: StablePersonaRow;
  optional: PersonaOptionalFields | undefined;
  usersById: Map<string, UserOwnerRow>;
  instagram: InstagramAccountRow | undefined;
  setcardAssetCount: number;
  mediaAssetCount: number;
}): PersonaPortfolioEntry {
  const isLaunchWave = booleanFromOptional(optional?.launchWave) ?? row.status === "AKTIV";
  const launchOrder =
    numberFromOptional(optional?.launchWaveOrder) ?? numberFromOptional(optional?.launchOrder);
  const ownerLabel = ownerLabelFor(optional, usersById);
  const setcardState = setcardStateFor(optional?.setcardStatus, setcardAssetCount);
  const mediaState = mediaStateFor(optional?.mediaReadinessStatus, mediaAssetCount);
  const status = statusFor(row.status, isLaunchWave);
  const score = scoreFor(row.priorityScore);
  const backlogActivationNote = textFromOptional(optional?.backlogActivationNote);

  return {
    id: row.id,
    name: row.name,
    publicName: row.publicName,
    lane: row.lane,
    niche: row.niche,
    statusLabel: status.label,
    statusTone: status.tone,
    ownerLabel,
    isLaunchWave,
    launchOrder,
    priorityScore: row.priorityScore,
    scoreLabel: score.label,
    scoreTone: score.tone,
    activationLabel: activationLabelFor(row.priorityScore, isLaunchWave, launchOrder),
    nextStep: nextStepFor({
      isLaunchWave,
      setcardState,
      mediaState,
      hasInstagramHandle: Boolean(instagram?.handle),
      backlogActivationNote
    }),
    setcardLabel: setcardLabelFor(setcardState),
    setcardState,
    mediaLabel: mediaLabelFor(mediaState),
    mediaState,
    instagramHandle: instagram?.handle ?? null,
    instagramStatusLabel: platformStatusLabelFor(instagram?.status),
    accentColor: personaAccentByName[row.name] ?? "#646A6F"
  };
}

function buildSummary(personas: PersonaPortfolioEntry[]): PersonaPortfolioSummary {
  const launchActual = personas.filter((persona) => persona.isLaunchWave).length;

  return {
    totalTarget: PORTFOLIO_TARGET.total,
    totalActual: personas.length,
    launchTarget: PORTFOLIO_TARGET.launchWave,
    launchActual,
    backlogTarget: PORTFOLIO_TARGET.backlog,
    backlogActual: personas.length - launchActual,
    founderOwned: personas.filter((persona) => persona.ownerLabel === "Gründer").length,
    partnerOwned: personas.filter((persona) => persona.ownerLabel === "Partner").length,
    ownerOpen: personas.filter((persona) => persona.ownerLabel === "Offen").length,
    setcardsReady: personas.filter((persona) => persona.setcardState === "bereit").length,
    setcardsOpen: personas.filter((persona) => persona.setcardState !== "bereit").length,
    mediaReady: personas.filter((persona) => persona.mediaState === "bereit").length,
    mediaOpen: personas.filter((persona) => persona.mediaState !== "bereit").length
  };
}

function ownerLabelFor(
  optional: PersonaOptionalFields | undefined,
  usersById: Map<string, UserOwnerRow>
): "Gründer" | "Partner" | "Offen" {
  const hasOperatorUserId = Boolean(
    optional && Object.prototype.hasOwnProperty.call(optional, "operatorUserId")
  );
  const operatorUserId = textFromOptional(optional?.operatorUserId);
  const ownerUserId = hasOperatorUserId ? null : textFromOptional(optional?.ownerUserId);
  const user = operatorUserId
    ? usersById.get(operatorUserId)
    : ownerUserId
      ? usersById.get(ownerUserId)
      : undefined;

  if (!user) return "Offen";

  const role = user.role?.toLowerCase();
  const name = user.name.toLowerCase();

  if (role === "gruender" || name.includes("gründer") || name.includes("gruender")) {
    return "Gründer";
  }

  if (role === "operator" || name.includes("partner") || name.includes("operator")) {
    return "Partner";
  }

  return "Offen";
}

function statusFor(
  rawStatus: string,
  isLaunchWave: boolean
): { label: string; tone: PersonaBoardStatusTone } {
  const normalized = rawStatus.toLowerCase();

  if (isLaunchWave || normalized === "aktiv") return { label: "Aktiv", tone: "active" };
  if (normalized === "pausiert") return { label: "Pausiert", tone: "warning" };
  if (normalized === "gestoppt") return { label: "Gestoppt", tone: "danger" };
  if (normalized === "archiviert") return { label: "Archiviert", tone: "neutral" };

  return { label: "Entwurf", tone: "neutral" };
}

function scoreFor(priorityScore: number): {
  label: string;
  tone: PersonaBoardStatusTone;
} {
  if (priorityScore <= 0) return { label: "Score offen", tone: "warning" };
  if (priorityScore >= 34) return { label: `${priorityScore}/40 hoch`, tone: "active" };
  if (priorityScore >= 28) return { label: `${priorityScore}/40 solide`, tone: "info" };

  return { label: `${priorityScore}/40 prüfen`, tone: "warning" };
}

function activationLabelFor(
  priorityScore: number,
  isLaunchWave: boolean,
  launchOrder: number | null
) {
  if (isLaunchWave) {
    return launchOrder
      ? `Startwelle #${launchOrder}: täglich vorbereiten und messen.`
      : "Startwelle: täglich vorbereiten und messen.";
  }

  if (priorityScore >= 34) {
    return "Backlog mit hohem Aktivierungspotenzial.";
  }

  if (priorityScore > 0) {
    return "Backlog: Score, Setcard und Claim-Grenzen prüfen.";
  }

  return "Aktivierungslogik offen: Score und Startgrund ergänzen.";
}

function nextStepFor({
  isLaunchWave,
  setcardState,
  mediaState,
  hasInstagramHandle,
  backlogActivationNote
}: {
  isLaunchWave: boolean;
  setcardState: PersonaPortfolioEntry["setcardState"];
  mediaState: PersonaPortfolioEntry["mediaState"];
  hasInstagramHandle: boolean;
  backlogActivationNote: string | null;
}) {
  if (setcardState === "fehlt" || setcardState === "offen") {
    return "Setcard erstellen oder freigeben.";
  }

  if (setcardState === "pruefen") {
    return "Setcard prüfen und als Referenz freigeben.";
  }

  if (mediaState !== "bereit") {
    return "Medienbereitschaft prüfen und Referenzen sichern.";
  }

  if (!hasInstagramHandle) {
    return "Instagram-Handle eintragen und Profilstatus klären.";
  }

  if (isLaunchWave) {
    return "Content-Briefing, Regelcheck und ersten Post vorbereiten.";
  }

  return backlogActivationNote ?? "Aktivierungsbedingung prüfen.";
}

function setcardStateFor(
  rawStatus: unknown,
  setcardAssetCount: number
): PersonaPortfolioEntry["setcardState"] {
  const normalized = textFromOptional(rawStatus)?.toLowerCase();

  if (normalized === "bereit") return "bereit";
  if (normalized === "pruefen" || normalized === "prüfen") return "pruefen";
  if (normalized === "fehlt") return "fehlt";
  if (setcardAssetCount > 0) return "pruefen";

  return "offen";
}

function mediaStateFor(
  rawStatus: unknown,
  mediaAssetCount: number
): PersonaPortfolioEntry["mediaState"] {
  const normalized = textFromOptional(rawStatus)?.toLowerCase();

  if (normalized === "bereit") return "bereit";
  if (normalized === "aufbauen") return "aufbauen";
  if (mediaAssetCount > 0) return "aufbauen";

  return "offen";
}

function setcardLabelFor(state: PersonaPortfolioEntry["setcardState"]) {
  if (state === "bereit") return "Setcard bereit";
  if (state === "pruefen") return "Setcard prüfen";
  if (state === "fehlt") return "Setcard fehlt";

  return "Setcard offen";
}

function mediaLabelFor(state: PersonaPortfolioEntry["mediaState"]) {
  if (state === "bereit") return "Medien bereit";
  if (state === "aufbauen") return "Medien aufbauen";

  return "Medien offen";
}

function platformStatusLabelFor(rawStatus: string | null | undefined) {
  const normalized = rawStatus?.toLowerCase();

  if (normalized === "aktiv") return "Instagram aktiv";
  if (normalized === "entwurf") return "Instagram Entwurf";
  if (normalized === "pausiert") return "Instagram pausiert";

  return "Instagram offen";
}

function booleanFromOptional(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }

  return null;
}

function numberFromOptional(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function textFromOptional(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}
