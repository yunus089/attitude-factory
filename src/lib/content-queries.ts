import type {
  AssetStatus,
  AssetType,
  ContentFormat,
  ContentIntent,
  ContentStatus
} from "@prisma/client";
import { summarizeProductionAssetStatus } from "@/src/domain/content-asset-status";
import { summarizeContentProduction } from "@/src/domain/content-production-summary";
import { prisma } from "@/src/lib/prisma";
import { uploadPublicUrlFor } from "@/src/lib/upload-storage";

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info" | "active";

export type LaunchWavePersonaSlot = {
  name: string;
  shortName: string;
  publicName: string;
  lane: string;
  ownerLabel: string;
  color: string;
  firstFormat: string;
  firstAction: string;
  complianceGuardrail: string;
  setcardStatus: string;
  mediaReadinessStatus: string;
};

export type ContentProductionItem = {
  id: string;
  hook: string;
  personaName: string;
  personaShortName: string;
  personaLane: string;
  personaColor: string;
  formatLabel: string;
  intentLabel: string;
  ownerLabel: string;
  statusLabel: string;
  statusTone: BadgeTone;
  assetStatusLabel: string;
  assetTone: BadgeTone;
  complianceLabel: string;
  complianceTone: BadgeTone;
  plannedDateLabel: string;
  plannedDateSort: number;
  nextStep: string;
  triggerTags: string[];
  originalityStatus: string;
};

export type ContentProductionSummary = {
  total: number;
  dueNow: number;
  readyToPost: number;
  materialMissing: number;
  complianceOpen: number;
  videoSlots: number;
};

export type ContentProductionData = {
  items: ContentProductionItem[];
  startWavePersonas: LaunchWavePersonaSlot[];
  summary: ContentProductionSummary;
  queryError?: string;
};

export type MediaLibraryItem = {
  id: string;
  personaName: string;
  personaShortName: string;
  personaLane: string;
  personaColor: string;
  assetType: AssetType;
  typeLabel: string;
  statusLabel: string;
  statusTone: BadgeTone;
  fileName: string;
  storagePath: string;
  previewSrc: string | null;
  mimeType: string;
  sizeLabel: string;
  sourceTool: string;
  promptSnippet: string | null;
  qualityLabel: string;
  consistencyLabel: string;
  notes: string | null;
  createdLabel: string;
  contentHook: string | null;
};

export type MediaGroupKey = "setcards" | "references" | "postAssets" | "videos" | "prompts";

export type MediaGroup = {
  key: MediaGroupKey;
  title: string;
  description: string;
  emptyLabel: string;
  items: MediaLibraryItem[];
};

export type SetcardSlot = LaunchWavePersonaSlot & {
  slotLabel: string;
  slotTone: BadgeTone;
};

export type MediaLibrarySummary = {
  total: number;
  setcards: number;
  readyAssets: number;
  needsWork: number;
  promptRecords: number;
};

export type MediaLibraryData = {
  groups: MediaGroup[];
  setcardSlots: SetcardSlot[];
  summary: MediaLibrarySummary;
  queryError?: string;
};

const PERSONA_COLORS: Record<string, string> = {
  "David Chen": "#2f6fed",
  "Zara Patel": "#d85c82",
  "Luna Stone": "#8c7a54",
  "Alex Moreno": "#f36b2d",
  "Sophie Larue": "#d14fb4",
  "Emma Winters": "#4d8a72"
};

