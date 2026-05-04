"use client";

import { AlertTriangle, AtSign, CheckCircle2, Database, Filter, Users } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

import { EmptyState } from "@/src/components/empty-state";
import { StatusBadge } from "@/src/components/status-badge";
import type {
  PersonaPortfolioBoardData,
  PersonaPortfolioEntry
} from "@/src/lib/persona-queries";

type FilterId = "alle" | "startwelle" | "backlog" | "gruender" | "partner" | "setcard_fehlt";

export function PersonaPortfolioBoard({ data }: { data: PersonaPortfolioBoardData }) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("alle");

  const filteredPersonas = useMemo(
    () => data.personas.filter((persona) => matchesFilter(persona, activeFilter)),
    [activeFilter, data.personas]
  );

  const filters = useMemo(
    () => [
      { id: "alle" as const, label: "Alle", count: data.personas.length },
      {
        id: "startwelle" as const,
        label: "Startwelle",
        count: data.personas.filter((persona) => persona.isLaunchWave).length
      },
      {
        id: "backlog" as const,
        label: "Backlog",
        count: data.personas.filter((persona) => !persona.isLaunchWave).length
      },
      {
        id: "gruender" as const,
        label: "Gründer",
        count: data.personas.filter((persona) => persona.ownerLabel === "Gründer").length
      },
      {
        id: "partner" as const,
        label: "Partner",
        count: data.personas.filter((persona) => persona.ownerLabel === "Partner").length
      },
      {
        id: "setcard_fehlt" as const,
        label: "Setcard fehlt",
        count: data.personas.filter(
          (persona) => persona.setcardState === "fehlt" || persona.setcardState === "offen"
        ).length
      }
    ],
    [data.personas]
  );

  return (
    <main className="space-y-4">
      <section className="panel overflow-hidden">
        <div className="grid gap-4 border-b border-[var(--line)] p-4 xl:grid-cols-[1.1fr_1.5fr]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-[var(--steel)]">
              Persona-System
            </p>
            <h2 className="mt-2 font-condensed text-[38px] font-bold leading-none tracking-normal text-[var(--ink)]">
              Portfolio-Kommando
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-5 text-[var(--steel)]">
              Alle unabhängigen Creator-Lanes bleiben sichtbar. Die Startwelle läuft
              operativ, der Backlog wird nach Setcard, Score und nächster Aktivierung
              geführt.
            </p>
          </div>
          <SummaryGrid data={data} />
        </div>

        {data.issueTitle ? (
          <div className="border-b border-[var(--line)] bg-[var(--amber)]/10 p-4">
            <div className="flex max-w-4xl items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#8a580c]" aria-hidden="true" />
              <div>
                <h3 className="text-[14px] font-bold text-[var(--ink)]">{data.issueTitle}</h3>
                <p className="mt-1 text-[13px] leading-5 text-[var(--graphite)]">
                  {data.issueDescription}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {data.personas.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title={
                data.loadState === "nicht_erreichbar"
                  ? "Datenkern nicht erreichbar"
                  : "Noch keine Personas im Datenkern"
              }
              description={
                data.issueDescription ??
                "Die Portfolio-Fläche wartet auf den Persona-Seed. Erwartet werden 20 Datensätze mit 6 Startwellen-Personas und 14 Backlog-Lanes."
              }
              mentorNote="Das ist kein harmloser Leerzustand: Ohne 20 sichtbare Personas optimierst du zu früh auf einzelne Lieblinge statt auf ein Portfolio."
              tone={data.loadState === "nicht_erreichbar" ? "danger" : "mentor"}
            />
          </div>
        ) : null}
      </section>

      {data.personas.length > 0 ? (
        <section className="panel overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-[var(--line)] p-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h3 className="font-condensed text-[26px] font-bold leading-none tracking-normal text-[var(--ink)]">
                Persona-Arbeitsboard
              </h3>
              <p className="mt-1 text-[12px] font-medium text-[var(--steel)]">
                {filteredPersonas.length} von {data.personas.length} Datensätzen sichtbar
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--steel)]">
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filter steuern nur diese Ansicht
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto border-b border-[var(--line)] p-3" role="tablist" aria-label="Persona-Filter">
            {filters.map((filter) => {
              const active = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-3 text-[12px] font-bold transition ${
                    active
                      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                      : "border-black/10 bg-white text-[var(--graphite)] hover:bg-black/[0.035]"
                  }`}
                >
                  {filter.label}
                  <span
                    className={`rounded-sm px-1.5 py-0.5 font-mono text-[10px] ${
                      active ? "bg-white/16 text-white" : "bg-black/[0.06] text-[var(--steel)]"
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredPersonas.length > 0 ? (
            <>
              <div className="grid gap-3 p-3 md:hidden">
                {filteredPersonas.map((persona) => (
                  <PersonaMobileCard key={persona.id} persona={persona} />
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[1120px] border-collapse text-left">
                  <thead className="border-b border-[var(--line)] bg-black/[0.025]">
                    <tr className="text-[11px] font-bold uppercase text-[var(--steel)]">
                      <th className="px-4 py-2.5">Persona</th>
                      <th className="px-4 py-2.5">Status / Owner</th>
                      <th className="px-4 py-2.5">Lane / Nische</th>
                      <th className="px-4 py-2.5">Score / Aktivierung</th>
                      <th className="px-4 py-2.5">Setcard / Medien</th>
                      <th className="px-4 py-2.5">Instagram</th>
                      <th className="px-4 py-2.5">Nächster Schritt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPersonas.map((persona) => (
                      <PersonaTableRow key={persona.id} persona={persona} />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="p-4">
              <EmptyState
                title="Keine Persona in diesem Filter"
                description="Der Datenkern hat Personas, aber keine erfüllt gerade diesen Filter. Wechsle auf Alle oder prüfe Owner, Startwelle und Setcard-Status."
                tone="neutral"
              />
            </div>
          )}
        </section>
      ) : null}
    </main>
  );
}

function SummaryGrid({ data }: { data: PersonaPortfolioBoardData }) {
  const summary = data.summary;

  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
      <SummaryTile
        label="Gesamt"
        value={`${summary.totalTarget}`}
        detail={`${summary.totalActual} in DB`}
        tone="neutral"
        icon={<Database className="h-4 w-4" aria-hidden="true" />}
      />
      <SummaryTile
        label="Startwelle"
        value={`${summary.launchTarget}`}
        detail={`${summary.launchActual} markiert`}
        tone="active"
        icon={<CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
      />
      <SummaryTile
        label="Backlog"
        value={`${summary.backlogTarget}`}
        detail={`${summary.backlogActual} sichtbar`}
        tone="neutral"
        icon={<Users className="h-4 w-4" aria-hidden="true" />}
      />
      <SummaryTile
        label="Owner"
        value={`${summary.founderOwned}/${summary.partnerOwned}`}
        detail={`Gründer / Partner, ${summary.ownerOpen} offen`}
        tone={summary.ownerOpen > 0 ? "warning" : "info"}
        icon={<Users className="h-4 w-4" aria-hidden="true" />}
      />
      <SummaryTile
        label="Setcard / Medien"
        value={`${summary.setcardsReady}/${summary.mediaReady}`}
        detail={`${summary.setcardsOpen} Setcards, ${summary.mediaOpen} Medien offen`}
        tone={summary.setcardsOpen > 0 || summary.mediaOpen > 0 ? "warning" : "active"}
        icon={<CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
      />
    </div>
  );
}

function SummaryTile({
  label,
  value,
  detail,
  tone,
  icon
}: {
  label: string;
  value: string;
  detail: string;
  tone: "neutral" | "active" | "warning" | "info";
  icon: React.ReactNode;
}) {
  const toneClass = {
    neutral: "border-black/10 bg-white text-[var(--steel)]",
    active: "border-[var(--volt)]/70 bg-[var(--volt)]/18 text-[var(--ink)]",
    warning: "border-[var(--amber)]/55 bg-[var(--amber)]/12 text-[#8a580c]",
    info: "border-[var(--data-cyan)]/40 bg-[var(--data-cyan)]/10 text-[#116b94]"
  }[tone];

  return (
    <article className={`rounded-md border p-3 ${toneClass}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] font-bold text-[var(--steel)]">{label}</p>
        {icon}
      </div>
      <p className="mt-3 font-mono text-[24px] font-semibold leading-none text-[var(--ink)]">
        {value}
      </p>
      <p className="mt-2 text-[11px] font-semibold leading-4 text-[var(--steel)]">
        {detail}
      </p>
    </article>
  );
}

function PersonaTableRow({ persona }: { persona: PersonaPortfolioEntry }) {
  return (
    <tr className="border-b border-[var(--line)] text-[13px] last:border-0 hover:bg-black/[0.018]">
      <td className="px-4 py-3 align-top">
        <PersonaName persona={persona} />
      </td>
      <td className="px-4 py-3 align-top">
        <div className="flex flex-col items-start gap-2">
          <StatusBadge label={persona.statusLabel} tone={persona.statusTone} />
          <span className="font-mono text-[11px] font-semibold uppercase text-[var(--steel)]">
            {persona.ownerLabel}
          </span>
        </div>
      </td>
      <td className="max-w-[260px] px-4 py-3 align-top">
        <p className="font-semibold leading-5 text-[var(--graphite)]">{persona.lane}</p>
        <p className="mt-1 text-[12px] leading-5 text-[var(--steel)]">{persona.niche}</p>
      </td>
      <td className="max-w-[260px] px-4 py-3 align-top">
        <ScoreBlock persona={persona} />
      </td>
      <td className="px-4 py-3 align-top">
        <ReadinessBadges persona={persona} />
      </td>
      <td className="px-4 py-3 align-top">
        <InstagramBlock persona={persona} />
      </td>
      <td className="max-w-[280px] px-4 py-3 align-top">
        <p className="text-[13px] leading-5 text-[var(--graphite)]">{persona.nextStep}</p>
      </td>
    </tr>
  );
}

function PersonaMobileCard({ persona }: { persona: PersonaPortfolioEntry }) {
  return (
    <article
      className="rounded-md border border-[var(--line)] bg-white p-3 shadow-[0_1px_0_rgba(25,26,26,0.04)]"
      style={{ borderLeft: `4px solid ${persona.accentColor}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <PersonaName persona={persona} />
        <StatusBadge label={persona.statusLabel} tone={persona.statusTone} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase text-[var(--steel)]">
          {persona.ownerLabel}
        </span>
        <span className="h-1 w-1 rounded-full bg-[var(--line)]" aria-hidden="true" />
        <span className="text-[12px] font-semibold text-[var(--graphite)]">
          {persona.lane}
        </span>
      </div>

      <p className="mt-2 text-[12px] leading-5 text-[var(--steel)]">{persona.niche}</p>

      <div className="mt-3 rounded-md border border-black/10 bg-black/[0.025] p-3">
        <ScoreBlock persona={persona} />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <ReadinessBadges persona={persona} />
        <InstagramBlock persona={persona} />
      </div>

      <div className="mt-3 rounded-md border border-black/10 bg-white px-3 py-2">
        <p className="font-mono text-[10px] font-semibold uppercase text-[var(--steel)]">
          Nächster Schritt
        </p>
        <p className="mt-1 text-[13px] leading-5 text-[var(--graphite)]">
          {persona.nextStep}
        </p>
      </div>
    </article>
  );
}

function PersonaName({ persona }: { persona: PersonaPortfolioEntry }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-sm"
          style={{ backgroundColor: persona.accentColor }}
          aria-hidden="true"
        />
        <p className="text-[15px] font-bold leading-snug text-[var(--ink)]">
          {persona.publicName}
        </p>
        <Link 
          href={`/personas/${persona.id}/visual`}
          className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--steel)] transition-colors hover:bg-[var(--volt)] hover:text-[var(--ink)]"
        >
          Lab
        </Link>
      </div>
      <p className="mt-1 font-mono text-[11px] font-semibold uppercase text-[var(--steel)]">
        {persona.isLaunchWave ? "Startwelle" : "Backlog"}
      </p>
    </div>
  );
}

function ScoreBlock({ persona }: { persona: PersonaPortfolioEntry }) {
  const width = persona.priorityScore > 0 ? Math.min(100, (persona.priorityScore / 40) * 100) : 4;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge label={persona.scoreLabel} tone={persona.scoreTone} />
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-black/8">
        <div
          className="h-full rounded-full"
          style={{ width: `${width}%`, backgroundColor: persona.accentColor }}
        />
      </div>
      <p className="mt-2 text-[12px] leading-5 text-[var(--steel)]">
        {persona.activationLabel}
      </p>
    </div>
  );
}

function ReadinessBadges({ persona }: { persona: PersonaPortfolioEntry }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <StatusBadge
        label={persona.setcardLabel}
        tone={persona.setcardState === "bereit" ? "success" : persona.setcardState === "pruefen" ? "info" : "warning"}
      />
      <StatusBadge
        label={persona.mediaLabel}
        tone={persona.mediaState === "bereit" ? "success" : persona.mediaState === "aufbauen" ? "info" : "warning"}
      />
    </div>
  );
}

function InstagramBlock({ persona }: { persona: PersonaPortfolioEntry }) {
  return (
    <div className="min-w-[150px]">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--steel)]">
        <AtSign className="h-4 w-4" aria-hidden="true" />
        <span>{persona.instagramStatusLabel}</span>
      </div>
      <p className="mt-1 font-mono text-[12px] font-semibold text-[var(--ink)]">
        {persona.instagramHandle ? `@${persona.instagramHandle}` : "Handle offen"}
      </p>
    </div>
  );
}

function matchesFilter(persona: PersonaPortfolioEntry, filter: FilterId) {
  if (filter === "startwelle") return persona.isLaunchWave;
  if (filter === "backlog") return !persona.isLaunchWave;
  if (filter === "gruender") return persona.ownerLabel === "Gründer";
  if (filter === "partner") return persona.ownerLabel === "Partner";
  if (filter === "setcard_fehlt") {
    return persona.setcardState === "fehlt" || persona.setcardState === "offen";
  }

  return true;
}
