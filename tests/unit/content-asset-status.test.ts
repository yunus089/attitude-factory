import { describe, expect, it } from "vitest";

import { summarizeProductionAssetStatus } from "../../src/domain/content-asset-status";

describe("Produktionsmaterial-Status", () => {
  it("zählt reine Prompt-Spuren nicht als fertiges oder kandidierendes Postmaterial", () => {
    expect(
      summarizeProductionAssetStatus([
        {
          assetType: "PROMPT",
          status: "KANDIDAT"
        }
      ])
    ).toEqual({ label: "Material fehlt", tone: "danger" });
  });

  it("erkennt freigegebenes Bildmaterial als produktionsbereit", () => {
    expect(
      summarizeProductionAssetStatus([
        {
          assetType: "POSTBILD",
          status: "FREIGEGEBENES_POST_MATERIAL"
        }
      ])
    ).toEqual({ label: "1/1 freigegeben", tone: "success" });
  });
});
