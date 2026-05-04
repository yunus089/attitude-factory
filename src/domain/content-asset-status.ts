export type ProductionAssetStatusInput = {
  assetType: string;
  status: string;
};

export type ProductionAssetStatusSummary = {
  label: string;
  tone: "neutral" | "success" | "warning" | "danger" | "info" | "active";
};

const productionAssetTypes = new Set(["POSTBILD", "CAROUSEL_SLIDE", "KURZVIDEO"]);

export function summarizeProductionAssetStatus(
  assets: ProductionAssetStatusInput[]
): ProductionAssetStatusSummary {
  const productionAssets = assets.filter((asset) => productionAssetTypes.has(asset.assetType));

  if (productionAssets.length === 0) {
    return { label: "Material fehlt", tone: "danger" };
  }

  const approved = productionAssets.filter(
    (asset) =>
      asset.status === "FREIGEGEBENES_POST_MATERIAL" ||
      asset.status === "FREIGEGEBENE_REFERENZ"
  ).length;

  if (approved > 0) {
    return { label: `${approved}/${productionAssets.length} freigegeben`, tone: "success" };
  }

  if (productionAssets.some((asset) => asset.status === "ABGELEHNT")) {
    return { label: "Asset abgelehnt", tone: "danger" };
  }

  if (productionAssets.some((asset) => asset.status === "BEARBEITEN")) {
    return { label: "Bearbeitung nötig", tone: "warning" };
  }

  if (productionAssets.some((asset) => asset.status === "KANDIDAT")) {
    return { label: `${productionAssets.length} Kandidat(en)`, tone: "info" };
  }

  return { label: `${productionAssets.length} Rohmaterial`, tone: "neutral" };
}
