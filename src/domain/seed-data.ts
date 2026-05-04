import type {
  DecisionItem,
  MetricStripItem,
  PersonaSummary,
  QueueItem,
  SignalRadarRow,
  WarRoomSummary
} from "@/src/domain/types";

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

export const warRoom: WarRoomSummary = {
  title: "30 Tage, 6 Lanes, keine Ausreden.",
  briefing:
    "Dual-Track ist aktiv: 2 Operator, 6 Startwellen-Personas, 14 weitere Personas im Portfolio-Backlog.",
  progress: 3,
  currentWinner: "David: Workflow-Carousel als erste Hypothese",
  weakestLane: "Backlog ist noch nicht vollständig gescored",
  videoPolicy: "2 Slots/Tag, zuerst Lernwert vor Gleichverteilung",
  nextDecision: "Tag 3 Signalcheck",
  stats: [
    { label: "Testtag", value: "1" },
    { label: "Geplant", value: "42" },
    { label: "Video-Slots", value: "14" },
    { label: "Entscheidungen", value: "6" }
  ]
};

export const metricStrip: MetricStripItem[] = [
  { label: "Heute offen", value: "12", color: colors.amber },
  { label: "Bereit zum Posten", value: "0", color: colors.empty },
  { label: "Material fehlt", value: "9", color: colors.red },
  { label: "Kennzahlen fehlen", value: "0", color: colors.empty },
  { label: "Gewinner-Kandidaten", value: "0", color: colors.empty },
  { label: "Videoeinsätze", value: "2", color: colors.cyan }
];

export const personas: PersonaSummary[] = [
  {
    name: "David Chen",
    lane: "AI, Produktivität, Workflow-Systeme",
    status: "Aktiv",
    color: colors.david,
    image: "/personas_media/image10.png",
    nextAction:
      "Workflow statt Tool-Sammlung als erstes Carousel ausarbeiten. Affiliate-soft möglich.",
    scores: [
      { label: "Identität", value: 80 },
      { label: "Visual", value: 70 },
      { label: "Signal", value: 0 }
    ]
  },
  {
    name: "Zara Patel",
    lane: "Beauty, Skincare, Routine-Bildung",
    status: "Aktiv",
    color: colors.zara,
    image: "/personas_media/image7.png",
    nextAction:
      "Setcard und Inhaltsstoff-Carousel vorbereiten. Kein medizinischer Claim ohne Regelcheck.",
    scores: [
      { label: "Identität", value: 72 },
      { label: "Visual", value: 68 },
      { label: "Signal", value: 0 }
    ]
  },
  {
    name: "Luna Stone",
    lane: "Minimalismus, Slow Living, nachhaltige Produkte",
    status: "Aktiv",
    color: colors.luna,
    image: "/personas_media/image2.png",
    nextAction:
      "Clean-Living-Setcard bestätigen und erstes Minimalismus-Carousel briefen.",
    scores: [
      { label: "Identität", value: 76 },
      { label: "Visual", value: 82 },
      { label: "Signal", value: 0 }
    ]
  },
  {
    name: "Alex Moreno",
    lane: "Fitness, Disziplin, Anfänger-Sicherheit",
    status: "Aktiv",
    color: colors.alex,
    image: "/personas_media/image1.png",
    nextAction:
      "Disziplin-ohne-Überforderung als Hook testen. Transformation-Claims vermeiden.",
    scores: [
      { label: "Identität", value: 78 },
      { label: "Visual", value: 74 },
      { label: "Signal", value: 0 }
    ]
  },
  {
    name: "Sophie Larue",
    lane: "Y2K Fashion, Trend-Früherkennung, Shopping",
    status: "Aktiv",
    color: colors.sophie,
    nextAction:
      "Setcard fehlt. Erste Outfit-/Trend-Hypothese und Bildprompt vorbereiten.",
    scores: [
      { label: "Identität", value: 70 },
      { label: "Visual", value: 42 },
      { label: "Signal", value: 0 }
    ]
  },
  {
    name: "Emma Winters",
    lane: "Home-Organisation, Alltagssysteme, Familienhaushalt",
    status: "Aktiv",
    color: colors.emma,
    nextAction:
      "Setcard fehlt. Home-Organisation ohne Fake-Familienclaims positionieren.",
    scores: [
      { label: "Identität", value: 74 },
      { label: "Visual", value: 38 },
      { label: "Signal", value: 0 }
    ]
  }
];

