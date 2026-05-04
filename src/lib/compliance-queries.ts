import { prisma } from "@/src/lib/prisma";

export type ComplianceCheckData = {
  id: string;
  contentId: string;
  hook: string;
  personaName: string;
  aiDisclosureChecked: boolean;
  affiliateDisclosureChecked: boolean;
  noFakeUsageClaim: boolean;
  noMedicalClaim: boolean;
  noFinancialClaim: boolean;
  notes: string | null;
  status: string;
};

export async function getComplianceChecks(): Promise<ComplianceCheckData[]> {
  const checks = await prisma.complianceCheck.findMany({
    include: {
      contentItem: {
        include: { persona: true }
      }
    },
    orderBy: { updatedAt: "desc" }
  });

  return checks.map(check => ({
    id: check.id,
    contentId: check.contentItemId,
    hook: check.contentItem.hook || "Ohne Hook",
    personaName: check.contentItem.persona.publicName || check.contentItem.persona.name,
    aiDisclosureChecked: check.aiDisclosureChecked,
    affiliateDisclosureChecked: check.affiliateDisclosureChecked,
    noFakeUsageClaim: check.noFakeUsageClaim,
    noMedicalClaim: check.noMedicalClaim,
    noFinancialClaim: check.noFinancialClaim,
    notes: check.notes,
    status: check.status
  }));
}
