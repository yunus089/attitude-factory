"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasActiveSession } from "./auth-guard";

export async function updateComplianceCheck(id: string, data: {
  aiDisclosureChecked?: boolean;
  affiliateDisclosureChecked?: boolean;
  noFakeUsageClaim?: boolean;
  noMedicalClaim?: boolean;
  noFinancialClaim?: boolean;
  notes?: string;
  status?: string;
}) {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    const check = await prisma.complianceCheck.update({
      where: { id },
      data
    });

    // Automatically update ContentItem compliance status
    let newStatus = "offen";
    if (check.status === "bestanden") {
      newStatus = "bestanden";
    } else if (check.status === "risiko") {
      newStatus = "risiko";
    }

    await prisma.contentItem.update({
      where: { id: check.contentItemId },
      data: { complianceStatus: newStatus }
    });

    revalidatePath("/regelcheck");
    revalidatePath("/content-produktion");
    
    return { success: true };
  } catch (error) {
    console.error("Compliance Update Fehler:", error);
    return { success: false, error: "Compliance-Check konnte nicht aktualisiert werden." };
  }
}