export const LAUNCH_WAVE_PERSONAS: LaunchWavePersonaSlot[] = [
  {
    name: "David Chen",
    shortName: "David",
    publicName: "David Chen",
    lane: "AI, Produktivität, Workflow-Systeme",
    ownerLabel: "Gründer",
    color: PERSONA_COLORS["David Chen"],
    firstFormat: "Carousel",
    firstAction: "Workflow-Carousel briefen, Hook nicht als Tool-Liste verwässern.",
    complianceGuardrail: "Keine übertriebenen Einkommens- oder Automationsversprechen.",
    setcardStatus: "offen",
    mediaReadinessStatus: "Referenz prüfen"
  },
  {
    name: "Zara Patel",
    shortName: "Zara",
    publicName: "Zara Patel",
    lane: "Beauty, Skincare, inklusive Routine-Bildung",
    ownerLabel: "Gründer",
    color: PERSONA_COLORS["Zara Patel"],
    firstFormat: "Carousel",
    firstAction: "Setcard bestätigen und ersten Inhaltsstoff-/Routine-Winkel schreiben.",
    complianceGuardrail: "Keine medizinischen Claims, keine Fake-Nutzungserfahrung.",
    setcardStatus: "offen",
    mediaReadinessStatus: "Setcard zuerst"
  },
  {
    name: "Luna Stone",
    shortName: "Luna",
    publicName: "Luna Stone",
    lane: "Minimalismus, Slow Living, nachhaltige Produkte",
    ownerLabel: "Gründer",
    color: PERSONA_COLORS["Luna Stone"],
    firstFormat: "Einzelbild",
    firstAction: "Clean-Living-Setcard freigeben und Minimalismus-Hypothese anlegen.",
    complianceGuardrail: "Keine falschen Besitz- oder Lifestyle-Beweise behaupten.",
    setcardStatus: "offen",
    mediaReadinessStatus: "Setcard zuerst"
  },
  {
    name: "Alex Moreno",
    shortName: "Alex",
    publicName: "Alex Moreno",
    lane: "Fitness, Disziplin, Anfänger-Sicherheit",
    ownerLabel: "Partner",
    color: PERSONA_COLORS["Alex Moreno"],
    firstFormat: "Kurzvideo",
    firstAction: "Disziplin-ohne-Überforderung als Video- oder Carousel-Slot testen.",
    complianceGuardrail: "Keine Körperresultate, keine Supplement-Heilversprechen.",
    setcardStatus: "offen",
    mediaReadinessStatus: "Setcard zuerst"
  },
  {
    name: "Sophie Larue",
    shortName: "Sophie",
    publicName: "Sophie Larue",
    lane: "Y2K Fashion, Trend-Früherkennung, Shopping",
    ownerLabel: "Partner",
    color: PERSONA_COLORS["Sophie Larue"],
    firstFormat: "Einzelbild",
    firstAction: "Outfit-Setcard und ersten Trendwinkel als Bildprompt vorbereiten.",
    complianceGuardrail: "Affiliate-Hinweis vorbereiten, keine Fake-Markenpartnerschaft.",
    setcardStatus: "fehlt",
    mediaReadinessStatus: "Slot leer"
  },
  {
    name: "Emma Winters",
    shortName: "Emma",
    publicName: "Emma Winters",
    lane: "Home-Organisation, Alltagssysteme, Familienhaushalt",
    ownerLabel: "Partner",
    color: PERSONA_COLORS["Emma Winters"],
    firstFormat: "Carousel",
    firstAction: "Home-System ohne Fake-Familienclaim in eine 5-Slide-Struktur bringen.",
    complianceGuardrail: "Keine erfundenen Kinder-/Familienbeweise, nur Systemlogik.",
    setcardStatus: "fehlt",
    mediaReadinessStatus: "Slot leer"
  }
];

const CONTENT_FORMAT_LABELS: Record<ContentFormat, string> = {
  EINZELBILD: "Einzelbild",
  CAROUSEL: "Carousel",
  KURZVIDEO: "Kurzvideo",
  STORY: "Story"
};

const CONTENT_INTENT_LABELS: Record<ContentIntent, string> = {
  REICHWEITE: "Reichweite",
  SAVES: "Saves",
  SHARES: "Shares",
  FOLLOWS: "Follows",
  VERTRAUEN: "Vertrauen",
  AFFILIATE_SOFT_TEST: "Affiliate-Test weich",
  AFFILIATE_HARD_SELL: "Affiliate-Verkauf hart",
  WELTAUFBAU: "Weltaufbau",
  TREND: "Trend"
};

