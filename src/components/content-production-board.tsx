import { AlertTriangle, ClipboardList, FileImage, ShieldCheck } from "lucide-react";
import { EmptyState } from "@/src/components/empty-state";
import { PostMaterialUploadForm } from "@/src/components/post-material-upload-form";
import { StatusBadge } from "@/src/components/status-badge";
import type { ContentProductionData, ContentProductionItem, LaunchWavePersonaSlot } from "@/src/lib/content-queries";

export function ContentProductionBoard({ data }: { data: ContentProductionData }) {
  const hasItems = data.items.length > 0;

  return (
    <main className="space-y-4">
      <section className="panel-dark subtle-grid overflow-hidden">
        <div className="grid gap-4 p-4 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-white/54">
              Content-Produktion
            </p>
            <h2 className="mt-2 font-condensed text-[34px] font-bold leading-none tracking-normal text-white md:text-[42px]">
              Produktionsqueue für Instagram
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-6 text-white/66">
              Bilder und Carousels bleiben die Baseline. Kurzvideos sind Premium-Slots und
              werden nur geplant, nicht riskant automatisiert gepostet.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            <SummaryTile label="Queue" value={data.summary.total} />
            <SummaryTile label="Fällig" value={data.summary.dueNow} tone="warning" />
            <SummaryTile label="Postbereit" value={data.summary.readyToPost} tone="success" />
            <SummaryTile label="Material fehlt" value={data.summary.materialMissing} tone="danger" />
            <SummaryTile label="Regelcheck offen" value={data.summary.complianceOpen} tone="warning" />
            <SummaryTile label="Video-Slots" value={data.summary.videoSlots} tone="info" />
          </div>
        </div>
      </section>

      {data.queryError ? <QueryWarning message={data.queryError} /> : null}

      <section className="panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <h2 className="font-condensed text-[26px] font-bold leading-none tracking-normal">
              Operative Queue
            </h2>
            <p className="mt-1 text-[13px] font-medium text-[var(--steel)]">
              Persona, Format, Intent, Owner, Status, Assets, Compliance und nächster Schritt.
            </p>
          </div>
          <span className="rounded-md border border-black/10 bg-black/[0.035] px-2.5 py-1 text-[12px] font-semibold text-[var(--steel)]">
            {hasItems ? `${data.items.length} Inhalte` : "Noch leer"}
          </span>
        </div>

        {hasItems ? (
          <>
            <PostMaterialWorkbench items={data.items} />
            <ContentQueue items={data.items} />
          </>
        ) : (
          <EmptyContentQueue personas={data.startWavePersonas} />
        )}
      </section>
    </main>
  );
}

function PostMaterialWorkbench({ items }: { items: ContentProductionItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-[var(--line)] bg-black/[0.018]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div>
          <h3 className="font-condensed text-[23px] font-bold leading-none tracking-normal">
            Postmaterial-Schleuse
          </h3>
          <p className="mt-1 text-[13px] font-medium text-[var(--steel)]">
            Prompt-Spuren werden hier zu echten Postbildern, Slides oder Kurzvideos.
          </p>
        </div>
        <span className="rounded-md border border-black/10 bg-white px-2.5 py-1 text-[12px] font-semibold text-[var(--steel)]">
          {items.length} Produktionsslots
        </span>
      </div>

      <div className="grid gap-0 border-t border-[var(--line)] md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="border-b border-[var(--line)] bg-white p-4 md:border-r">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.personaColor }}
                    aria-hidden="true"
                  />
                  <p className="text-[13px] font-bold text-[var(--ink)]">{item.personaName}</p>
                </div>
                <h4 className="mt-2 text-[14px] font-bold leading-snug text-[var(--ink)]">
                  {item.hook}
                </h4>
              </div>
              <StatusBadge label={item.assetStatusLabel} tone={item.assetTone} />
            </div>
            <PostMaterialUploadForm contentItemId={item.id} />
          </article>
        ))}
      </div>
    </section>
  );
}

