"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasActiveSession } from "./auth-guard";

export async function createResearchItem(data: {
  personaId: string;
  sourceUrl?: string;
  category: string;
  note?: string;
  whyItMatters?: string;
  suggestedContentIdea?: string;
}) {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    const item = await prisma.researchItem.create({
      data: {
        personaId: data.personaId,
        category: data.category,
        sourceUrl: data.sourceUrl ?? null,
        note: data.note ?? null,
        whyItMatters: data.whyItMatters ?? null,
        suggestedContentIdea: data.suggestedContentIdea ?? null,
        status: "offen"
      }
    });
    revalidatePath("/recherche");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Research Create Fehler:", error);
    return { success: false, error: "Recherche-Eintrag konnte nicht erstellt werden." };
  }
}

export async function convertResearchToContent(researchId: string) {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    const research = await prisma.researchItem.findUnique({
      where: { id: researchId },
      include: { persona: true }
    });

    if (!research) throw new Error("Research Item nicht gefunden");
    if (!research.personaId) throw new Error("Keine Persona für dieses Research Item definiert");

    // Create a new ContentItem based on research
    const newItem = await prisma.contentItem.create({
      data: {
        personaId: research.personaId,
        hook: research.suggestedContentIdea || research.note || "Neuer Hook aus Recherche",
        intent: "REICHWEITE", // Default
        status: "IDEE",
        format: "EINZELBILD",
        originalityStatus: "offen",
        complianceStatus: "offen"
      }
    });

    // Update research status
    await prisma.researchItem.update({
      where: { id: researchId },
      data: { status: "umgesetzt" }
    });

    revalidatePath("/recherche");
    revalidatePath("/content-produktion");
    
    return { success: true, contentItemId: newItem.id };
  } catch (error) {
    console.error("Research Conversion Fehler:", error);
    return { success: false, error: "Recherche konnte nicht in Content umgewandelt werden." };
  }
}