const CONTENT_STATUS_LABELS: Record<ContentStatus, { label: string; tone: BadgeTone }> = {
  IDEE: { label: "Idee", tone: "neutral" },
  GEBRIEFT: { label: "Gebrieft", tone: "info" },
  TEXT_ENTWURF: { label: "Text-Entwurf", tone: "info" },
  MATERIAL_FEHLT: { label: "Material fehlt", tone: "danger" },
  MATERIAL_BEREIT: { label: "Material bereit", tone: "active" },
  PRUEFUNG: { label: "Prüfung", tone: "warning" },
  BEREIT_ZUM_POSTEN: { label: "Bereit zum Posten", tone: "success" },
  GEPOSTET: { label: "Gepostet", tone: "success" },
  KENNZAHLEN_FEHLEN: { label: "Kennzahlen fehlen", tone: "warning" },
  AUSGEWERTET: { label: "Ausgewertet", tone: "success" },
  WIEDERVERWENDEN: { label: "Wiederverwenden", tone: "active" },
  AUSBAUEN: { label: "Ausbauen", tone: "active" },
  STOPPEN_PAUSIEREN: { label: "Stoppen/Pausieren", tone: "danger" }
};

const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  REFERENZ: "Referenz",
  SETCARD: "Setcard",
  POSTBILD: "Postbild",
  CAROUSEL_SLIDE: "Carousel-Slide",
  KURZVIDEO: "Kurzvideo",
  PROMPT: "Prompt",
  STYLE_GUIDE: "Stilleitfaden"
};

const ASSET_STATUS_LABELS: Record<AssetStatus, { label: string; tone: BadgeTone }> = {
  ROH: { label: "Roh", tone: "neutral" },
  KANDIDAT: { label: "Kandidat", tone: "info" },
  FREIGEGEBENE_REFERENZ: { label: "Referenz frei", tone: "success" },
  FREIGEGEBENES_POST_MATERIAL: { label: "Postmaterial frei", tone: "success" },
  BEARBEITEN: { label: "Bearbeiten", tone: "warning" },
  ABGELEHNT: { label: "Abgelehnt", tone: "danger" },
  ARCHIVIERT: { label: "Archiviert", tone: "neutral" }
};

type RawPersona = {
  name: string;
  publicName: string;
  lane: string;
  setcardStatus: string;
  mediaReadinessStatus: string;
  owner: RawUser | null;
  operator: RawUser | null;
};

type RawUser = {
  name: string;
  role: string;
};

type RawContentItem = {
  id: string;
  hook: string;
  format: ContentFormat;
  intent: ContentIntent;
  brief: string | null;
  outline: string | null;
  caption: string | null;
  disclosure: string | null;
  status: ContentStatus;
  plannedDate: Date | null;
  complianceStatus: string;
  owner: RawUser | null;
  persona: RawPersona;
  assets: Array<{
    assetType: AssetType;
    status: AssetStatus;
  }>;
  compliance: {
    aiDisclosureChecked: boolean;
    affiliateDisclosureChecked: boolean;
    noFakeUsageClaim: boolean;
    noMedicalClaim: boolean;
    noFinancialClaim: boolean;
    status: string;
  } | null;
  triggerTags: string[];
  originalityStatus: string;
};

type RawAssetFile = {
  id: string;
  assetType: AssetType;
  sourceTool: string | null;
  storagePath: string;
  originalFilename: string;
  mimeType: string;
  byteSize: number;
  prompt: string | null;
  qualityRating: number | null;
  consistencyRating: number | null;
  status: AssetStatus;
  notes: string | null;
  createdAt: Date;
  persona: {
    name: string;
    publicName: string;
    lane: string;
  } | null;
  contentItem: {
    hook: string;
    status: ContentStatus;
    plannedDate: Date | null;
  } | null;
};

