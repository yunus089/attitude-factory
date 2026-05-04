import { describe, expect, it } from "vitest";

import {
  buildPostMaterialStoragePath,
  nextContentStatusAfterPostMaterialUpload,
  validatePostMaterialUpload
} from "../../src/domain/post-material-upload";

describe("Postmaterial-Upload", () => {
  it("akzeptiert Bildmaterial fuer Postbilder und Carousel-Slides innerhalb des Limits", () => {
    expect(
      validatePostMaterialUpload({
        assetType: "POSTBILD",
        mimeType: "image/png",
        byteSize: 3 * 1024 * 1024
      })
    ).toEqual({ ok: true });

    expect(
      validatePostMaterialUpload({
        assetType: "CAROUSEL_SLIDE",
        mimeType: "image/webp",
        byteSize: 2 * 1024 * 1024
      })
    ).toEqual({ ok: true });
  });

  it("weist falsche Dateitypen und zu grosse Dateien mit deutscher Fehlermeldung ab", () => {
    expect(
      validatePostMaterialUpload({
        assetType: "POSTBILD",
        mimeType: "video/mp4",
        byteSize: 1_000
      })
    ).toEqual({
      ok: false,
      error: "Postbilder und Carousel-Slides brauchen JPG, PNG oder WEBP."
    });

    expect(
      validatePostMaterialUpload({
        assetType: "KURZVIDEO",
        mimeType: "video/mp4",
        byteSize: 81 * 1024 * 1024
      })
    ).toEqual({
      ok: false,
      error: "Videos duerfen maximal 80 MB gross sein."
    });
  });

  it("baut Speicherpfade ohne Original-Dateinamen oder Pfadbestandteile", () => {
    expect(
      buildPostMaterialStoragePath({
        contentItemId: "content_123",
        fileId: "file_456",
        mimeType: "image/jpeg",
        originalFilename: "..\\..\\secret.exe"
      })
    ).toBe("content/content_123/file_456.jpg");
  });

  it("setzt Inhalte mit brauchbarem Postmaterial auf Material bereit", () => {
    expect(nextContentStatusAfterPostMaterialUpload("MATERIAL_FEHLT", "KANDIDAT")).toBe(
      "MATERIAL_BEREIT"
    );
    expect(nextContentStatusAfterPostMaterialUpload("TEXT_ENTWURF", "FREIGEGEBENES_POST_MATERIAL")).toBe(
      "MATERIAL_BEREIT"
    );
    expect(nextContentStatusAfterPostMaterialUpload("PRUEFUNG", "KANDIDAT")).toBe("PRUEFUNG");
    expect(nextContentStatusAfterPostMaterialUpload("MATERIAL_FEHLT", "BEARBEITEN")).toBe(
      "MATERIAL_FEHLT"
    );
  });
});
