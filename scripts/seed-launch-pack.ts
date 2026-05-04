import "dotenv/config";

import type {
  AssetStatus,
  AssetType,
  ContentFormat,
  ContentIntent,
  ContentStatus,
  Persona,
  TaskStatus
} from "@prisma/client";

import {
  LAUNCH_PACK_ASSETS,
  LAUNCH_PACK_CONTENT,
  LAUNCH_PACK_VIDEO_SLOTS,
  type LaunchPackOwnerKey
} from "../src/domain/launch-pack";
import { prisma } from "../src/lib/prisma";

const founderEmail = process.env.SEED_GRUENDER_EMAIL ?? "gruender@attitude-factory.com";
const operatorEmail = process.env.SEED_OPERATOR_EMAIL ?? "operator@attitude-factory.com";

const today = startOfToday(new Date());
const founder = await prisma.user.findUnique({ where: { email: founderEmail } });
const operator = await prisma.user.findUnique({ where: { email: operatorEmail } });
const ownerByKey: Record<LaunchPackOwnerKey, string | null> = {
  gruender: founder?.id ?? null,
  partner: operator?.id ?? null
};

const personas = await prisma.persona.findMany({
  where: {
    name: {
      in: LAUNCH_PACK_CONTENT.map((item) => item.personaName)
    }
  }
});

const personaByName = new Map(personas.map((persona) => [persona.name, persona]));
const contentByKey = new Map<string, string>();

for (const item of LAUNCH_PACK_CONTENT) {
  const persona = mustGetPersona(item.personaName, personaByName);
  const plannedDate = addDays(today, item.dayOffset);

  const data = {
    personaId: persona.id,
    ownerUserId: ownerByKey[item.ownerKey],
    format: item.format as ContentFormat,
    intent: item.intent as ContentIntent,
    pillar: item.pillar,
    hook: item.hook,
    brief: item.brief,
    outline: item.outline,
    caption: item.caption,
    cta: item.cta,
    disclosure: item.disclosure,
    status: item.status as ContentStatus,
    plannedDate,
    complianceStatus: item.complianceStatus
  };

  const existing = await prisma.contentItem.findFirst({
    where: {
      personaId: persona.id,
      hook: item.hook
    }
  });

  const contentItem = existing
    ? await prisma.contentItem.update({
        where: { id: existing.id },
        data
      })
    : await prisma.contentItem.create({
        data
      });

  contentByKey.set(item.key, contentItem.id);

  await prisma.complianceCheck.upsert({
    where: {
      contentItemId: contentItem.id
    },
    create: complianceData(contentItem.id, item.personaName),
    update: complianceData(contentItem.id, item.personaName)
  });

  await upsertTask({
    assigneeUserId: ownerByKey[item.ownerKey],
    relatedEntityType: "ContentItem",
    relatedEntityId: contentItem.id,
    title: `Produktionsslot schließen: ${item.personaName}`,
    status: "OFFEN",
    dueDate: plannedDate,
    priority: item.dayOffset === 0 ? 1 : 2
  });

  console.log(`Inhalt: ${item.personaName} - ${item.hook}`);
}

for (const asset of LAUNCH_PACK_ASSETS) {
  const persona = mustGetPersona(asset.personaName, personaByName);
  const contentItemId = asset.contentKey ? contentByKey.get(asset.contentKey) ?? null : null;

  const data = {
    personaId: persona.id,
    contentItemId,
    assetType: asset.assetType as AssetType,
    sourceTool: asset.sourceTool,
    storagePath: asset.storagePath,
    originalFilename: asset.originalFilename,
    mimeType: asset.mimeType,
    byteSize: asset.byteSize,
    prompt: asset.prompt,
    qualityRating: asset.qualityRating,
    consistencyRating: asset.consistencyRating,
    status: asset.status as AssetStatus,
    notes: asset.notes
  };

  const existing = await prisma.assetFile.findFirst({
    where: {
      personaId: persona.id,
      assetType: asset.assetType as AssetType,
      storagePath: asset.storagePath
    }
  });

  if (existing) {
    await prisma.assetFile.update({
      where: { id: existing.id },
      data
    });
  } else {
    await prisma.assetFile.create({ data });
  }

  console.log(`Medium: ${asset.personaName} - ${asset.assetType} - ${asset.originalFilename}`);
}

await updatePersonaMediaReadiness(personas);

