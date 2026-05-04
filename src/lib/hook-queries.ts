import { prisma } from "@/src/lib/prisma";

export type HookEngineItem = {
  id: string;
  text: string;
  personaName: string;
  personaLane: string;
  status: string; // "idee", "getestet", "gewinner", "schwach"
  intent: string;
  triggerTags: string[];
  usageCount: number;
  lastUsedAt: Date | null;
  createdAt: Date;
};

export async function getHookEngineData(): Promise<HookEngineItem[]> {
  const hooks = await prisma.hook.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      persona: true,
      contentItems: {
        select: {
          plannedDate: true,
          postedAt: true
        },
        orderBy: {
          plannedDate: "desc"
        },
        take: 1
      },
      _count: {
        select: { contentItems: true }
      }
    }
  });

  return hooks.map(h => ({
    id: h.id,
    text: h.text,
    personaName: h.persona.publicName || h.persona.name,
    personaLane: h.persona.lane,
    status: h.status,
    intent: h.intent,
    triggerTags: h.triggerTags,
    usageCount: h._count.contentItems,
    lastUsedAt: h.contentItems[0]?.postedAt || h.contentItems[0]?.plannedDate || null,
    createdAt: h.createdAt
  }));
}
