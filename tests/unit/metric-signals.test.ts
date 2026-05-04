import { describe, expect, it } from "vitest";

import {
  calculatePortfolioMedian,
  calculateRates,
  evaluateSignal,
  findItemsMissingMetrics,
  type RawMetric
} from "../../src/domain/metric-signals";

const BASE_MEDIAN = {
  savesPerThousand: 5,
  sharesPerThousand: 2,
  followsPerThousand: 3,
  profileVisitsPerThousand: 8
};

const STRONG_POST: RawMetric = {
  impressions: 1500,
  reach: 1000,
  likes: 80,
  comments: 12,
  saves: 80,  // 80/1k > 5 Median
  shares: 30, // 30/1k > 2 Median
  profileVisits: 50,
  follows: 20, // 20/1k > 3 Median
  linkClicks: 5
};

const WEAK_POST: RawMetric = {
  impressions: 1200,
  reach: 800,
  likes: 20,
  comments: 2,
  saves: 2,   // 2.5/1k < 5 Median
  shares: 1,  // 1.25/1k < 2 Median
  profileVisits: 5,
  follows: 1, // 1.25/1k < 3 Median
  linkClicks: 0
};

describe("calculateRates", () => {
  it("berechnet Raten pro 1.000 Reichweite korrekt", () => {
    const rates = calculateRates(STRONG_POST);
    expect(rates.savesPerThousand).toBe(80);
    expect(rates.sharesPerThousand).toBe(30);
    expect(rates.followsPerThousand).toBe(20);
  });

  it("gibt null zurueck wenn Reichweite = 0 (keine Division durch 0)", () => {
    const rates = calculateRates({ ...STRONG_POST, reach: 0 });
    expect(rates.savesPerThousand).toBeNull();
    expect(rates.sharesPerThousand).toBeNull();
    expect(rates.followsPerThousand).toBeNull();
    expect(rates.engagementRate).toBeNull();
  });

  it("berechnet Engagement-Rate korrekt", () => {
    // (80 likes + 12 comments + 80 saves + 30 shares) / 1000 * 100 = 20.2%
    const rates = calculateRates(STRONG_POST);
    expect(rates.engagementRate).toBe(20.2);
  });
});

describe("calculatePortfolioMedian", () => {
  it("gibt Basis-Schwellwerte zurueck bei weniger als 3 Snapshots", () => {
    const median = calculatePortfolioMedian([]);
    expect(median.savesPerThousand).toBe(5);
    expect(median.sharesPerThousand).toBe(2);
    expect(median.followsPerThousand).toBe(3);
  });

  it("berechnet den echten Median aus ausreichend Snapshots", () => {
    const snapshots: RawMetric[] = [
      { impressions: 1000, reach: 1000, likes: 10, comments: 5, saves: 10, shares: 5, profileVisits: 20, follows: 5, linkClicks: 0 },
      { impressions: 1000, reach: 1000, likes: 10, comments: 5, saves: 30, shares: 10, profileVisits: 30, follows: 10, linkClicks: 0 },
      { impressions: 1000, reach: 1000, likes: 10, comments: 5, saves: 20, shares: 7, profileVisits: 25, follows: 7, linkClicks: 0 }
    ];
    const median = calculatePortfolioMedian(snapshots);
    // Saves: [10, 20, 30] → Median = 20
    expect(median.savesPerThousand).toBe(20);
    // Shares: [5, 7, 10] → Median = 7
    expect(median.sharesPerThousand).toBe(7);
  });

  it("ignoriert Snapshots mit Reichweite = 0 bei der Berechnung", () => {
    const snapshots: RawMetric[] = [
      { impressions: 0, reach: 0, likes: 0, comments: 0, saves: 0, shares: 0, profileVisits: 0, follows: 0, linkClicks: 0 },
      { impressions: 1000, reach: 1000, likes: 10, comments: 5, saves: 20, shares: 5, profileVisits: 20, follows: 5, linkClicks: 0 },
      { impressions: 1000, reach: 1000, likes: 10, comments: 5, saves: 40, shares: 8, profileVisits: 30, follows: 8, linkClicks: 0 }
    ];
    // Nur 2 valide Snapshots → Basis-Schwellwerte
    const median = calculatePortfolioMedian(snapshots);
    expect(median.savesPerThousand).toBe(5); // Fallback
  });
});