export async function getContentProductionData(): Promise<ContentProductionData> {
  try {
    const today = new Date();
    const [contentItems, personas, videoSlotCount] = await Promise.all([
      prisma.contentItem.findMany({
        orderBy: [{ plannedDate: "asc" }, { updatedAt: "desc" }],
        take: 80,
        select: {
          id: true,
          hook: true,
          format: true,
          intent: true,
          brief: true,
          outline: true,
          caption: true,
          disclosure: true,
          status: true,
          plannedDate: true,
          complianceStatus: true,
          owner: { select: { name: true, role: true } },
          persona: {
            select: {
              name: true,
              publicName: true,
              lane: true,
              setcardStatus: true,
              mediaReadinessStatus: true,
              owner: { select: { name: true, role: true } },
              operator: { select: { name: true, role: true } }
            }
          },
          assets: {
            select: {
              assetType: true,
              status: true
            }
          },
          compliance: {
            select: {
              aiDisclosureChecked: true,
              affiliateDisclosureChecked: true,
              noFakeUsageClaim: true,
              noMedicalClaim: true,
              noFinancialClaim: true,
              status: true
            }
          },
          triggerTags: true,
          originalityStatus: true
        }
      }),
      readLaunchWavePersonas(),
      prisma.videoSlot.count({
        where: {
          date: {
            gte: startOfDay(today),
            lte: endOfDay(today)
          }
        }
      })
    ]);

    const items = contentItems.map((item) => toContentProductionItem(item));

    return {
      items,
      startWavePersonas: personas,
      summary: summarizeContentProduction(items, videoSlotCount)
    };
  } catch (error) {
    return {
      items: [],
      startWavePersonas: LAUNCH_WAVE_PERSONAS,
      summary: summarizeContentProduction([], 0),
      queryError: errorMessage(error)
    };
  }
}

export async function getMediaLibraryData(): Promise<MediaLibraryData> {
  try {
    const [assets, personas] = await Promise.all([
      prisma.assetFile.findMany({
        orderBy: [{ updatedAt: "desc" }],
        take: 160,
        select: {
          id: true,
          assetType: true,
          sourceTool: true,
          storagePath: true,
          originalFilename: true,
          mimeType: true,
          byteSize: true,
          prompt: true,
          qualityRating: true,
          consistencyRating: true,
          status: true,
          notes: true,
          createdAt: true,
          persona: {
            select: {
              name: true,
              publicName: true,
              lane: true
            }
          },
          contentItem: {
            select: {
              hook: true,
              status: true,
              plannedDate: true
            }
          }
        }
      }),
      readLaunchWavePersonas()
    ]);

    const items = assets.map((asset) => toMediaLibraryItem(asset));
    const setcardPersonaNames = new Set(
      assets
        .filter((asset) => asset.assetType === "SETCARD")
        .map((asset) => asset.persona?.name)
        .filter(Boolean)
    );

    return {
      groups: buildMediaGroups(items),
      setcardSlots: personas.map((persona) => toSetcardSlot(persona, setcardPersonaNames)),
      summary: summarizeMedia(items)
    };
  } catch (error) {
    return {
      groups: buildMediaGroups([]),
      setcardSlots: LAUNCH_WAVE_PERSONAS.map((persona) => toSetcardSlot(persona, new Set())),
      summary: summarizeMedia([]),
      queryError: errorMessage(error)
    };
  }
}

async function readLaunchWavePersonas() {
  const personas = await prisma.persona.findMany({
    where: {
      OR: [{ launchWave: true }, { name: { in: LAUNCH_WAVE_PERSONAS.map((persona) => persona.name) } }]
    },
    orderBy: [{ launchWaveOrder: "asc" }, { name: "asc" }],
    select: {
      name: true,
      publicName: true,
      lane: true,
      setcardStatus: true,
      mediaReadinessStatus: true,
      owner: { select: { name: true, role: true } },
      operator: { select: { name: true, role: true } }
    }
  });

  return mergeStartWavePersonas(personas);
}

function mergeStartWavePersonas(personas: RawPersona[]) {
  const byName = new Map(personas.map((persona) => [persona.name, persona]));

  return LAUNCH_WAVE_PERSONAS.map((slot) => {
    const persona = byName.get(slot.name);

    if (!persona) {
      return slot;
    }

    return {
      ...slot,
      publicName: persona.publicName || slot.publicName,
      lane: persona.lane || slot.lane,
      ownerLabel: userLabelFor(persona.operator) || userLabelFor(persona.owner) || slot.ownerLabel,
      setcardStatus: persona.setcardStatus || slot.setcardStatus,
      mediaReadinessStatus: persona.mediaReadinessStatus || slot.mediaReadinessStatus
    };
  });
}

