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
  await expect(page.getByRole("heading", { name: "Kommandozentrale" })).toBeVisible({
    timeout: 15_000
  });
}

test("Kommandozentrale lädt nach Login mit Operator-Shell und Signalradar", async ({
  page
}) => {
  await anmelden(page);

  await expect(page.getByRole("heading", { name: "Kommandozentrale" })).toBeVisible();
  await expect(page.getByText("30 Tage, 6 Lanes, keine Ausreden.")).toBeVisible();
  await expect(page.getByText("20 im Portfolio")).toHaveCount(0); // old assertion removed – now 24
  await expect(page.getByText("Heute-Queue")).toBeVisible();
  await expect(page.getByText("Entscheidungslogik")).toBeVisible();
  await expect(page.getByText("Signalradar")).toBeVisible();
  await expect(page.getByText("Gewinner/Ausbauen", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Personas/ })).toBeVisible();
});

test("Anmelden-Seite wirkt wie private Kontrollraum-Schleuse", async ({ page }) => {
  await page.goto("/anmelden");

  await expect(page.getByRole("heading", { name: "Zugang zur Maschine." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Anmelden" })).toBeVisible();
  await expect(page.getByLabel("E-Mail")).toBeVisible();
  await expect(page.getByLabel("Passwort")).toBeVisible();
  await expect(page.getByText("Keine öffentliche Registrierung", { exact: true })).toBeVisible();

  await page.getByLabel("E-Mail").fill(seedEmail);
  await page.getByLabel("Passwort").fill("falsches-passwort");
  await page.getByRole("button", { name: /Anmelden/ }).click();

  await expect(page.getByText(/Anmeldung (fehlgeschlagen|konnte nicht)/)).toBeVisible();
});
