/**
 * Kennzahlen-Signallogik v1
 *
 * Deterministische Entscheidungssignale. Keine KI.
 * Basiert auf Raten pro 1.000 Reichweite + Portfolio-Median-Vergleich.
 * Jedes Signal trägt immer eine Begründung für den Operator.
 */

export type MetricRates = {
  savesPerThousand: number | null;
  sharesPerThousand: number | null;
  followsPerThousand: number | null;
  profileVisitsPerThousand: number | null;
  commentsPerThousand: number | null;
  engagementRate: number | null;
};

export type PortfolioMedian = {
  savesPerThousand: number;
  sharesPerThousand: number;
  followsPerThousand: number;
  profileVisitsPerThousand: number;
};

export type MetricSignalResult = {
  signal: MetricSignal;
  reason: string;
  nextAction: string;
};

export type MetricSignal =
  | "KENNZAHLEN_FEHLEN"
  | "GEWINNER_KANDIDAT"
  | "VIDEOEINSATZ_KANDIDAT"
  | "SCHWACHES_SIGNAL"
  | "AUSBAUEN"
  | "STOPPEN_PAUSIEREN"
  | "WIEDERVERWENDEN"
  | "MEHR_DATEN_NOETIG";

export type RawMetric = {
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  profileVisits: number;
  follows: number;
  linkClicks: number;
};

/**
 * Berechnet Raten pro 1.000 Reichweite.
 * Gibt null zurück wenn Reichweite = 0 (keine Division durch 0).
 */
export function calculateRates(metric: RawMetric): MetricRates {
  const r = metric.reach;

  if (r === 0) {
    return {
      savesPerThousand: null,
      sharesPerThousand: null,
      followsPerThousand: null,
      profileVisitsPerThousand: null,
      commentsPerThousand: null,
      engagementRate: null
    };
  }

  const per1k = (val: number) => Math.round((val / r) * 1000 * 100) / 100;

  const engagements = metric.likes + metric.comments + metric.saves + metric.shares;
  const engRate = Math.round((engagements / r) * 100 * 100) / 100;

  return {
    savesPerThousand: per1k(metric.saves),
    sharesPerThousand: per1k(metric.shares),
    followsPerThousand: per1k(metric.follows),
    profileVisitsPerThousand: per1k(metric.profileVisits),
    commentsPerThousand: per1k(metric.comments),
    engagementRate: engRate
  };
}

/**
 * Berechnet den Portfolio-Median aus einer Liste von Snapshots.
 * Gibt Standard-Schwellwerte zurück wenn zu wenig Daten vorhanden.
 */
export function calculatePortfolioMedian(snapshots: RawMetric[]): PortfolioMedian {
  const rates = snapshots.map(calculateRates).filter((r) => r.savesPerThousand !== null);

  if (rates.length < 3) {
    // Zu wenig Daten — Basis-Schwellwerte als Fallback
    return {
      savesPerThousand: 5,
      sharesPerThousand: 2,
      followsPerThousand: 3,
      profileVisitsPerThousand: 8
    };
  }

  return {
    savesPerThousand: median(rates.map((r) => r.savesPerThousand!)),
    sharesPerThousand: median(rates.map((r) => r.sharesPerThousand!)),
    followsPerThousand: median(rates.map((r) => r.followsPerThousand!)),
    profileVisitsPerThousand: median(rates.map((r) => r.profileVisitsPerThousand!))
  };
}

/**
 * Hauptlogik: Erzeugt ein Entscheidungssignal + Begründung.
 * Entspricht der Entscheidungslogik aus LAUNCH_DOCTRINE_V1.md.
 */
