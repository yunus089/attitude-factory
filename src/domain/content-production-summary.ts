export type SummaryTone = "neutral" | "success" | "warning" | "danger" | "info" | "active";

export type ContentProductionSummaryInput = {
  plannedDateSort: number;
  statusLabel: string;
  assetTone: SummaryTone;
  complianceTone: SummaryTone;
};

export type ContentProductionSummaryResult = {
  total: number;
  dueNow: number;
  readyToPost: number;
  materialMissing: number;
  complianceOpen: number;
  videoSlots: number;
};

export function summarizeContentProduction(
  items: ContentProductionSummaryInput[],
  videoSlotCount: number,
  now = new Date()
): ContentProductionSummaryResult {
  return {
    total: items.length,
    dueNow: items.filter((item) => item.plannedDateSort <= endOfDay(now)).length,
    readyToPost: items.filter((item) => item.statusLabel === "Bereit zum Posten").length,
    materialMissing: items.filter((item) => item.assetTone === "danger").length,
    complianceOpen: items.filter(
      (item) => item.complianceTone === "warning" || item.complianceTone === "danger"
    ).length,
    videoSlots: videoSlotCount
  };
}

function endOfDay(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(23, 59, 59, 999);
  return nextDate.getTime();
}
