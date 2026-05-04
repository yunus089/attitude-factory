"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasActiveSession } from "./auth-guard";

export async function updatePersonaVisualIdentity(id: string, data: {
  visualIdentity?: string;
  visualColorPalette?: string;
  visualLocations?: string;
  visualOutfitAnchors?: string;
  visualLightingLogic?: string;
  visualCameraDistance?: string;
  visualNoGoImages?: string;
  visualFaceConsistency?: string;
}) {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    await prisma.persona.update({
      where: { id },
      data
    });
    revalidatePath("/personas");
    return { success: true };
  } catch (error) {
    console.error("Persona Visual Update Fehler:", error);
    return { success: false, error: "Visual Identity konnte nicht aktualisiert werden." };
  }
}