export function evaluateSignal(metric: RawMetric, portfolioMedian: PortfolioMedian): MetricSignalResult {
  // Kein Snapshot vorhanden
  if (metric.reach === 0 && metric.impressions === 0) {
    return {
      signal: "KENNZAHLEN_FEHLEN",
      reason: "Noch keine Reichweitendaten eingetragen.",
      nextAction: "Reach, Saves, Shares und Follows aus Instagram Insights nachtragen."
    };
  }

  // Reichweite vorhanden aber = 0 bei ansonsten eingetragenen Daten
  if (metric.reach === 0) {
    return {
      signal: "MEHR_DATEN_NOETIG",
      reason: "Reichweite ist 0 — Ratenberechnung nicht möglich.",
      nextAction: "Korrekte Reichweite aus Instagram Insights nachtragen."
    };
  }

  const rates = calculateRates(metric);

  const savesAboveMedian = (rates.savesPerThousand ?? 0) > portfolioMedian.savesPerThousand;
  const sharesAboveMedian = (rates.sharesPerThousand ?? 0) > portfolioMedian.sharesPerThousand;
  const followsAboveMedian = (rates.followsPerThousand ?? 0) > portfolioMedian.followsPerThousand;
  const profileVisitsAboveMedian = (rates.profileVisitsPerThousand ?? 0) > portfolioMedian.profileVisitsPerThousand;

  const strongCount = [savesAboveMedian, sharesAboveMedian, followsAboveMedian].filter(Boolean).length;

  // AUSBAUEN: Saves + Shares über Median — Format verdient Serie
  if (savesAboveMedian && sharesAboveMedian) {
    return {
      signal: "AUSBAUEN",
      reason: `Saves (${rates.savesPerThousand}/1k) und Shares (${rates.sharesPerThousand}/1k) schlagen den Portfolio-Median. Format funktioniert wiederholbar.`,
      nextAction: "Format als Serie anlegen. Variante mit neuem Hook oder Visual planen."
    };
  }

  // VIDEOEINSATZ_KANDIDAT: Hohe Saves + gute Profilbesuche = Lernwert für Video-Slot
  if (savesAboveMedian && profileVisitsAboveMedian) {
    return {
      signal: "VIDEOEINSATZ_KANDIDAT",
      reason: `Saves (${rates.savesPerThousand}/1k) und Profilbesuche (${rates.profileVisitsPerThousand}/1k) über Median. Persona erzeugt Nutzwert-Interesse.`,
      nextAction: "Video-Slot für dieses Thema oder Format prüfen. Reichweiten-Lernwert wahrscheinlich hoch."
    };
  }

  // GEWINNER_KANDIDAT: Mindestens 2 von 3 Primärsignalen stark
  if (strongCount >= 2) {
    return {
      signal: "GEWINNER_KANDIDAT",
      reason: `${strongCount} von 3 Primärsignalen über Portfolio-Median (Saves: ${rates.savesPerThousand}/1k, Shares: ${rates.sharesPerThousand}/1k, Follows: ${rates.followsPerThousand}/1k).`,
      nextAction: "Weitere Inhalte in dieser Richtung planen. Hypothesis zum Gewinnerformat festhalten."
    };
  }

  // WIEDERVERWENDEN: Follows stark, aber Saves/Shares schwach — Persona-Fit da, Format optimierbar
  if (followsAboveMedian && !savesAboveMedian && !sharesAboveMedian) {
    return {
      signal: "WIEDERVERWENDEN",
      reason: `Follows (${rates.followsPerThousand}/1k) über Median, aber Saves und Shares unter Median. Persona hat Account-Fit, Format liefert wenig Nutzwert.`,
      nextAction: "Inhalt als Basis wiederverwenden. Hook oder Format mit stärkerem Nutzwert-Signal testen."
    };
  }

  // SCHWACHES_SIGNAL: Alles unter Median bei ausreichend Reichweite
  if (metric.reach >= 200) {
    return {
      signal: "SCHWACHES_SIGNAL",
      reason: `Saves (${rates.savesPerThousand}/1k), Shares (${rates.sharesPerThousand}/1k) und Follows (${rates.followsPerThousand}/1k) unter Portfolio-Median bei ausreichend Reichweite (${metric.reach}).`,
      nextAction: "Hook, Angle oder Format überdenken. Mindestens 3 weitere Versuche mit engerer Hypothese."
    };
  }

  // Zu wenig Reichweite für belastbare Aussage
  return {
    signal: "MEHR_DATEN_NOETIG",
    reason: `Reichweite (${metric.reach}) zu niedrig für belastbare Signalauswertung. Minimum: 200.`,
    nextAction: "Mehr organische Reichweite abwarten. Kein harter Stopp-Entscheid auf Basis dieser Daten."
  };
}

/**
 * Batch-Auswertung: Welche ContentItems brauchen noch Kennzahlen?
 */
export function findItemsMissingMetrics(items: Array<{ id: string; status: string; hasMetric: boolean }>) {
  return items.filter(
    (item) =>
      (item.status === "GEPOSTET" || item.status === "KENNZAHLEN_FEHLEN") && !item.hasMetric
  );
}

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}
