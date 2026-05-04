import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";
import { LAUNCH_WAVE_PERSONAS, BadgeTone } from "@/src/lib/content-queries";
import { calculatePortfolioMedian, evaluateSignal, type RawMetric } from "@/src/domain/metric-signals";
import type {
  DecisionItem,
  MetricStripItem,
  PersonaSummary,
  SignalRadarRow,
  WarRoomSummary
} from "@/src/domain/types";

type ContentItemWithJoin = Prisma.ContentItemGetPayload<{
  include: {
    persona: true,
    owner: true,
    metrics: {
      orderBy: { capturedAt: "desc" },
      take: 1
    }
  }
}>;

const colors = {
  zara: "#D85C82",
  alex: "#F36B2D",
  david: "#2F6FED",
  luna: "#8C7A54",
  sophie: "#D14FB4",
  emma: "#4D8A72",
  volt: "#B7F34A",
  cyan: "#29A7E1",
  red: "#E7473C",
  amber: "#F2A93B",
  empty: "#A7AFAA"
};

function getColorForPersona(name: string) {
  const normalized = name.toLowerCase();
  if (normalized.includes("zara")) return colors.zara;
  if (normalized.includes("alex")) return colors.alex;
  if (normalized.includes("david")) return colors.david;
  if (normalized.includes("luna")) return colors.luna;
  if (normalized.includes("sophie")) return colors.sophie;
  if (normalized.includes("emma")) return colors.emma;
  return colors.empty;
}

