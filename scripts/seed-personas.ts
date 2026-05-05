
import { PersonaStatus, PlatformName } from "@prisma/client";

import { PERSONA_PORTFOLIO, type PersonaOperatorKey } from "../src/domain/persona-portfolio";
import { prisma } from "../src/lib/prisma";

const founderEmail = process.env.SEED_GRUENDER_EMAIL ?? "gruender@attitude-factory.com";
const operatorEmail = process.env.SEED_OPERATOR_EMAIL ?? "operator@attitude-factory.com";

const users = await prisma.user.findMany({
  where: {
    email: {
      in: [founderEmail, operatorEmail]
    }
  },
  select: {
    id: true,
    email: true
  }
});

const userIdByEmail = new Map(users.map((user) => [user.email, user.id]));
const ownerUserId = userIdByEmail.get(founderEmail) ?? null;
const operatorUserIds: Record<PersonaOperatorKey, string | null> = {
  gruender: userIdByEmail.get(founderEmail) ?? null,
  partner: userIdByEmail.get(operatorEmail) ?? null
};

if (!ownerUserId) {
  console.warn(`Hinweis: Gründer-User nicht gefunden (${founderEmail}). Personas werden ohne Owner angelegt.`);
}

if (!operatorUserIds.partner) {
  console.warn(`Hinweis: Operator-User nicht gefunden (${operatorEmail}). Partner-Personas bleiben ohne Operator.`);
}

for (const persona of PERSONA_PORTFOLIO) {
  const operatorUserId = persona.operatorKey ? operatorUserIds[persona.operatorKey] : null;
  const priorityScore = Object.values(persona.scores).reduce((sum, value) => sum + value, 0);

  const savedPersona = await prisma.persona.upsert({
    where: {
      name: persona.name
    },
    create: {
      name: persona.name,
      publicName: persona.publicName,
      ownerUserId,
      operatorUserId,
      lane: persona.lane,
      niche: persona.niche,
      status: persona.startstatus === "startwelle" ? PersonaStatus.AKTIV : PersonaStatus.ENTWURF,
      launchWave: persona.startstatus === "startwelle",
      launchWaveOrder: persona.launchWaveOrder,
      backlogActivationNote: persona.backlogActivationNote ?? persona.nextActivationCondition,
      setcardStatus: persona.setcardStatus,
      mediaReadinessStatus: persona.mediaReadinessStatus,
      archetype: persona.archetype,
      contentWedge: persona.contentWedge,
      monetizationNotes: persona.monetizationNotes,
      priorityScore,
      instagramReachScore: persona.scores.instagramReach,
      affiliateFitScore: persona.scores.affiliateFit,
      assetEaseScore: persona.scores.assetEase,
      setcardQualityScore: persona.scores.setcardQuality,
      repeatabilityScore: persona.scores.repeatability,
      differentiationScore: persona.scores.differentiation,
      complianceEaseScore: persona.scores.complianceEase,
      operatorFitScore: persona.scores.operatorFit
    },
    update: {
      publicName: persona.publicName,
      ownerUserId,
      operatorUserId,
      lane: persona.lane,
      niche: persona.niche,
      status: persona.startstatus === "startwelle" ? PersonaStatus.AKTIV : PersonaStatus.ENTWURF,
      launchWave: persona.startstatus === "startwelle",
      launchWaveOrder: persona.launchWaveOrder,
      backlogActivationNote: persona.backlogActivationNote ?? persona.nextActivationCondition,
      setcardStatus: persona.setcardStatus,
      mediaReadinessStatus: persona.mediaReadinessStatus,
      archetype: persona.archetype,
      contentWedge: persona.contentWedge,
      monetizationNotes: persona.monetizationNotes,
      priorityScore,
      instagramReachScore: persona.scores.instagramReach,
      affiliateFitScore: persona.scores.affiliateFit,
      assetEaseScore: persona.scores.assetEase,
      setcardQualityScore: persona.scores.setcardQuality,
      repeatabilityScore: persona.scores.repeatability,
      differentiationScore: persona.scores.differentiation,
      complianceEaseScore: persona.scores.complianceEase,
      operatorFitScore: persona.scores.operatorFit
    }
  });

  await prisma.platformAccount.upsert({
    where: {
      personaId_platform: {
        personaId: savedPersona.id,
        platform: PlatformName.INSTAGRAM
      }
    },
    create: {
      personaId: savedPersona.id,
      platform: PlatformName.INSTAGRAM,
      handle: persona.instagramHandle,
      status: persona.startstatus === "startwelle" ? "aktiv" : "entwurf",
      notes: persona.nextActivationCondition
    },
    update: {
      handle: persona.instagramHandle,
      status: persona.startstatus === "startwelle" ? "aktiv" : "entwurf",
      notes: persona.nextActivationCondition
    }
  });

  console.log(`${persona.startstatus === "startwelle" ? "Startwelle" : "Backlog"}: ${persona.name}`);
}

await prisma.$disconnect();
