export type PostMaterialAssetType = "POSTBILD" | "CAROUSEL_SLIDE" | "KURZVIDEO";
export type PostMaterialAssetStatus = "KANDIDAT" | "FREIGEGEBENES_POST_MATERIAL" | "BEARBEITEN";

export type UploadValidationInput = {
  assetType: string;
  mimeType: string;
  byteSize: number;
};

export type UploadValidationResult =
  | { ok: true }
  | { ok: false; error: string };

export type ContentStatusForMaterial =
  | "IDEE"
  | "GEBRIEFT"
  | "TEXT_ENTWURF"
  | "MATERIAL_FEHLT"
  | "MATERIAL_BEREIT"
  | "PRUEFUNG"
  | "BEREIT_ZUM_POSTEN"
  | "GEPOSTET"
  | "KENNZAHLEN_FEHLEN"
  | "AUSGEWERTET"
  | "WIEDERVERWENDEN"
  | "AUSBAUEN"
  | "STOPPEN_PAUSIEREN";

const imageAssetTypes = new Set(["POSTBILD", "CAROUSEL_SLIDE"]);
const allowedImageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const allowedVideoMimeTypes = new Set(["video/mp4", "video/quicktime"]);

const imageLimitBytes = 15 * 1024 * 1024;
const videoLimitBytes = 80 * 1024 * 1024;

export function validatePostMaterialUpload(input: UploadValidationInput): UploadValidationResult {
  if (!isPostMaterialAssetType(input.assetType)) {
    return { ok: false, error: "Unbekannter Materialtyp." };
  }

  if (input.byteSize <= 0) {
    return { ok: false, error: "Datei ist leer." };
  }

  if (imageAssetTypes.has(input.assetType)) {
    if (!allowedImageMimeTypes.has(input.mimeType)) {
      return {
        ok: false,
        error: "Postbilder und Carousel-Slides brauchen JPG, PNG oder WEBP."
      };
    }

    if (input.byteSize > imageLimitBytes) {
      return { ok: false, error: "Bilder duerfen maximal 15 MB gross sein." };
    }

    return { ok: true };
  }

  if (!allowedVideoMimeTypes.has(input.mimeType)) {
    return { ok: false, error: "Kurzvideos brauchen MP4 oder MOV." };
  }

  if (input.byteSize > videoLimitBytes) {
    return { ok: false, error: "Videos duerfen maximal 80 MB gross sein." };
  }

  return { ok: true };
}

export function buildPostMaterialStoragePath({
  contentItemId,
  fileId,
  mimeType
}: {
  contentItemId: string;
  fileId: string;
  mimeType: string;
  originalFilename: string;
}) {
  return `content/${slugPart(contentItemId)}/${slugPart(fileId)}${extensionForMimeType(mimeType)}`;
}

export function nextContentStatusAfterPostMaterialUpload(
  currentStatus: ContentStatusForMaterial,
  assetStatus: PostMaterialAssetStatus
): ContentStatusForMaterial {
  if (assetStatus === "BEARBEITEN") {
    return currentStatus;
  }

  if (["GEBRIEFT", "TEXT_ENTWURF", "MATERIAL_FEHLT"].includes(currentStatus)) {
    return "MATERIAL_BEREIT";
  }

  return currentStatus;
}

export function isPostMaterialAssetType(value: string): value is PostMaterialAssetType {
  return value === "POSTBILD" || value === "CAROUSEL_SLIDE" || value === "KURZVIDEO";
}

export function isPostMaterialAssetStatus(value: string): value is PostMaterialAssetStatus {
  return value === "KANDIDAT" || value === "FREIGEGEBENES_POST_MATERIAL" || value === "BEARBEITEN";
}

export function extensionForMimeType(mimeType: string) {
  switch (mimeType) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "video/mp4":
      return ".mp4";
    case "video/quicktime":
      return ".mov";
    default:
      return "";
  }
}

function slugPart(value: string) {
  const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, "");
  return cleaned || "datei";
}