function toContentProductionItem(item: RawContentItem): ContentProductionItem {
  const personaName = item.persona.publicName || item.persona.name;
  const status = CONTENT_STATUS_LABELS[item.status];
  const assetStatus = summarizeProductionAssetStatus(item.assets);
  const compliance = summarizeCompliance(item);

  return {
    id: item.id,
    hook: item.hook,
    personaName,
    personaShortName: shortNameFor(personaName),
    personaLane: item.persona.lane,
    personaColor: colorForPersona(personaName),
    formatLabel: CONTENT_FORMAT_LABELS[item.format],
    intentLabel: CONTENT_INTENT_LABELS[item.intent],
    ownerLabel:
      userLabelFor(item.owner) ||
      userLabelFor(item.persona.operator) ||
      userLabelFor(item.persona.owner) ||
      fallbackOwnerForPersona(personaName),
    statusLabel: status.label,
    statusTone: status.tone,
    assetStatusLabel: assetStatus.label,
    assetTone: assetStatus.tone,
    complianceLabel: compliance.label,
    complianceTone: compliance.tone,
    plannedDateLabel: formatPlannedDate(item.plannedDate),
    plannedDateSort: item.plannedDate?.getTime() ?? Number.MAX_SAFE_INTEGER,
    nextStep: nextStepFor(item, assetStatus.tone, compliance.tone),
    triggerTags: item.triggerTags,
    originalityStatus: item.originalityStatus
  };
}

function toMediaLibraryItem(asset: RawAssetFile): MediaLibraryItem {
  const personaName = asset.persona?.publicName || asset.persona?.name || "Persona offen";
  const status = ASSET_STATUS_LABELS[asset.status];

  return {
    id: asset.id,
    personaName,
    personaShortName: shortNameFor(personaName),
    personaLane: asset.persona?.lane || "Nicht zugeordnet",
    personaColor: colorForPersona(personaName),
    assetType: asset.assetType,
    typeLabel: ASSET_TYPE_LABELS[asset.assetType],
    statusLabel: status.label,
    statusTone: status.tone,
    fileName: asset.originalFilename,
    storagePath: asset.storagePath,
    previewSrc: previewSrcFor(asset),
    mimeType: asset.mimeType,
    sizeLabel: formatByteSize(asset.byteSize),
    sourceTool: asset.sourceTool || "Quelle offen",
    promptSnippet: compactText(asset.prompt, 118),
    qualityLabel: ratingLabel(asset.qualityRating),
    consistencyLabel: ratingLabel(asset.consistencyRating),
    notes: compactText(asset.notes, 120),
    createdLabel: formatShortDate(asset.createdAt),
    contentHook: asset.contentItem?.hook || null
  };
}

function buildMediaGroups(items: MediaLibraryItem[]): MediaGroup[] {
  return [
    {
      key: "setcards",
      title: "Setcards",
      description: "Freigegebene Persona-Basisbilder und Konsistenzanker.",
      emptyLabel: "Noch keine Setcards im AssetFile-Modell.",
      items: items.filter((item) => item.assetType === "SETCARD")
    },
    {
      key: "references",
      title: "Referenzen",
      description: "Freigegebene Referenzbilder, Stilleitfäden und visuelle Leitplanken.",
      emptyLabel: "Noch keine Referenzen oder Stilleitfäden abgelegt.",
      items: items.filter((item) => item.assetType === "REFERENZ" || item.assetType === "STYLE_GUIDE")
    },
    {
      key: "postAssets",
      title: "Postbilder & Carousel-Slides",
      description: "Material für Einzelbilder und Carousel-Produktion.",
      emptyLabel: "Noch keine Postbilder oder Carousel-Slides vorhanden.",
      items: items.filter((item) => item.assetType === "POSTBILD" || item.assetType === "CAROUSEL_SLIDE")
    },
    {
      key: "videos",
      title: "Videos",
      description: "Premium-Slots für kurze Instagram-Videos.",
      emptyLabel: "Noch keine Kurzvideo-Dateien in der Bibliothek.",
      items: items.filter((item) => item.assetType === "KURZVIDEO")
    },
    {
      key: "prompts",
      title: "Prompt-Historie",
      description: "Reproduzierbare Prompts und Generator-Kontext pro Persona.",
      emptyLabel: "Noch keine Prompts gespeichert.",
      items: items.filter((item) => item.assetType === "PROMPT" || item.promptSnippet)
    }
  ];
}

