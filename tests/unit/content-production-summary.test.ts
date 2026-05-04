import { describe, expect, it } from "vitest";

import { summarizeContentProduction } from "../../src/domain/content-production-summary";

describe("Content-Produktion-Zusammenfassung", () => {
  it("zaehlt Video-Slots getrennt von Kurzvideo-ContentItems", () => {
    const summary = summarizeContentProduction(
      [
        {
          plannedDateSort: new Date("2026-05-01T10:00:00.000Z").getTime(),
          statusLabel: "Gebrieft",
          assetTone: "danger",
          complianceTone: "warning"
        }
      ],
      2,
      new Date("2026-05-01T12:00:00.000Z")
    );

    expect(summary).toEqual({
      total: 1,
      dueNow: 1,
      readyToPost: 0,
      materialMissing: 1,
      complianceOpen: 1,
      videoSlots: 2
    });
  });
});
