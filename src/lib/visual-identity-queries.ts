import { prisma } from "@/src/lib/prisma";

export type PersonaVisualIdentity = {
  id: string;
  name: string;
  publicName: string;
  visualIdentity: string | null;
  visualColorPalette: string | null;
  visualLocations: string | null;
  visualOutfitAnchors: string | null;
  visualLightingLogic: string | null;
  visualCameraDistance: string | null;
  visualNoGoImages: string | null;
  visualFaceConsistency: string | null;
};

export async function getPersonaVisualIdentity(id: string): Promise<PersonaVisualIdentity | null> {
  const persona = await prisma.persona.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      publicName: true,
      visualIdentity: true,
      visualColorPalette: true,
      visualLocations: true,
      visualOutfitAnchors: true,
      visualLightingLogic: true,
      visualCameraDistance: true,
      visualNoGoImages: true,
      visualFaceConsistency: true,
    }
  });

  return persona;
}