function ContentQueue({ items }: { items: ContentProductionItem[] }) {
  return (
    <>
      <div className="grid gap-3 border-t border-[var(--line)] p-3 md:hidden">
        {items.map((item) => (
          <MobileContentRow key={item.id} item={item} />
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[1120px] border-collapse text-left">
          <thead className="border-y border-[var(--line)] bg-black/[0.025]">
            <tr className="text-[11px] font-bold uppercase text-[var(--steel)]">
              <th className="px-4 py-2.5">Persona</th>
              <th className="px-4 py-2.5">Inhalt</th>
              <th className="px-4 py-2.5">Format</th>
              <th className="px-4 py-2.5">Intent</th>
              <th className="px-4 py-2.5">Owner</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5">Assets</th>
              <th className="px-4 py-2.5">Compliance</th>
              <th className="px-4 py-2.5">Geplant</th>
              <th className="px-4 py-2.5">Nächster Schritt</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[var(--line)] text-[13px] last:border-0 hover:bg-black/[0.018]"
              >
                <td className="px-4 py-3 align-top">
                  <div className="flex items-start gap-2">
                    <span
                      className="mt-1 h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.personaColor }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-bold text-[var(--ink)]">{item.personaName}</p>
                      <p className="mt-1 max-w-[180px] text-[12px] leading-4 text-[var(--steel)]">
                        {item.personaLane}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="max-w-[220px] font-semibold leading-5 text-[var(--ink)]">
                    {item.hook}
                  </p>
                  {item.triggerTags.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {item.triggerTags.map(tag => (
                         <span key={tag} className="inline-block rounded-sm bg-[var(--volt)]/15 px-1.5 py-0.5 text-[10px] font-bold text-[var(--ink)]">
                           {tag}
                         </span>
                      ))}
                    </div>
                  )}
                  {item.originalityStatus !== "offen" && (
                    <p className="mt-1.5 text-[11px] font-medium text-[var(--steel)]">
                      Orig: {item.originalityStatus}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 align-top font-medium text-[var(--graphite)]">
                  {item.formatLabel}
                </td>
                <td className="px-4 py-3 align-top font-medium text-[var(--graphite)]">
                  {item.intentLabel}
                </td>
                <td className="px-4 py-3 align-top font-semibold text-[var(--graphite)]">
                  {item.ownerLabel}
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusBadge label={item.statusLabel} tone={item.statusTone} />
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusBadge label={item.assetStatusLabel} tone={item.assetTone} />
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusBadge label={item.complianceLabel} tone={item.complianceTone} />
                </td>
                <td className="px-4 py-3 align-top font-mono text-[12px] font-semibold text-[var(--steel)]">
                  {item.plannedDateLabel}
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="max-w-[260px] leading-5 text-[var(--graphite)]">
                    {item.nextStep}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function MobileContentRow({ item }: { item: ContentProductionItem }) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.personaColor }}
              aria-hidden="true"
            />
            <p className="text-[13px] font-bold text-[var(--ink)]">{item.personaName}</p>
          </div>
          <h3 className="mt-2 text-[15px] font-bold leading-snug text-[var(--ink)]">
            {item.hook}
          </h3>
          {item.triggerTags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.triggerTags.map(tag => (
                 <span key={tag} className="inline-block rounded-sm bg-[var(--volt)]/15 px-1.5 py-0.5 text-[10px] font-bold text-[var(--ink)]">
                   {tag}
                 </span>
              ))}
            </div>
          )}
          <p className="mt-2 text-[12px] font-medium text-[var(--steel)]">
            {item.formatLabel} · {item.intentLabel} · {item.ownerLabel}
          </p>
        </div>
        <span className="shrink-0 rounded-md border border-black/10 bg-black/[0.035] px-2 py-1 font-mono text-[11px] font-semibold text-[var(--steel)]">
          {item.plannedDateLabel}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <StatusBadge label={item.statusLabel} tone={item.statusTone} />
        <StatusBadge label={item.assetStatusLabel} tone={item.assetTone} />
        <StatusBadge label={item.complianceLabel} tone={item.complianceTone} />
      </div>

      <div className="mt-3 rounded-md border border-black/10 bg-black/[0.025] px-3 py-2">
        <p className="font-mono text-[10px] font-semibold uppercase text-[var(--steel)]">
          Nächster Schritt
        </p>
        <p className="mt-1 text-[13px] leading-5 text-[var(--graphite)]">{item.nextStep}</p>
      </div>
    </article>
  );
}

