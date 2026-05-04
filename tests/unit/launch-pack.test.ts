import { describe, expect, it } from "vitest";

import {
  LAUNCH_PACK_ASSETS,
  LAUNCH_PACK_CONTENT,
  LAUNCH_PACK_VIDEO_SLOTS
} from "../../src/domain/launch-pack";

describe("30-Tage-Launch-Pack Seed-Daten", () => {
  it("führt genau einen ersten Produktionsinhalt pro Startwellen-Persona", () => {
    const personas = new Set(LAUNCH_PACK_CONTENT.map((item) => item.personaName));

    expect(LAUNCH_PACK_CONTENT).toHaveLength(6);
    expect(personas).toEqual(
      new Set([
        "David Chen",
        "Zara Patel",
        "Luna Stone",
        "Alex Moreno",
        "Sophie Larue",
        "Emma Winters"
      ])
    );
  });

  it("verteilt die ersten Inhalte sauber auf Gründer und Partner", () => {
    expect(LAUNCH_PACK_CONTENT.filter((item) => item.ownerKey === "gruender")).toHaveLength(3);
    expect(LAUNCH_PACK_CONTENT.filter((item) => item.ownerKey === "partner")).toHaveLength(3);
  });

  it("legt nur sichere Setcards als Setcard-Assets an und markiert fehlende nicht fake-fertig", () => {
    const setcards = LAUNCH_PACK_ASSETS.filter((asset) => asset.assetType === "SETCARD");
    const promptSpuren = LAUNCH_PACK_ASSETS.filter((asset) => asset.assetType === "PROMPT");

    expect(setcards).toHaveLength(4);
    expect(promptSpuren).toHaveLength(6);
    expect(setcards.map((asset) => asset.personaName).sort()).toEqual([
      "Alex Moreno",
      "David Chen",
      "Luna Stone",
      "Zara Patel"
    ]);
    expect(setcards.some((asset) => asset.personaName === "Sophie Larue")).toBe(false);
    expect(setcards.some((asset) => asset.personaName === "Emma Winters")).toBe(false);
  });

  it("reserviert zwei Video-Slots nach Lernwert statt Gleichverteilung", () => {
    expect(LAUNCH_PACK_VIDEO_SLOTS).toHaveLength(2);
    expect(LAUNCH_PACK_VIDEO_SLOTS.map((slot) => slot.personaName).sort()).toEqual([
      "Alex Moreno",
      "David Chen"
    ]);
  });
});
