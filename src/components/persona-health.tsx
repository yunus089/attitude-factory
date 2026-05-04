import Image from "next/image";
import { StatusBadge } from "@/src/components/status-badge";
import type { PersonaSummary } from "@/src/domain/types";

export function PersonaHealth({ personas }: { personas: PersonaSummary[] }) {
  return (
    <section className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <h2 className="font-condensed text-[24px] font-bold tracking-normal">
          Persona-Gesundheit
        </h2>
        <span className="font-mono text-[11px] font-semibold uppercase text-[var(--steel)]">
          {personas.length} aktive Lanes
        </span>
      </div>
      <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
        {personas.map((persona) => (
          <article key={persona.name} className="grid grid-cols-[68px_1fr] gap-3 p-4">
            <div className="relative grid h-[68px] w-[68px] overflow-hidden rounded-md bg-black/[0.04]">
              {persona.image ? (
                <Image
                  src={persona.image}
                  alt={`Referenzbild von ${persona.name}`}
                  fill
                  sizes="68px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="grid h-full w-full place-items-center text-[18px] font-bold text-white"
                  style={{ backgroundColor: persona.color }}
                  aria-label={`Setcard fehlt für ${persona.name}`}
                >
                  {initialsFor(persona.name)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-[15px] font-bold text-[var(--ink)]">
                    {persona.name}
                  </h3>
                  <p className="mt-1 text-[12px] font-medium text-[var(--steel)]">
                    {persona.lane}
                  </p>
                </div>
                <StatusBadge label={persona.status} tone="active" />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {persona.scores.map((score) => (
                  <div key={score.label}>
                    <div className="mb-1 flex items-center justify-between gap-2 text-[11px] font-semibold text-[var(--steel)]">
                      <span>{score.label}</span>
                      <span className="font-mono">{score.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-black/8">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${score.value}%`,
                          backgroundColor: persona.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-5 text-[var(--graphite)]">
                {persona.nextAction}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function initialsFor(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