function EmptyContentQueue({ personas }: { personas: LaunchWavePersonaSlot[] }) {
  return (
    <div className="border-t border-[var(--line)] p-4">
      <EmptyState
        title="Noch keine Inhalte angelegt"
        description="Die Queue ist bereit, aber der Datenkern enthält noch keine Content-Produktion. Starte nicht mit zufälligen Posts: Lege pro Startwellen-Persona genau einen ersten Produktionsslot mit Hook, Format, Owner und Regelgrenze an."
        mentorNote="Drucktest: Wenn der erste Slot keinen messbaren Intent hat, ist er noch keine Produktion. Reichweite, Saves, Shares oder Follows müssen klar erkennbar sein."
        tone="mentor"
      />

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[840px] border-collapse text-left">
          <thead className="border-y border-[var(--line)] bg-black/[0.025]">
            <tr className="text-[11px] font-bold uppercase text-[var(--steel)]">
              <th className="px-4 py-2.5">Persona</th>
              <th className="px-4 py-2.5">Startformat</th>
              <th className="px-4 py-2.5">Owner</th>
              <th className="px-4 py-2.5">Erste Aktion</th>
              <th className="px-4 py-2.5">Compliance-Grenze</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => (
              <tr key={persona.name} className="border-b border-[var(--line)] text-[13px] last:border-0">
                <td className="px-4 py-3 align-top">
                  <div className="flex items-start gap-2">
                    <span
                      className="mt-1 h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: persona.color }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-bold text-[var(--ink)]">{persona.publicName}</p>
                      <p className="mt-1 max-w-[220px] text-[12px] leading-4 text-[var(--steel)]">
                        {persona.lane}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-top font-semibold text-[var(--graphite)]">
                  {persona.firstFormat}
                </td>
                <td className="px-4 py-3 align-top font-semibold text-[var(--graphite)]">
                  {persona.ownerLabel}
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="max-w-[280px] leading-5 text-[var(--graphite)]">
                    {persona.firstAction}
                  </p>
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="max-w-[280px] leading-5 text-[var(--graphite)]">
                    {persona.complianceGuardrail}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QueryWarning({ message }: { message: string }) {
  return (
    <section className="rounded-md border border-[var(--amber)]/45 bg-[var(--amber)]/12 p-3">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#8a580c]" aria-hidden="true" />
        <div>
          <p className="text-[13px] font-bold text-[var(--ink)]">Datenbankabfrage nicht verfügbar</p>
          <p className="mt-1 text-[12px] leading-5 text-[var(--graphite)]">
            Fallback-Startwelle wird angezeigt. Technischer Hinweis: {message}
          </p>
        </div>
      </div>
    </section>
  );
}

function SummaryTile({
  label,
  value,
  tone = "neutral"
}: {
  label: string;
  value: number;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
}) {
  const toneClass = {
    neutral: "text-white/52",
    success: "text-[var(--success)]",
    warning: "text-[var(--amber)]",
    danger: "text-[var(--signal-red)]",
    info: "text-[var(--data-cyan)]"
  }[tone];

  return (
    <article className="rounded-md border border-white/10 bg-white/[0.055] p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[22px] font-semibold leading-none text-white">{value}</p>
        <SummaryIcon tone={tone} />
      </div>
      <p className={`mt-2 text-[11px] font-semibold uppercase ${toneClass}`}>{label}</p>
    </article>
  );
}

function SummaryIcon({ tone }: { tone: "neutral" | "success" | "warning" | "danger" | "info" }) {
  const Icon =
    tone === "success"
      ? ShieldCheck
      : tone === "warning" || tone === "danger"
        ? AlertTriangle
        : tone === "info"
          ? FileImage
          : ClipboardList;

  return <Icon className="h-4 w-4 text-white/42" aria-hidden="true" />;
}
