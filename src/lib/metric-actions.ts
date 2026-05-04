"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { calculatePortfolioMedian, evaluateSignal, type RawMetric } from "@/src/domain/metric-signals";
import { hasActiveSession } from "./auth-guard";
import { updateHookStatus } from "./hook-actions";

export type MetricEntryInput = {
  contentItemId: string;
  capturedAt: string; // ISO date string "YYYY-MM-DD"
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  profileVisits: number;
  follows: number;
  linkClicks: number;
  notes?: string;
};

export type MetricEntryResult =
  | { ok: true; snapshotId: string }
  | { ok: false; error: string };

/**
 * Speichert einen MetricSnapshot und aktualisiert den ContentItem-Status.
 *
 * Regeln:
 * - Negative Zahlen werden abgelehnt.
 * - Reach = 0 ist erlaubt (kein Fehler, aber Signal "MEHR_DATEN_NOETIG").
 * - ContentItem wechselt von GEPOSTET / KENNZAHLEN_FEHLEN auf AUSGEWERTET.
 * - Mehrere Snapshots pro ContentItem sind erlaubt (Zeitreihe).
 */
export async function saveMetricSnapshot(input: MetricEntryInput): Promise<MetricEntryResult> {
  if (!(await hasActiveSession())) {
    return { ok: false, error: "Bitte neu anmelden." };
  }

  // Validierung
  const fields: Array<[string, number]> = [
    ["Impressionen", input.impressions],
    ["Reichweite", input.reach],
    ["Likes", input.likes],
    ["Kommentare", input.comments],
    ["Saves", input.saves],
    ["Shares", input.shares],
    ["Profilbesuche", input.profileVisits],
    ["Neue Follower", input.follows],
    ["Link-Klicks", input.linkClicks]
  ];

  for (const [label, value] of fields) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return { ok: false, error: `${label}: Ungültiger Wert. Nur Ganzzahlen erlaubt.` };
    }
    if (value < 0) {
      return { ok: false, error: `${label}: Negative Zahlen sind nicht erlaubt.` };
    }
    if (!Number.isInteger(value)) {
      return { ok: false, error: `${label}: Nur ganze Zahlen erlaubt.` };
    }
  }

  if (!input.contentItemId) {
    return { ok: false, error: "Kein Content-Slot ausgewählt." };
  }

  let capturedAt: Date;
  try {
    capturedAt = new Date(input.capturedAt);
    if (isNaN(capturedAt.getTime())) {
      throw new Error("Ungültiges Datum");
    }
  } catch {
    return { ok: false, error: "Ungültiges Erfassungsdatum." };
  }

  try {
    // Prüfen ob ContentItem existiert und im richtigen Status
    const contentItem = await prisma.contentItem.findUnique({
      where: { id: input.contentItemId },
      select: { id: true, status: true }
    });

    if (!contentItem) {
      return { ok: false, error: "Content-Slot nicht gefunden." };
    }

    // Snapshot speichern
    const snapshot = await prisma.metricSnapshot.create({
      data: {
        contentItemId: input.contentItemId,
        capturedAt,
        impressions: input.impressions,
        reach: input.reach,
        likes: input.likes,
        comments: input.comments,
        saves: input.saves,
        shares: input.shares,
        profileVisits: input.profileVisits,
        follows: input.follows,
        linkClicks: input.linkClicks,
        notes: input.notes?.trim() || null
      }
    });

    // ContentItem-Status auf AUSGEWERTET setzen wenn vorher GEPOSTET oder KENNZAHLEN_FEHLEN
    const promotableStatuses = ["GEPOSTET", "KENNZAHLEN_FEHLEN"];
    if (promotableStatuses.includes(contentItem.status)) {
      await prisma.contentItem.update({
        where: { id: input.contentItemId },
        data: { status: "AUSGEWERTET" }
      });
    }

    // --- Proactive Content Director Logic (Event-Driven Hook Update) ---
    // 1. Get the hook linked to this content item
    const itemWithHook = await prisma.contentItem.findUnique({
      where: { id: input.contentItemId },
      select: { hookId: true }
    });

    if (itemWithHook?.hookId) {
      // 2. Fetch all snapshots for this hook and current portfolio medians
      const [allSnapshots, hookPosts] = await Promise.all([
        prisma.metricSnapshot.findMany(),
        prisma.contentItem.findMany({
          where: { hookId: itemWithHook.hookId },
          include: { metrics: { orderBy: { capturedAt: "desc" }, take: 1 } }
        })
      ]);

      const medians = calculatePortfolioMedian(allSnapshots as RawMetric[]);
      
      let winCount = 0;
      let weakCount = 0;
      let evaluatedCount = 0;

      for (const post of hookPosts) {
        if (post.metrics[0]) {
          const signal = evaluateSignal(post.metrics[0] as unknown as RawMetric, medians);
          evaluatedCount++;
          if (signal.signal === "GEWINNER_KANDIDAT" || signal.signal === "AUSBAUEN") winCount++;
          if (signal.signal === "SCHWACHES_SIGNAL" || signal.signal === "STOPPEN_PAUSIEREN") weakCount++;
        }
      }

      // 3. Update hook status based on thresholds
      if (winCount >= 2) { // Threshold: 2 winners
        await updateHookStatus(itemWithHook.hookId, "GEWINNER");
      } else if (weakCount >= 2) { // Threshold: 2 weak
        await updateHookStatus(itemWithHook.hookId, "SCHWACH");
      } else if (evaluatedCount > 0) {
        await updateHookStatus(itemWithHook.hookId, "GETESTET");
      }
    }

    revalidatePath("/kennzahlen");
    revalidatePath("/content-produktion");
    revalidatePath("/kommandozentrale");
    revalidatePath("/experimente");

    return { ok: true, snapshotId: snapshot.id };
  } catch (error) {
    console.error("Metric Save Fehler:", error);
    return { ok: false, error: "Kennzahlen konnten nicht gespeichert werden. Deine Eingaben sind noch sichtbar." };
  }
}
