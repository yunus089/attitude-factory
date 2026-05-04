"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasActiveSession } from "./auth-guard";

export async function createSpinOff(hookId: string) {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    const hook = await prisma.hook.findUnique({
      where: { id: hookId },
      include: { persona: true }
    });

    if (!hook) {
      throw new Error("Hook nicht gefunden");
    }

    const newItem = await prisma.contentItem.create({
      data: {
        personaId: hook.personaId,
        hook: hook.text, // Snapshot the hook text
        hookId: hook.id, // Keep the link
        intent: hook.intent,
        triggerTags: hook.triggerTags,
        status: "IDEE",
        format: "EINZELBILD", // Default format
        originalityStatus: "offen",
        complianceStatus: "offen"
      }
    });

    revalidatePath("/experimente");
    revalidatePath("/content-produktion");
    
    return { success: true, itemId: newItem.id };
  } catch (error) {
    console.error("Spin-Off Fehler:", error);
    return { success: false, error: "Spin-Off konnte nicht erstellt werden." };
  }
}

export async function updateHookStatus(hookId: string, status: "IDEE" | "GETESTET" | "GEWINNER" | "SCHWACH") {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    await prisma.hook.update({
      where: { id: hookId },
      data: { status }
    });
    revalidatePath("/experimente");
    return { success: true };
  } catch (error) {
    console.error("Hook Update Fehler:", error);
    return { success: false, error: "Hook-Status konnte nicht aktualisiert werden." };
  }
}