export const todayQueue: QueueItem[] = [
  {
    id: "q1",
    title: "Workflow statt Tool-Sammlung",
    persona: "David",
    personaColor: colors.david,
    status: { label: "Gebrieft", tone: "info" },
    owner: "Gründer",
    due: "Heute",
    nextAction: "Carousel-Struktur und CTA schreiben"
  },
  {
    id: "q2",
    title: "Beauty-Mythos: Mehr ist nicht besser",
    persona: "Zara",
    personaColor: colors.zara,
    status: { label: "Idee", tone: "neutral" },
    owner: "Gründer",
    due: "Heute",
    nextAction: "Claim-safe Angle und Slidefolge definieren"
  },
  {
    id: "q3",
    title: "Weniger kaufen, besser wirken",
    persona: "Luna",
    personaColor: colors.luna,
    status: { label: "Material fehlt", tone: "danger" },
    owner: "Gründer",
    due: "Morgen",
    nextAction: "Setcard-Crop und nachhaltige Produktkategorie prüfen"
  },
  {
    id: "q4",
    title: "Disziplin ohne Überforderung",
    persona: "Alex",
    personaColor: colors.alex,
    status: { label: "Material fehlt", tone: "danger" },
    owner: "Partner",
    due: "Heute",
    nextAction: "Setcard-Crop und Bildvariante prüfen"
  },
  {
    id: "q5",
    title: "Y2K-Accessoire kommt zurück",
    persona: "Sophie",
    personaColor: colors.sophie,
    status: { label: "Idee", tone: "neutral" },
    owner: "Partner",
    due: "Morgen",
    nextAction: "Trendwinkel und Bildprompt definieren"
  },
  {
    id: "q6",
    title: "Küchenzone in 15 Minuten",
    persona: "Emma",
    personaColor: colors.emma,
    status: { label: "Prüfung nötig", tone: "warning" },
    owner: "Partner",
    due: "Morgen",
    nextAction: "Kein Fake-Familienclaim, nur System und Ablauf"
  },
  {
    id: "q7",
    title: "Videoeinsatz Tag 1",
    persona: "Alex / David",
    personaColor: colors.cyan,
    status: { label: "Prüfung nötig", tone: "warning" },
    owner: "Gründer",
    due: "Heute",
    nextAction: "Slot nach Lernwert bestätigen"
  }
];

export const decisions: DecisionItem[] = [
  {
    id: "d1",
    signal: "Kennzahlen fehlen",
    tone: "warning",
    title: "Noch keine echten Post-Metriken",
    persona: "Portfolio",
    reason:
      "Der Test startet ohne Messbasis. Die ersten Inhalte müssen so geplant werden, dass Saves, Shares und Follows sauber vergleichbar werden.",
    action: "Messfelder prüfen",
    color: colors.amber
  },
  {
    id: "d2",
    signal: "Videoeinsatz-Kandidat",
    tone: "info",
    title: "David bekommt einen frühen Lernslot",
    persona: "David",
    reason:
      "AI/Workflow kann schneller Utility-Signale erzeugen und ist später affiliate-näher als reine Identitätsposts.",
    action: "Video-Slot planen",
    color: colors.cyan
  },
  {
    id: "d3",
    signal: "Regelcheck",
    tone: "danger",
    title: "Zara, Alex und Emma brauchen Claim-Grenzen",
    persona: "Zara / Alex / Emma",
    reason:
      "Beauty, Fitness und Home dürfen nicht mit medizinischen, körperlichen oder gefälschten Nutzungsversprechen starten.",
    action: "Regelcheck öffnen",
    color: colors.red
  }
];

export const signalRadar: SignalRadarRow[] = [
  {
    id: "david-workflow",
    label: "Workflow-Format",
    persona: "David",
    days: radar([colors.cyan, colors.empty, colors.empty, colors.empty, colors.volt, colors.empty, colors.empty])
  },
  {
    id: "zara-routine",
    label: "Routine-Carousel",
    persona: "Zara",
    days: radar([colors.empty, colors.amber, colors.empty, colors.empty, colors.cyan, colors.empty, colors.empty])
  },
  {
    id: "luna-minimal",
    label: "Minimalismus-System",
    persona: "Luna",
    days: radar([colors.empty, colors.empty, colors.amber, colors.empty, colors.empty, colors.empty, colors.empty])
  },
  {
    id: "alex-discipline",
    label: "Disziplin-System",
    persona: "Alex",
    days: radar([colors.cyan, colors.empty, colors.empty, colors.amber, colors.empty, colors.empty, colors.empty])
  },
  {
    id: "sophie-y2k",
    label: "Y2K-Trendwinkel",
    persona: "Sophie",
    days: radar([colors.empty, colors.empty, colors.empty, colors.empty, colors.empty, colors.empty, colors.empty])
  },
  {
    id: "emma-home",
    label: "Home-System",
    persona: "Emma",
    days: radar([colors.amber, colors.empty, colors.empty, colors.empty, colors.empty, colors.empty, colors.empty])
  },
  {
    id: "portfolio-backlog",
    label: "14 Backlog-Personas",
    persona: "Portfolio",
    days: radar([colors.red, colors.red, colors.amber, colors.empty, colors.empty, colors.empty, colors.empty])
  }
];

function radar(colorsByDay: string[]) {
  return colorsByDay.map((color, index) => ({
    day: index + 1,
    label: labelForColor(color),
    color
  }));
}

function labelForColor(color: string) {
  if (color === colors.volt) return "Gewinner/Ausbauen";
  if (color === colors.cyan) return "Info/Videoeinsatz";
  if (color === colors.red) return "Risiko/Blockiert";
  if (color === colors.amber) return "Warnung";
  return "Noch kein Signal";
}