function toSetcardSlot(persona: LaunchWavePersonaSlot, setcardPersonaNames: Set<string | undefined>): SetcardSlot {
  const hasSetcard = setcardPersonaNames.has(persona.name) || setcardPersonaNames.has(persona.publicName);

  if (hasSetcard) {
    return {
      ...persona,
      slotLabel: "Setcard vorhanden",
      slotTone: "success"
    };
  }

  return {
    ...persona,
    slotLabel: persona.setcardStatus === "fehlt" ? "Slot leer" : "Setcard offen",
    slotTone: persona.setcardStatus === "fehlt" ? "danger" : "warning"
  };
}

function summarizeMedia(items: MediaLibraryItem[]): MediaLibrarySummary {
  return {
    total: items.length,
    setcards: items.filter((item) => item.assetType === "SETCARD").length,
    readyAssets: items.filter((item) => item.statusTone === "success").length,
    needsWork: items.filter((item) => item.statusTone === "warning" || item.statusTone === "danger").length,
    promptRecords: items.filter((item) => item.assetType === "PROMPT" || item.promptSnippet).length
  };
}

function summarizeCompliance(item: RawContentItem): { label: string; tone: BadgeTone } {
  const normalizedStatus = `${item.complianceStatus} ${item.compliance?.status ?? ""}`.toLowerCase();

  if (["block", "risk", "risiko", "abgelehnt", "stopp"].some((token) => normalizedStatus.includes(token))) {
    return { label: "Risiko prüfen", tone: "danger" };
  }

  if (
    item.compliance &&
    item.compliance.aiDisclosureChecked &&
    item.compliance.noFakeUsageClaim &&
    item.compliance.noMedicalClaim &&
    item.compliance.noFinancialClaim &&
    (item.intent !== "AFFILIATE_HARD_SELL" || item.compliance.affiliateDisclosureChecked)
  ) {
    return { label: "Check sauber", tone: "success" };
  }

  if (["frei", "ok", "safe", "geprüft"].some((token) => normalizedStatus.includes(token))) {
    return { label: "Markiert sauber", tone: "success" };
  }

  if ((item.intent === "AFFILIATE_SOFT_TEST" || item.intent === "AFFILIATE_HARD_SELL") && !item.disclosure) {
    return { label: "Disclosure fehlt", tone: "warning" };
  }

  if (item.status === "PRUEFUNG" || normalizedStatus.includes("offen")) {
    return { label: "Check offen", tone: "warning" };
  }

  return { label: "Vorprüfung offen", tone: "neutral" };
}

