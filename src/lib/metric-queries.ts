import { prisma } from "@/src/lib/prisma";
import {
  calculatePortfolioMedian,
  calculateRates,
  evaluateSignal,
  type MetricRates,
  type MetricSignal,
  type MetricSignalResult,
  type RawMetric
} from "@/src/domain/metric-signals";
import type { BadgeTone } from "@/src/lib/content-queries";

export type MetricSnapshotRow = {
  id: string;
  contentItemId: string;
  hook: string;
  personaName: string;
  personaShortName: string;
  personaColor: string;
  capturedAt: string;
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  profileVisits: number;
  follows: number;
  linkClicks: number;
  rates: MetricRates;
  signal: MetricSignal;
  signalLabel: string;
  signalTone: BadgeTone;
  reason: string;
  nextAction: string;
  notes: string | null;
};

export type KennzahlenPostItem = {
  id: string;
  hook: string;
  personaName: string;
  personaShortName: string;
  personaColor: string;
  formatLabel: string;
  statusLabel: string;
  statusTone: BadgeTone;
  postedAt: string | null;
  plannedDateLabel: string;
  hasMetric: boolean;
  latestSnapshot: MetricSnapshotRow | null;
};

export type KennzahlenSummary = {
  totalPosted: number;
  withMetrics: number;
  missingMetrics: number;
  winners: number;
  weakSignals: number;
};