for (const slot of LAUNCH_PACK_VIDEO_SLOTS) {
  const persona = mustGetPersona(slot.personaName, personaByName);
  const contentItemId = contentByKey.get(slot.contentKey) ?? null;
  const date = addDays(today, slot.dayOffset);

  const existing = await prisma.videoSlot.findFirst({
    where: {
      date,
      personaId: persona.id,
      reason: slot.reason
    }
  });

  const data = {
    date,
    personaId: persona.id,
    contentItemId,
    reason: slot.reason,
    expectedLearning: slot.expectedLearning,
    productionStatus: slot.productionStatus
  };

  if (existing) {
    await prisma.videoSlot.update({ where: { id: existing.id }, data });
  } else {
    await prisma.videoSlot.create({ data });
  }

  console.log(`Video-Slot: ${slot.personaName}`);
}

const activePersonaIds = LAUNCH_PACK_CONTENT.map((item) => mustGetPersona(item.personaName, personaByName).id);
const existingWarRoom = await prisma.warRoomTest.findFirst({
  where: {
    name: "30-Tage-Startwelle 1"
  }
});

const warRoomData = {
  name: "30-Tage-Startwelle 1",
  startDate: today,
  endDate: addDays(today, 29),
  status: "aktiv",
  activePersonaIds,
  dailyOutputTarget: 6,
  nextDecisionDate: addDays(today, 6),
  notes:
    "Startwelle mit 2 Operatoren, 6 Personas, Bild/Carousel als Baseline und 2 Video-Slots nach Lernwert."
};

if (existingWarRoom) {
  await prisma.warRoomTest.update({
    where: { id: existingWarRoom.id },
    data: warRoomData
  });
} else {
  await prisma.warRoomTest.create({
    data: warRoomData
  });
}

console.log("30-Tage-Kommando: Startwelle 1 aktualisiert");

await prisma.$disconnect();

function complianceData(contentItemId: string, personaName: string) {
  const needsHealthClaimControl = ["Zara Patel", "Alex Moreno"].includes(personaName);
  const needsFakeUsageReview = ["Zara Patel", "Sophie Larue", "Emma Winters"].includes(personaName);

  return {
    contentItemId,
    aiDisclosureChecked: true,
    affiliateDisclosureChecked: true,
    noFakeUsageClaim: !needsFakeUsageReview,
    noMedicalClaim: !needsHealthClaimControl,
    noFinancialClaim: true,
    status: needsHealthClaimControl || needsFakeUsageReview ? "offen" : "vorpruefung_sauber",
    notes: needsHealthClaimControl
      ? "Claim-Grenze vor Veröffentlichung prüfen."
      : needsFakeUsageReview
        ? "Fake-Nutzung, Fake-Familienbeweis oder Fake-Partnerschaft vermeiden."
        : "Keine harten Claim-Risiken im ersten Briefing."
  };
}

async function updatePersonaMediaReadiness(personas: Persona[]) {
  const setcardReadyNames = new Set(
    LAUNCH_PACK_ASSETS.filter((asset) => asset.assetType === "SETCARD").map((asset) => asset.personaName)
  );

  for (const persona of personas) {
    const hasSetcard = setcardReadyNames.has(persona.name);

    await prisma.persona.update({
      where: { id: persona.id },
      data: {
        setcardStatus: hasSetcard ? "bereit" : "fehlt",
        mediaReadinessStatus: hasSetcard ? "bereit" : "aufbauen"
      }
    });
  }
}

async function upsertTask({
  assigneeUserId,
  relatedEntityType,
  relatedEntityId,
  title,
  status,
  dueDate,
  priority
}: {
  assigneeUserId: string | null;
  relatedEntityType: string;
  relatedEntityId: string;
  title: string;
  status: TaskStatus;
  dueDate: Date;
  priority: number;
}) {
  const existing = await prisma.task.findFirst({
    where: {
      relatedEntityType,
      relatedEntityId,
      title
    }
  });

  const data = {
    assigneeUserId,
    relatedEntityType,
    relatedEntityId,
    title,
    status,
    dueDate,
    priority
  };

  if (existing) {
    await prisma.task.update({
      where: { id: existing.id },
      data
    });
  } else {
    await prisma.task.create({ data });
  }
}

function mustGetPersona(name: string, personaByName: Map<string, Persona>) {
  const persona = personaByName.get(name);

  if (!persona) {
    throw new Error(`Persona fehlt im Datenkern: ${name}`);
  }

  return persona;
}

function startOfToday(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(9, 0, 0, 0);

  return nextDate;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}