function nextStepFor(item: RawContentItem, assetTone: BadgeTone, complianceTone: BadgeTone) {
  if (assetTone === "danger" && item.status !== "IDEE" && item.status !== "GEBRIEFT") {
    return "Fehlendes Bild-, Slide- oder Video-Material produzieren.";
  }

  if (complianceTone === "danger") {
    return "Claim, Disclosure oder Fake-Usage-Risiko vor Produktion entschärfen.";
  }

  switch (item.status) {
    case "IDEE":
      return item.brief ? "Hook in Outline oder Shotlist übersetzen." : "Brief mit Format, Zielsignal und Angle schreiben.";
    case "GEBRIEFT":
      return item.outline ? "Textentwurf und Caption ausarbeiten." : "Slidefolge, Bildidee oder Video-Shotlist festlegen.";
    case "TEXT_ENTWURF":
      return item.caption ? "Material erzeugen und mit Caption abgleichen." : "Caption, CTA und Disclosure ergänzen.";
    case "MATERIAL_FEHLT":
      return "Asset-Slot schließen: Prompt, Referenz oder finalen Export hinterlegen.";
    case "MATERIAL_BEREIT":
      return "Compliance-Prüfung abschließen und Posting-Freigabe setzen.";
    case "PRUEFUNG":
      return "AI-, Affiliate- und Claim-Check final bestätigen.";
    case "BEREIT_ZUM_POSTEN":
      return "Manuell über offizielles Tool posten, dann URL eintragen.";
    case "GEPOSTET":
      return "Kennzahlen-Snapshot vorbereiten.";
    case "KENNZAHLEN_FEHLEN":
      return "Reach, Saves, Shares, Follows und Link-Klicks nachtragen.";
    case "AUSGEWERTET":
      return "Entscheiden: wiederverwenden, ausbauen oder stoppen.";
    case "WIEDERVERWENDEN":
      return "Variante für neue Hook oder neues Visual anlegen.";
    case "AUSBAUEN":
      return "Folgepost, Carousel-Serie oder Video-Slot planen.";
    case "STOPPEN_PAUSIEREN":
      return "Lernnotiz sichern und Lane vorerst nicht weiter befüllen.";
    default:
      return "Nächste operative Aktion festlegen.";
  }
}

function previewSrcFor(asset: Pick<RawAssetFile, "mimeType" | "storagePath">) {
  if (!asset.mimeType.startsWith("image/")) {
    return null;
  }

  if (asset.storagePath.startsWith("/") || asset.storagePath.startsWith("https://") || asset.storagePath.startsWith("http://")) {
    return asset.storagePath;
  }

  if (asset.storagePath.startsWith("public/")) {
    return asset.storagePath.replace(/^public/, "");
  }

  if (asset.storagePath.startsWith("content/")) {
    return uploadPublicUrlFor(asset.storagePath);
  }

  return null;
}

function fallbackOwnerForPersona(name: string) {
  const slot = LAUNCH_WAVE_PERSONAS.find(
    (persona) => persona.name === name || persona.publicName === name || persona.shortName === shortNameFor(name)
  );

  return slot?.ownerLabel || "Nicht vergeben";
}

function userLabelFor(user: RawUser | null | undefined) {
  if (!user) {
    return null;
  }

  const role = user.role.toLowerCase();
  const name = user.name.toLowerCase();

  if (role === "gruender" || name.includes("gründer") || name.includes("gruender")) {
    return "Gründer";
  }

  if (role === "operator" || name.includes("partner") || name.includes("operator")) {
    return "Partner";
  }

  return user.name;
}

function colorForPersona(name: string) {
  return PERSONA_COLORS[name] || PERSONA_COLORS[`${shortNameFor(name)} ${name.split(" ").slice(1).join(" ")}`] || "#646a6f";
}

function shortNameFor(name: string) {
  return name.split(" ")[0] || name;
}

function formatPlannedDate(date: Date | null) {
  if (!date) {
    return "Nicht geplant";
  }

  const dateOnly = date.toDateString();
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  if (dateOnly === now.toDateString()) {
    return `Heute, ${formatShortDate(date)}`;
  }

  if (dateOnly === tomorrow.toDateString()) {
    return `Morgen, ${formatShortDate(date)}`;
  }

  return formatShortDate(date);
}

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  }).format(date);
}

function formatByteSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ratingLabel(value: number | null) {
  return typeof value === "number" ? `${value}/10` : "offen";
}

function compactText(value: string | null | undefined, maxLength: number) {
  if (!value) {
    return null;
  }

  const compact = value.replace(/\s+/g, " ").trim();

  if (compact.length <= maxLength) {
    return compact;
  }

  return `${compact.slice(0, maxLength - 1)}…`;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Datenbankabfrage fehlgeschlagen.";
}

function startOfDay(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function endOfDay(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(23, 59, 59, 999);
  return nextDate;
}
