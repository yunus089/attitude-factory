import "dotenv/config";

import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { prisma } from "../../src/lib/prisma";

const seedEmail = process.env.SEED_GRUENDER_EMAIL ?? "gruender@attitude-factory.com";
const seedPassword = process.env.SEED_GRUENDER_PASSWORD ?? "gruender-dev-2026!";

async function anmelden(page: Page) {
  await page.goto("/anmelden");
  await page.getByLabel("E-Mail").fill(seedEmail);
  await page.getByLabel("Passwort").fill(seedPassword);
  await page.getByRole("button", { name: /Anmelden/ }).click();
  await expect(page).toHaveURL(/\/kommandozentrale/, { timeout: 15_000 });
}

test.beforeEach(async ({ page }) => {
  await cleanupMetricFixture();
  await anmelden(page);
});

test("Kennzahlen lädt korrekt mit Summary und Portfolio-Median", async ({ page }) => {
  await page.goto("/kennzahlen");

  // Überschrift und Beschreibung
  await expect(page.getByRole("heading", { name: "Kennzahlen" })).toBeVisible();
  await expect(page.getByText("Likes sind Nebenrauschen")).toBeVisible();

  // Summary-Strip vorhanden
  await expect(page.getByText("Gepostet gesamt")).toBeVisible();
  await expect(page.getByText("Mit Kennzahlen")).toBeVisible();
  await expect(page.getByText("Kennzahlen fehlen")).toBeVisible();

  // Portfolio-Median Block sichtbar
  await expect(page.getByText("Portfolio-Median")).toBeVisible();
  await expect(page.getByText(/Saves\/1k/)).toBeVisible();
  await expect(page.getByText(/Shares\/1k/)).toBeVisible();
  await expect(page.getByText(/Follows\/1k/)).toBeVisible();

  // Keine Datenbankfehler
  await expect(page.getByText("Datenbankfehler")).toHaveCount(0);
});

test("Kennzahlen-Eintragen Tab zeigt Postliste und Formular", async ({ page }) => {
  await page.goto("/kennzahlen");

  // Tab-Navigation sichtbar
  await expect(page.getByRole("tab", { name: /Kennzahlen eintragen/ })).toBeVisible();
  await expect(page.getByRole("tab", { name: /Alle Snapshots/ })).toBeVisible();

  // Formular-Elemente sichtbar
  await expect(page.getByLabel("Content-Slot")).toBeVisible();
  await expect(page.getByLabel("Erfassungsdatum")).toBeVisible();

  // Primäre Signalfelder vorhanden
  await expect(page.getByLabel("Reichweite")).toBeVisible();
  await expect(page.getByLabel("Saves")).toBeVisible();
  await expect(page.getByLabel("Shares")).toBeVisible();
  await expect(page.getByLabel("Neue Follower")).toBeVisible();
  await expect(page.getByLabel("Profilbesuche")).toBeVisible();

  // Sekundäre Felder
  await expect(page.getByLabel("Likes")).toBeVisible();
  await expect(page.getByLabel("Kommentare")).toBeVisible();
  await expect(page.getByLabel("Link-Klicks")).toBeVisible();

  // Submit-Button
  await expect(page.getByRole("button", { name: "Kennzahlen eintragen" })).toBeVisible();
});

test("Kennzahlen-Eintragen: fehlende Felder erzeugen deutschen Fehlerhinweis", async ({ page }) => {
  // Sicherstellen dass mindestens ein geposteter Inhalt existiert (Button wird sonst disabled)
  await ensurePostedContentItem();

  await page.goto("/kennzahlen");

  // Zahlfelder leer lassen und nur das Datum setzen
  // Der Button muss aktiv sein (Posts vorhanden)
  const submitBtn = page.getByRole("button", { name: "Kennzahlen eintragen" });
  await expect(submitBtn).toBeEnabled({ timeout: 10_000 });

  // Formular ohne Zahlen abschicken
  await submitBtn.click();

  // Deutsche Fehlermeldung erscheint — spezifischerer Selektor um Route-Announcer zu umgehen
  const errorAlert = page.locator("[role='alert']:not([aria-live='assertive'])");
  await expect(errorAlert).toBeVisible({ timeout: 5_000 });
  const alertText = await errorAlert.textContent();
  expect(alertText).toBeTruthy();
  expect(alertText!.length).toBeGreaterThan(5);
});

