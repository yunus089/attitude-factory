"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasActiveSession } from "./auth-guard";

export async function updateOfferReadiness(id: string, data: {
  category?: string;
  specificOfferName?: string;
  claimSafeAngle?: string;
  softCta?: string;
  readinessLevel?: number;
  status?: string;
}) {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    await prisma.offerReadinessItem.update({
      where: { id },
      data
    });
    revalidatePath("/angebots-check");
    return { success: true };
  } catch (error) {
    console.error("Offer Update Fehler:", error);
    return { success: false, error: "Angebots-Status konnte nicht aktualisiert werden." };
  }
}

export async function createOfferReadiness(personaId: string, category: string) {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    const newItem = await prisma.offerReadinessItem.create({
      data: {
        personaId,
        category,
        status: "offen",
        readinessLevel: 0
      }
    });
    revalidatePath("/angebots-check");
    return { success: true, id: newItem.id };
  } catch (error) {
    console.error("Offer Create Fehler:", error);
    return { success: false, error: "Angebots-Bereitschaft konnte nicht erstellt werden." };
  }
}
