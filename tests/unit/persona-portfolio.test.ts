import { describe, expect, it } from "vitest";

import { PERSONA_PORTFOLIO } from "../../src/domain/persona-portfolio";

describe("Persona-Portfolio Seed-Daten", () => {
  it("führt exakt 20 Personas mit 6 Startwelle und 14 Backlog", () => {
    const startwelle = PERSONA_PORTFOLIO.filter((persona) => persona.startstatus === "startwelle");
    const backlog = PERSONA_PORTFOLIO.filter((persona) => persona.startstatus === "backlog");

    expect(PERSONA_PORTFOLIO).toHaveLength(20);
    expect(startwelle).toHaveLength(6);
    expect(backlog).toHaveLength(14);
  });

  it("ordnet Gründer und Partner jeweils 3 Startwellen-Personas zu", () => {
    const startwellenPersonas = PERSONA_PORTFOLIO.filter(
      (persona) => persona.startstatus === "startwelle"
    );

    expect(startwellenPersonas.filter((persona) => persona.operatorKey === "gruender")).toHaveLength(3);
    expect(startwellenPersonas.filter((persona) => persona.operatorKey === "partner")).toHaveLength(3);
  });
});
