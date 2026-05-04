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
  await resetPostMaterialUploadFixture();
  await anmelden(page);
});

test("Personas zeigt 24er Portfolio mit 6er Startwelle", async ({ page }) => {
  await page.goto("/personas");

  await expect(page.getByRole("heading", { name: "Portfolio-Kommando" })).toBeVisible();
  await expect(page.getByText("Persona-Datenkern nicht erreichbar")).toHaveCount(0);
  await expect(page.getByText("24 in DB")).toBeVisible();
  await expect(page.getByText("6 markiert")).toBeVisible();
  await expect(page.getByText("18 sichtbar")).toBeVisible();
  await expect(page.getByRole("tab", { name: /Startwelle 6/ })).toBeVisible();
  await expect(page.getByRole("tab", { name: /Backlog 18/ })).toBeVisible();
  await expect(page.locator("p:visible", { hasText: "David Chen" }).first()).toBeVisible();
  await expect(page.locator("p:visible", { hasText: "Jackson Wright" }).first()).toBeVisible();
});

test("Content-Produktion zeigt echte Launch-Pack-Inhalte", async ({ page }) => {
  await page.goto("/content-produktion");

  await expect(page.getByRole("heading", { name: "Produktionsqueue für Instagram" })).toBeVisible();
  await expect(page.getByText("Datenbankabfrage nicht verfügbar")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Operative Queue" })).toBeVisible();
  await expect(page.getByText("Noch keine Inhalte angelegt")).toHaveCount(0);
  await expect(page.getByText("6 Inhalte")).toBeVisible();
  await expect(page.locator("article", { hasText: "Material fehlt" }).filter({ hasText: "6" }).first()).toBeVisible();
  await expect(page.locator("article", { hasText: "Video-Slots" }).filter({ hasText: "2" }).first()).toBeVisible();
  await expect(page.locator("tr:visible, article:visible", { hasText: "Baue diesen 20-Minuten-AI-Workflow" }).first()).toBeVisible();
  await expect(page.locator("tr:visible, article:visible", { hasText: "Die 15-Minuten-Küchenzone" }).first()).toBeVisible();
});

test("Content-Produktion kann erstes Postmaterial hochladen", async ({ page }) => {
  await page.goto("/content-produktion");

  const davidRow = page.locator("tr:visible, article:visible", {
    hasText: "Baue diesen 20-Minuten-AI-Workflow"
  }).first();

  await expect(davidRow).toBeVisible();
  await davidRow.getByLabel("Materialtyp").selectOption("POSTBILD");
  await davidRow.getByLabel("Materialstatus").selectOption("FREIGEGEBENES_POST_MATERIAL");
  await davidRow.getByLabel("Postmaterial-Datei").setInputFiles({
    name: "e2e-postmaterial.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
      "base64"
    )
  });
  await davidRow.getByLabel("Materialnotiz").fill("E2E Upload: erster David-Postmaterial-Test.");
  await davidRow.getByRole("button", { name: "Material speichern" }).click();

  await expect(page.getByText("Postmaterial gespeichert.")).toBeVisible({ timeout: 15_000 });
  await expect(page.locator("article", { hasText: "Material fehlt" }).filter({ hasText: "5" }).first()).toBeVisible();
  await expect(davidRow.getByText("1/1 freigegeben")).toBeVisible();

  await page.goto("/medien");
  await expect(page.locator("tr:visible, article:visible", { hasText: "e2e-postmaterial.png" }).first()).toBeVisible();
  await expect(page.locator("tr:visible, article:visible", { hasText: "Postmaterial frei" }).first()).toBeVisible();
});

test("Medien zeigt Setcards und Prompt-Spuren aus dem Launch-Pack", async ({ page }) => {
  await page.goto("/medien");

  await expect(page.getByRole("heading", { name: "Medienbibliothek für Persona-Konsistenz" })).toBeVisible();
  await expect(page.getByText("Datenbankabfrage nicht verfügbar")).toHaveCount(0);
  await expect(page.getByText("Noch keine Medien-Dateien in der Medienbibliothek")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Setcards", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Prompt-Historie" })).toBeVisible();
  await expect(page.locator("tr:visible, article:visible", { hasText: "image10.png" }).first()).toBeVisible();
  await expect(page.locator("tr:visible, article:visible", { hasText: "sophie-y2k-prompt.txt" }).first()).toBeVisible();
});

async function resetPostMaterialUploadFixture() {
  const contentItem = await prisma.contentItem.findFirst({
    where: {
      hook: {
        contains: "Baue diesen 20-Minuten-AI-Workflow"
      }
    },
    select: {
      id: true
    }
  });

  if (!contentItem) {
    return;
  }

  await prisma.assetFile.deleteMany({
    where: {
      contentItemId: contentItem.id,
      originalFilename: "e2e-postmaterial.png"
    }
  });

  await prisma.contentItem.update({
    where: {
      id: contentItem.id
    },
    data: {
      status: "GEBRIEFT"
    }
  });
}