export type KennzahlenData = {
  posts: KennzahlenPostItem[];
  snapshots: MetricSnapshotRow[];
  summary: KennzahlenSummary;
  portfolioMedian: ReturnType<typeof calculatePortfolioMedian>;
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

const SIGNAL_LABELS: Record<MetricSignal, { label: string; tone: BadgeTone }> = {
  KENNZAHLEN_FEHLEN: { label: "Kennzahlen fehlen", tone: "warning" },
  GEWINNER_KANDIDAT: { label: "Gewinner-Kandidat", tone: "active" },
  VIDEOEINSATZ_KANDIDAT: { label: "Videoeinsatz-Kandidat", tone: "info" },
  SCHWACHES_SIGNAL: { label: "Schwaches Signal", tone: "danger" },
  AUSBAUEN: { label: "Ausbauen", tone: "success" },
  STOPPEN_PAUSIEREN: { label: "Stoppen / Pausieren", tone: "danger" },
  WIEDERVERWENDEN: { label: "Wiederverwenden", tone: "neutral" },
  MEHR_DATEN_NOETIG: { label: "Mehr Daten nötig", tone: "neutral" }
};

const FORMAT_LABELS: Record<string, string> = {
  EINZELBILD: "Einzelbild",
  CAROUSEL: "Carousel",
  KURZVIDEO: "Kurzvideo",
  STORY: "Story"
};

export async function getKennzahlenData(): Promise<KennzahlenData> {
  try {
    // 1. Alle geposteten oder kennzahlen-fehlenden ContentItems laden
    const [contentItems, allSnapshots] = await Promise.all([
      prisma.contentItem.findMany({
        where: {
          status: {
            in: ["GEPOSTET", "KENNZAHLEN_FEHLEN", "AUSGEWERTET", "AUSBAUEN", "WIEDERVERWENDEN", "STOPPEN_PAUSIEREN"]
          }
        },
        orderBy: [{ postedAt: "desc" }, { plannedDate: "desc" }],
        take: 60,
        select: {
          id: true,
          hook: true,
          format: true,
          status: true,
          plannedDate: true,
          postedAt: true,
          persona: {
            select: {
              name: true,
              publicName: true
            }
          },
          metrics: {
            orderBy: { capturedAt: "desc" },
            take: 1,
            select: {
              id: true,
              capturedAt: true,
              impressions: true,
              reach: true,
              likes: true,
              comments: true,
              saves: true,
              shares: true,
              profileVisits: true,
              follows: true,
              linkClicks: true,
              notes: true
            }
          }
        }
      }),

      // Alle Snapshots für Portfolio-Median-Berechnung
      prisma.metricSnapshot.findMany({
        where: { reach: { gt: 0 } },
        orderBy: { capturedAt: "desc" },
        take: 200,
        select: {
          impressions: true,
          reach: true,
          likes: true,
          comments: true,
          saves: true,
          shares: true,
          profileVisits: true,
          follows: true,
          linkClicks: true
        }
      })
    ]);

    const portfolioMedian = calculatePortfolioMedian(allSnapshots as RawMetric[]);

    const posts: KennzahlenPostItem[] = contentItems.map((item) => {
      const personaName = item.persona.publicName || item.persona.name;
      const latestSnap = item.metrics[0] ?? null;
      const hasMetric = latestSnap !== null;

      const snapshotRow = latestSnap
        ? toSnapshotRow(latestSnap, item.id, item.hook, personaName, portfolioMedian)
        : null;

      return {
        id: item.id,
        hook: item.hook,
        personaName,
        personaShortName: firstWord(personaName),
        personaColor: PERSONA_COLORS[personaName] ?? "#646a6f",
        formatLabel: FORMAT_LABELS[item.format] ?? item.format,
        statusLabel: statusLabelFor(item.status),
        statusTone: statusToneFor(item.status),
        postedAt: item.postedAt ? formatDate(item.postedAt) : null,
        plannedDateLabel: item.plannedDate ? formatDate(item.plannedDate) : "Datum offen",
        hasMetric,
        latestSnapshot: snapshotRow
      };
    });

    // Alle Snapshots für den Überblick-Tab
    const allSnapshotRows = await prisma.metricSnapshot.findMany({
      orderBy: { capturedAt: "desc" },
      take: 80,
      select: {
        id: true,
        capturedAt: true,
        impressions: true,
        reach: true,
        likes: true,
        comments: true,
        saves: true,
        shares: true,
        profileVisits: true,
        follows: true,
        linkClicks: true,
        notes: true,
        contentItem: {
          select: {
            id: true,
            hook: true,
            persona: {
              select: { name: true, publicName: true }
            }
          }
        }
      }
    });

    const snapshots: MetricSnapshotRow[] = allSnapshotRows.map((snap) => {
      const personaName = snap.contentItem.persona.publicName || snap.contentItem.persona.name;
      return toSnapshotRow(
        { ...snap, contentItemId: snap.contentItem.id },
        snap.contentItem.id,
        snap.contentItem.hook,
        personaName,
        portfolioMedian
      );
    });

    return {
      posts,
      snapshots,
      summary: buildSummary(posts),
      portfolioMedian
    };
  } catch (error) {
    return {
      posts: [],
      snapshots: [],
      summary: { totalPosted: 0, withMetrics: 0, missingMetrics: 0, winners: 0, weakSignals: 0 },
      portfolioMedian: calculatePortfolioMedian([]),
      queryError: errorMessage(error)
    };
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toSnapshotRow(
  snap: {
    id: string;
    capturedAt: Date;
    impressions: number;
    reach: number;
    likes: number;
    comments: number;
    saves: number;
    shares: number;
    profileVisits: number;
    follows: number;
    linkClicks: number;
    notes?: string | null;
    contentItemId?: string;
  },
  contentItemId: string,
  hook: string,
  personaName: string,
  portfolioMedian: ReturnType<typeof calculatePortfolioMedian>
): MetricSnapshotRow {
  const raw: RawMetric = {
    impressions: snap.impressions,
    reach: snap.reach,
    likes: snap.likes,
    comments: snap.comments,
    saves: snap.saves,
    shares: snap.shares,
    profileVisits: snap.profileVisits,
    follows: snap.follows,
    linkClicks: snap.linkClicks
  };

  const rates = calculateRates(raw);
  const evaluation: MetricSignalResult = evaluateSignal(raw, portfolioMedian);
  const signalMeta = SIGNAL_LABELS[evaluation.signal];

  return {
    id: snap.id,
    contentItemId,
    hook,
    personaName,
    personaShortName: firstWord(personaName),
    personaColor: PERSONA_COLORS[personaName] ?? "#646a6f",
    capturedAt: formatDate(snap.capturedAt),
    impressions: snap.impressions,
    reach: snap.reach,
    likes: snap.likes,
    comments: snap.comments,
    saves: snap.saves,
    shares: snap.shares,
    profileVisits: snap.profileVisits,
    follows: snap.follows,
    linkClicks: snap.linkClicks,
    rates,
    signal: evaluation.signal,
    signalLabel: signalMeta.label,
    signalTone: signalMeta.tone,
    reason: evaluation.reason,
    nextAction: evaluation.nextAction,
    notes: snap.notes ?? null
  };
}

function buildSummary(posts: KennzahlenPostItem[]): KennzahlenSummary {
  const withMetrics = posts.filter((p) => p.hasMetric).length;
  const winners = posts.filter(
    (p) => p.latestSnapshot?.signal === "GEWINNER_KANDIDAT" || p.latestSnapshot?.signal === "AUSBAUEN"
  ).length;
  const weakSignals = posts.filter((p) => p.latestSnapshot?.signal === "SCHWACHES_SIGNAL").length;

  return {
    totalPosted: posts.length,
    withMetrics,
    missingMetrics: posts.length - withMetrics,
    winners,
    weakSignals
  };
}

function statusLabelFor(status: string): string {
  const map: Record<string, string> = {
    GEPOSTET: "Gepostet",
    KENNZAHLEN_FEHLEN: "Kennzahlen fehlen",
    AUSGEWERTET: "Ausgewertet",
    AUSBAUEN: "Ausbauen",
    WIEDERVERWENDEN: "Wiederverwenden",
    STOPPEN_PAUSIEREN: "Stoppen / Pausieren"
  };
  return map[status] ?? status;
}

function statusToneFor(status: string): BadgeTone {
  const map: Record<string, BadgeTone> = {
    GEPOSTET: "success",
    KENNZAHLEN_FEHLEN: "warning",
    AUSGEWERTET: "success",
    AUSBAUEN: "active",
    WIEDERVERWENDEN: "neutral",
    STOPPEN_PAUSIEREN: "danger"
  };
  return map[status] ?? "neutral";
}

function firstWord(name: string) {
  return name.split(" ")[0] ?? name;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  }).format(date);
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unbekannter Fehler";
}