test("Kennzahlen können für einen geposteten Inhalt eingetragen werden (Desktop)", async ({ page }) => {
  // Einen ContentItem auf GEPOSTET setzen für den Test
  const targetItem = await ensurePostedContentItem();
  if (!targetItem) {
    test.skip(true, "Kein ContentItem zum Testen verfügbar");
    return;
  }

  await page.goto("/kennzahlen");

  // Content-Slot im Select auswählen
  const select = page.getByLabel("Content-Slot");
  await select.selectOption(targetItem.id);

  // Zahlen eintragen
  await page.getByLabel("Reichweite").fill("1200");
  await page.getByLabel("Impressionen").fill("1800");
  await page.getByLabel("Saves").fill("45");
  await page.getByLabel("Shares").fill("15");
  await page.getByLabel("Neue Follower").fill("10");
  await page.getByLabel("Profilbesuche").fill("60");
  await page.getByLabel("Likes").fill("80");
  await page.getByLabel("Kommentare").fill("8");
  await page.getByLabel("Link-Klicks").fill("3");

  // Speichern
  await page.getByRole("button", { name: "Kennzahlen eintragen" }).click();

  // Erfolgs-Feedback
  await expect(page.getByRole("status")).toBeVisible({ timeout: 15_000 });
  const statusText = await page.getByRole("status").textContent();
  expect(statusText).toContain("Kennzahlen eingetragen");

  // Übersichts-Tab: Snapshot sollte jetzt erscheinen
  await page.getByRole("tab", { name: /Alle Snapshots/ }).click();
  await expect(page.getByText("Alle Snapshots (")).toBeVisible();
});

test("Kennzahlen Mobile: Formular und Übersicht benutzbar (375px)", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/kennzahlen");

  // Grundlegende Elemente sichtbar auf Mobile
  await expect(page.getByRole("heading", { name: "Kennzahlen" })).toBeVisible();
  await expect(page.getByText("Likes sind Nebenrauschen")).toBeVisible();
  await expect(page.getByLabel("Content-Slot")).toBeVisible();
  await expect(page.getByLabel("Reichweite")).toBeVisible();
  await expect(page.getByLabel("Saves")).toBeVisible();

  // Submit-Button muss ohne Zoomen erreichbar sein
  const btn = page.getByRole("button", { name: "Kennzahlen eintragen" });
  await expect(btn).toBeVisible();
  const box = await btn.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeGreaterThanOrEqual(40); // mind. 40px Touch-Ziel

  // Übersichts-Tab funktioniert
  await page.getByRole("tab", { name: /Alle Snapshots/ }).click();
  await expect(page.getByRole("tab", { name: /Alle Snapshots/ })).toHaveAttribute("aria-selected", "true");
});

// ─── Fixture Helpers ─────────────────────────────────────────────────────────

async function ensurePostedContentItem() {
  // Prüfen ob bereits ein GEPOSTET Item existiert
  const existing = await prisma.contentItem.findFirst({
    where: { status: "GEPOSTET" },
    select: { id: true, hook: true }
  });

  if (existing) return existing;

  // Falls nicht, ersten GEBRIEFT ContentItem auf GEPOSTET setzen
  const candidate = await prisma.contentItem.findFirst({
    where: { status: { in: ["GEBRIEFT", "MATERIAL_BEREIT", "BEREIT_ZUM_POSTEN"] } },
    select: { id: true, hook: true }
  });

  if (!candidate) return null;

  await prisma.contentItem.update({
    where: { id: candidate.id },
    data: { status: "GEPOSTET", postedAt: new Date() }
  });

  return candidate;
}

async function cleanupMetricFixture() {
  // Snapshots die durch E2E-Tests angelegt wurden wieder entfernen
  await prisma.metricSnapshot.deleteMany({
    where: {
      notes: null,
      reach: 1200,
      saves: 45
    }
  });

  // ContentItem-Status zurücksetzen wenn durch Test verändert
  const postedItem = await prisma.contentItem.findFirst({
    where: { status: "AUSGEWERTET", hook: { contains: "AI-Workflow" } },
    select: { id: true }
  });

  if (postedItem) {
    await prisma.contentItem.update({
      where: { id: postedItem.id },
      data: { status: "GEPOSTET" }
    });
  }
}
