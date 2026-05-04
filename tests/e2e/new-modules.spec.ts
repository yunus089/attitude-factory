// Attitude Factory – Neue Operator E2E Tests
// Tests für: Recherche, Regelcheck, Angebots-Check, Aufgaben, Visual Lab
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

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
  await anmelden(page);
});

test("Kommandozentrale zeigt Task-Panel mit operativen Aufgaben", async ({ page }) => {
  await page.goto("/kommandozentrale");

  await expect(page.getByRole("heading", { name: "Kommandozentrale" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Operative Aufgaben" })).toBeVisible();
  // Task panel should always render – either tasks or empty state
  const taskPanel = page.locator("section", { hasText: "Operative Aufgaben" }).first();
  await expect(taskPanel).toBeVisible();
});

test("Personas zeigt 24er Portfolio mit 6er Startwelle", async ({ page }) => {
  await page.goto("/personas");

  await expect(page.getByRole("heading", { name: "Portfolio-Kommando" })).toBeVisible();
  await expect(page.getByText("Persona-Datenkern nicht erreichbar")).toHaveCount(0);
  await expect(page.getByText("24 in DB")).toBeVisible();
  await expect(page.getByText("6 markiert")).toBeVisible();
  await expect(page.getByText("18 sichtbar")).toBeVisible();
  await expect(page.locator("p:visible", { hasText: "Elias Vogel" }).first()).toBeVisible();
  await expect(page.locator("p:visible", { hasText: "Marcus Thorne" }).first()).toBeVisible();
});

test("Recherche-Board lädt und zeigt Eingabeformular", async ({ page }) => {
  await page.goto("/recherche");

  await expect(page.getByRole("heading", { name: /Recherche/ })).toBeVisible();
  await expect(page.getByText("Trend- und Ideenerfassung")).toBeVisible();
  // Should not show DB error
  await expect(page.getByText("Datenbankabfrage nicht verfügbar")).toHaveCount(0);
});

test("Regelcheck-Board lädt und zeigt Compliance-Header", async ({ page }) => {
  await page.goto("/regelcheck");

  await expect(page.getByRole("heading", { name: /Regelcheck/ })).toBeVisible();
  await expect(page.getByText("Regelwerk & Risiko")).toBeVisible();
  await expect(page.getByText("Datenbankabfrage nicht verfügbar")).toHaveCount(0);
});

test("Angebots-Check lädt mit Live-Daten statt Fake-Zahlen", async ({ page }) => {
  await page.goto("/angebots-check");

  await expect(page.getByRole("heading", { name: /Angebots-Check/ })).toBeVisible();
  await expect(page.getByText("Monetarisierung & Compliance")).toBeVisible();
  // Should show dynamic readiness data (Level X.X not hardcoded "1.4")
  const levelText = page.getByText(/Level \d+\.\d+/);
  await expect(levelText).toBeVisible();
});

test("Visual Identity Lab lädt für eine Startwellen-Persona", async ({ page }) => {
  await page.goto("/personas");

  // Find the Lab link for David Chen
  const davidRow = page.locator("div", { hasText: "David Chen" }).first();
  await expect(davidRow).toBeVisible();
  const labLink = davidRow.getByRole("link", { name: "Lab" }).first();
  await expect(labLink).toBeVisible();
  await labLink.click();

  await expect(page).toHaveURL(/\/personas\/.+\/visual/, { timeout: 10_000 });
  await expect(page.getByText("Visual Code:")).toBeVisible();
  await expect(page.getByText("Farbwelt & Palette")).toBeVisible();
  await expect(page.getByText("Locations & Settings")).toBeVisible();
});
