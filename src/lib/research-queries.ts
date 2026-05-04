import { prisma } from "@/src/lib/prisma";

export type ResearchItemData = {
  id: string;
  sourceUrl: string | null;
  note: string | null;
  personaName: string;
  category: string;
  whyItMatters: string | null;
  suggestedContentIdea: string | null;
  status: string;
  updatedAt: Date;
};

export async function getResearchItems(): Promise<ResearchItemData[]> {
  const items = await prisma.researchItem.findMany({
    include: { persona: true },
    orderBy: { updatedAt: "desc" }
  });

  return items.map(item => ({
    id: item.id,
    sourceUrl: item.sourceUrl,
    note: item.note,
    personaName: item.persona ? (item.persona.publicName || item.persona.name) : "Allgemein",
    category: item.category,
    whyItMatters: item.whyItMatters,
    suggestedContentIdea: item.suggestedContentIdea,
    status: item.status,
    updatedAt: item.updatedAt
  }));
}