describe("evaluateSignal", () => {
  it("gibt KENNZAHLEN_FEHLEN zurueck bei komplett leerem Snapshot", () => {
    const empty: RawMetric = {
      impressions: 0, reach: 0, likes: 0, comments: 0,
      saves: 0, shares: 0, profileVisits: 0, follows: 0, linkClicks: 0
    };
    const result = evaluateSignal(empty, BASE_MEDIAN);
    expect(result.signal).toBe("KENNZAHLEN_FEHLEN");
  });

  it("gibt MEHR_DATEN_NOETIG zurueck wenn Reichweite = 0 aber Impressionen vorhanden", () => {
    const result = evaluateSignal({ ...STRONG_POST, reach: 0 }, BASE_MEDIAN);
    expect(result.signal).toBe("MEHR_DATEN_NOETIG");
  });

  it("gibt AUSBAUEN bei Saves UND Shares ueber Median", () => {
    const result = evaluateSignal(STRONG_POST, BASE_MEDIAN);
    expect(result.signal).toBe("AUSBAUEN");
    expect(result.reason).toContain("Saves");
    expect(result.reason).toContain("Shares");
  });

  it("gibt SCHWACHES_SIGNAL wenn alle Raten unter Median und Reichweite >= 200", () => {
    const result = evaluateSignal(WEAK_POST, BASE_MEDIAN);
    expect(result.signal).toBe("SCHWACHES_SIGNAL");
  });

  it("gibt MEHR_DATEN_NOETIG statt SCHWACHES_SIGNAL wenn Reichweite unter 200", () => {
    // Bei reach=150 und saves=0 bleiben alle Raten = 0, alle unter Median
    // → kein AUSBAUEN/WIEDERVERWENDEN/SCHWACH möglich, da reach < 200
    const thinReach: RawMetric = {
      impressions: 160,
      reach: 150,
      likes: 5,
      comments: 0,
      saves: 0,
      shares: 0,
      profileVisits: 1,
      follows: 0,
      linkClicks: 0
    };
    const result = evaluateSignal(thinReach, BASE_MEDIAN);
    expect(result.signal).toBe("MEHR_DATEN_NOETIG");
  });

  it("gibt WIEDERVERWENDEN wenn Follows stark aber Saves und Shares schwach", () => {
    const followsOnlyPost: RawMetric = {
      ...WEAK_POST,
      reach: 500,
      follows: 10, // 20/1k > 3 Median
      saves: 1,    // 2/1k < 5 Median
      shares: 0    // 0/1k < 2 Median
    };
    const result = evaluateSignal(followsOnlyPost, BASE_MEDIAN);
    expect(result.signal).toBe("WIEDERVERWENDEN");
  });

  it("gibt VIDEOEINSATZ_KANDIDAT bei starken Saves und Profilbesuchen", () => {
    const savesPlusProfile: RawMetric = {
      impressions: 1000,
      reach: 1000,
      likes: 20,
      comments: 5,
      saves: 60,       // 60/1k > 5 Median — saves stark
      shares: 1,       // 1/1k < 2 Median — shares schwach (kein AUSBAUEN)
      profileVisits: 20, // 20/1k > 8 Median — profil stark
      follows: 2,      // 2/1k < 3 Median
      linkClicks: 0
    };
    const result = evaluateSignal(savesPlusProfile, BASE_MEDIAN);
    expect(result.signal).toBe("VIDEOEINSATZ_KANDIDAT");
  });

  it("jedes Signal traegt immer eine Begruendung und naechste Aktion", () => {
    for (const metric of [STRONG_POST, WEAK_POST]) {
      const result = evaluateSignal(metric, BASE_MEDIAN);
      expect(result.reason.length).toBeGreaterThan(10);
      expect(result.nextAction.length).toBeGreaterThan(10);
    }
  });
});

describe("findItemsMissingMetrics", () => {
  it("findet gepostete Items ohne Snapshot", () => {
    const items = [
      { id: "a", status: "GEPOSTET", hasMetric: false },
      { id: "b", status: "GEPOSTET", hasMetric: true },
      { id: "c", status: "KENNZAHLEN_FEHLEN", hasMetric: false },
      { id: "d", status: "IDEE", hasMetric: false }
    ];
    const missing = findItemsMissingMetrics(items);
    expect(missing.map((i) => i.id)).toEqual(["a", "c"]);
  });

  it("ignoriert Items die nicht gepostet sind", () => {
    const items = [
      { id: "a", status: "IDEE", hasMetric: false },
      { id: "b", status: "GEBRIEFT", hasMetric: false }
    ];
    expect(findItemsMissingMetrics(items)).toHaveLength(0);
  });
});