export async function getKommandozentraleData() {
  const today = new Date();
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);
  
  const [
    contentItems,
    personasDB,
    metricSnapshots,
    videoSlotCount,
    totalPlannedCount
  ] = await Promise.all([
    prisma.contentItem.findMany({
      where: {
        OR: [
          { status: { notIn: ["AUSGEWERTET", "STOPPEN_PAUSIEREN"] } },
          { plannedDate: { gte: startOfToday } }
        ]
      },
      orderBy: [{ plannedDate: "asc" }, { updatedAt: "desc" }],
      include: {
        persona: true,
        owner: true,
        metrics: {
          orderBy: { capturedAt: "desc" },
          take: 1
        }
      }
    }),
    prisma.persona.findMany({
      include: {
        assets: {
          where: { assetType: "SETCARD", status: "FREIGEGEBENES_POST_MATERIAL" },
          take: 1
        }
      }
    }),
    prisma.metricSnapshot.findMany({
      orderBy: { capturedAt: "desc" }
    }),
    prisma.videoSlot.count(),
    prisma.contentItem.count()
  ]);

  const portfolioMedian = calculatePortfolioMedian(metricSnapshots as RawMetric[]);

  // 1. WarRoomSummary
  const warRoom: WarRoomSummary = {
    title: "30 Tage, 6 Lanes, keine Ausreden.",
    briefing: "Dual-Track ist aktiv: 2 Operator, 6 Startwellen-Personas, weitere Personas im Portfolio-Backlog.",
    progress: Math.min(Math.round(((metricSnapshots.length || 0) / 30) * 100), 100), // Simple proxy for now
    currentWinner: getTopWinner(contentItems, portfolioMedian) || "Noch kein klares Signal",
    weakestLane: getWeakestLane(contentItems, portfolioMedian) || "Noch zu wenig Daten",
    videoPolicy: "2 Slots/Tag, zuerst Lernwert vor Gleichverteilung",
    nextDecision: "Laufende Optimierung",
    stats: [
      { label: "Snapshots", value: metricSnapshots.length.toString() },
      { label: "Geplant", value: totalPlannedCount.toString() },
      { label: "Video-Slots", value: videoSlotCount.toString() },
      { label: "Items aktiv", value: contentItems.length.toString() }
    ]
  };

  // 2. MetricStripItem[]
  const heuteOffen = contentItems.filter(item => 
    !item.status.includes("GEPOSTET") && 
    !item.status.includes("AUSGEWERTET") &&
    item.plannedDate && item.plannedDate <= endOfToday
  ).length;

  const bereitZumPosten = contentItems.filter(item => item.status === "BEREIT_ZUM_POSTEN").length;
  const materialFehlt = contentItems.filter(item => item.status === "MATERIAL_FEHLT").length;
  const kennzahlenFehlen = contentItems.filter(item => item.status === "KENNZAHLEN_FEHLEN").length;
  
  let gewinner = 0;
  contentItems.forEach(item => {
    if (item.metrics[0]) {
       const sig = evaluateSignal(item.metrics[0] as unknown as RawMetric, portfolioMedian);
       if (sig.signal === "GEWINNER_KANDIDAT" || sig.signal === "AUSBAUEN") gewinner++;
    }
  });

  const metricStrip: MetricStripItem[] = [
    { label: "Heute offen", value: heuteOffen.toString(), color: heuteOffen > 0 ? colors.amber : colors.empty },
    { label: "Bereit zum Posten", value: bereitZumPosten.toString(), color: bereitZumPosten > 0 ? colors.volt : colors.empty },
    { label: "Material fehlt", value: materialFehlt.toString(), color: materialFehlt > 0 ? colors.red : colors.empty },
    { label: "Kennzahlen fehlen", value: kennzahlenFehlen.toString(), color: kennzahlenFehlen > 0 ? colors.amber : colors.empty },
    { label: "Gewinner-Kandidaten", value: gewinner.toString(), color: gewinner > 0 ? colors.cyan : colors.empty },
    { label: "Videoeinsätze", value: videoSlotCount.toString(), color: videoSlotCount > 0 ? colors.cyan : colors.empty }
  ];

  // 3. QueueItem[] (heute und morgen)
  const endOfTomorrow = new Date(today);
  endOfTomorrow.setDate(today.getDate() + 1);
  endOfTomorrow.setHours(23, 59, 59, 999);
  
  const queueItems = contentItems
    .filter(item => item.plannedDate && item.plannedDate <= endOfTomorrow && !["GEPOSTET", "AUSGEWERTET"].includes(item.status))
    .slice(0, 10)
    .map(item => ({
      id: item.id,
      title: item.hook || "Ohne Hook",
      persona: item.persona.publicName || item.persona.name,
      personaColor: getColorForPersona(item.persona.name),
      status: mapStatus(item.status),
      owner: item.owner?.name || "Unbekannt",
      due: item.plannedDate && item.plannedDate <= endOfToday ? "Heute" : "Morgen",
      nextAction: item.brief || "Aktion festlegen"
    }));

  // 4. DecisionItem[]
  const decisions: DecisionItem[] = [];
  if (kennzahlenFehlen > 0) {
    decisions.push({
      id: "dec-missing-metrics",
      signal: "Kennzahlen fehlen",
      tone: "warning",
      title: `${kennzahlenFehlen} Posts brauchen Kennzahlen`,
      persona: "Portfolio",
      reason: "Um zuverlässige Signale zu generieren, müssen Kennzahlen zeitnah aus Instagram übertragen werden.",
      action: "Kennzahlen eintragen",
      color: colors.amber
    });
  }
  
  // Add winner decisions
  contentItems.forEach(item => {
    if (item.metrics[0]) {
       const sig = evaluateSignal(item.metrics[0] as unknown as RawMetric, portfolioMedian);
       if (sig.signal === "GEWINNER_KANDIDAT" || sig.signal === "AUSBAUEN" || sig.signal === "VIDEOEINSATZ_KANDIDAT") {
         decisions.push({
           id: `dec-${item.id}`,
           signal: sig.signal,
           tone: sig.signal === "VIDEOEINSATZ_KANDIDAT" ? "info" : "active",
           title: item.hook || "Gewinner identifiziert",
           persona: item.persona.publicName || item.persona.name,
           reason: sig.reason,
           action: sig.nextAction,
           color: sig.signal === "VIDEOEINSATZ_KANDIDAT" ? colors.cyan : colors.volt
         });
       }
    }
  });

  if (decisions.length === 0) {
    decisions.push({
      id: "dec-wait",
      signal: "Mehr Daten nötig",
      tone: "neutral",
      title: "Warten auf Signale",
      persona: "Portfolio",
      reason: "Aktuell liegen keine verwertbaren Signale vor. Wir müssen mehr Content posten und Kennzahlen sammeln.",
      action: "Content produzieren",
      color: colors.empty
    });
  }

  // 5. PersonaSummary[]
  const personaSummaries: PersonaSummary[] = LAUNCH_WAVE_PERSONAS.map(pInfo => {
    const pDb = personasDB.find(p => p.name === pInfo.name);
    
    return {
      name: pInfo.publicName,
      lane: pInfo.lane,
      status: pDb ? "Aktiv" : "Geplant",
      color: getColorForPersona(pInfo.name),
      image: pDb?.assets?.[0]?.storagePath || undefined,
      nextAction: pInfo.firstAction,
      scores: [
        { label: "Identität", value: pDb ? 80 : 0 },
        { label: "Visual", value: pDb?.assets?.length ? 70 : 0 },
        { label: "Signal", value: 0 } // Calculate real signal score later
      ]
    };
  });

  // 6. SignalRadarRow[]
  const signalRadar: SignalRadarRow[] = LAUNCH_WAVE_PERSONAS.map(pInfo => {
    // Generate a 7-day radar based on recent posts
    const personaPosts = contentItems.filter(i => i.persona.name === pInfo.name && i.metrics.length > 0);
    const days = Array.from({length: 7}).map((_, idx) => {
       // Mock logic - in reality we map posts to specific days
       if (idx < personaPosts.length) {
         const sig = evaluateSignal(personaPosts[idx].metrics[0] as unknown as RawMetric, portfolioMedian);
         return {
            day: idx + 1,
            label: sig.signal,
            color: getRadarColorForSignal(sig.signal)
         };
       }
       return { day: idx + 1, label: "Kein Signal", color: colors.empty };
    });
    
    return {
      id: `radar-${pInfo.shortName.toLowerCase()}`,
      label: pInfo.firstFormat || "Format",
      persona: pInfo.shortName,
      days
    };
  });

  return {
    warRoom,
    metricStrip,
    todayQueue: queueItems,
    decisions: decisions.slice(0, 4), // Limit to top 4 decisions
    personas: personaSummaries,
    signalRadar
  };
}

