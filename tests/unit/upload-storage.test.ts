import path from "node:path";
import { describe, expect, it } from "vitest";

import { resolveUploadFilePath, uploadPublicUrlFor } from "../../src/lib/upload-storage";

describe("Upload-Speicherpfade", () => {
  it("loest relative Upload-Pfade innerhalb des Upload-Roots auf", () => {
    const root = path.join("C:", "attitude", "uploads");

    expect(resolveUploadFilePath(root, "content/item/file.png")).toBe(
      path.resolve(root, "content/item/file.png")
    );
  });

  it("blockiert Pfade ausserhalb des Upload-Roots", () => {
    expect(() => resolveUploadFilePath("C:/attitude/uploads", "../secret.txt")).toThrow(
      "Upload-Pfad verlaesst den erlaubten Speicherbereich."
    );
  });

  it("erzeugt interne Vorschau-URLs fuer gespeicherte Uploads", () => {
    expect(uploadPublicUrlFor("content/item/file.png")).toBe("/api/uploads/content/item/file.png");
  });
});
