import { prisma } from "@/src/lib/prisma";

export type OfferReadinessData = {
  id: string;
  personaName: string;
  personaLane: string;
  personaColor: string;
  category: string;
  specificOffer: string | null;
  readinessLevel: number; // 0-5
  status: string;
  claimSafeAngle: string | null;
  softCta: string | null;
  updatedAt: Date;
};

export async function getOfferReadinessData(): Promise<OfferReadinessData[]> {
  const items = await prisma.offerReadinessItem.findMany({
    include: {
      persona: true,
    },
    orderBy: [
      { readinessLevel: "desc" },
      { persona: { name: "asc" } }
    ]
  });

  return items.map(item => ({
    id: item.id,
    personaName: item.persona.publicName || item.persona.name,
    personaLane: item.persona.lane,
    personaColor: "#A7AFAA", // We should ideally get this from a helper
    category: item.category,
    specificOffer: item.specificOfferName,
    readinessLevel: item.readinessLevel,
    status: item.status,
    claimSafeAngle: item.claimSafeAngle,
    softCta: item.softCta,
    updatedAt: item.updatedAt,
  }));
}