// Helpers
function mapStatus(status: string): { label: string; tone: BadgeTone } {
  switch (status) {
    case "MATERIAL_FEHLT": return { label: "Material fehlt", tone: "danger" };
    case "PRUEFUNG": return { label: "Prüfung nötig", tone: "warning" };
    case "BEREIT_ZUM_POSTEN": return { label: "Bereit", tone: "success" };
    case "KENNZAHLEN_FEHLEN": return { label: "Kennzahlen fehlen", tone: "warning" };
    default: return { label: status, tone: "neutral" };
  }
}

function getRadarColorForSignal(signal: string) {
  switch (signal) {
    case "AUSBAUEN":
    case "GEWINNER_KANDIDAT": return colors.volt;
    case "VIDEOEINSATZ_KANDIDAT": return colors.cyan;
    case "SCHWACHES_SIGNAL":
    case "STOPPEN_PAUSIEREN": return colors.red;
    case "KENNZAHLEN_FEHLEN": return colors.amber;
    default: return colors.empty;
  }
}

function getTopWinner(items: ContentItemWithJoin[], median: ReturnType<typeof calculatePortfolioMedian>) {
  for (const item of items) {
    if (item.metrics?.[0]) {
      const sig = evaluateSignal(item.metrics[0] as RawMetric, median);
      if (sig.signal === "AUSBAUEN" || sig.signal === "GEWINNER_KANDIDAT") {
        return `${item.persona.publicName || item.persona.name}: ${item.hook}`;
      }
    }
  }
  return null;
}

function getWeakestLane(items: ContentItemWithJoin[], median: ReturnType<typeof calculatePortfolioMedian>) {
   for (const item of items) {
    if (item.metrics?.[0]) {
      const sig = evaluateSignal(item.metrics[0] as RawMetric, median);
      if (sig.signal === "SCHWACHES_SIGNAL" || sig.signal === "STOPPEN_PAUSIEREN") {
        return `${item.persona.publicName || item.persona.name}: ${item.hook}`;
      }
    }
  }
  return null;
}
