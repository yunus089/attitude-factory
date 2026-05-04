import {
  AlertTriangle,
  FileImage,
  FileText,
  History,
  ImageIcon,
  LibraryBig,
  Video,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";
import { EmptyState } from "@/src/components/empty-state";
import { StatusBadge } from "@/src/components/status-badge";
import type { MediaGroup, MediaLibraryData, MediaLibraryItem, SetcardSlot } from "@/src/lib/content-queries";

export function MediaLibraryPreview({ data }: { data: MediaLibraryData }) {
  const hasAssets = data.summary.total > 0;
  const openSetcardSlots = data.setcardSlots.filter((slot) => slot.slotTone !== "success");

  return (
    <main className="space-y-4">
      <section className="panel-dark subtle-grid overflow-hidden">
        <div className="grid gap-4 p-4 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-white/54">
              Medien
            </p>
            <h2 className="mt-2 font-condensed text-[34px] font-bold leading-none tracking-normal text-white md:text-[42px]">
              Medienbibliothek für Persona-Konsistenz
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-6 text-white/66">
              Setcards, Referenzen, Postbilder, Videos und Prompt-Historie bleiben
              sichtbar, damit Produktion nicht zur losen Dateiablage verkommt.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 xl:grid-cols-3">
            <SummaryTile label="Dateien" value={data.summary.total} />
            <SummaryTile label="Setcards" value={data.summary.setcards} tone="info" />
            <SummaryTile label="Freigegeben" value={data.summary.readyAssets} tone="success" />
            <SummaryTile label="Bearbeiten" value={data.summary.needsWork} tone="warning" />
            <SummaryTile label="Prompts" value={data.summary.promptRecords} tone="active" />
          </div>
        </div>
      </section>

      {data.queryError ? <QueryWarning message={data.queryError} /> : null}

      {!hasAssets ? (
        <EmptyMediaLibrary setcardSlots={data.setcardSlots} />
      ) : (
        <>
          {openSetcardSlots.length > 0 ? <SetcardSlotPanel slots={openSetcardSlots} compact /> : null}
          <div className="space-y-4">
            {data.groups.map((group) => (
              <MediaGroupSection key={group.key} group={group} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

function EmptyMediaLibrary({ setcardSlots }: { setcardSlots: SetcardSlot[] }) {
  return (
    <section className="panel overflow-hidden">
      <div className="p-4">
        <EmptyState
          title="Noch keine Medien-Dateien in der Medienbibliothek"
          description="Die erste Pflicht ist nicht mehr Output, sondern stabile Identität. Lege zuerst Setcard-Slots für die sechs Startwellen-Personas an und markiere danach Referenzen, Postmaterial und Prompts getrennt."
          mentorNote="Drucktest: Ohne Setcard gibt es keine verlässliche Bildproduktion. Jede Persona braucht einen visuellen Anker, bevor Varianten skaliert werden."
          tone="warning"
        />
      </div>
      <SetcardSlotPanel slots={setcardSlots} />
    </section>
  );
}

function SetcardSlotPanel({
  slots,
  compact = false
}: {
  slots: SetcardSlot[];
  compact?: boolean;
}) {
  return (
    <section className={compact ? "panel overflow-hidden" : "border-t border-[var(--line)]"}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div>
          <h2 className="font-condensed text-[24px] font-bold leading-none tracking-normal">
            Startwellen-Setcards
          </h2>
          <p className="mt-1 text-[13px] font-medium text-[var(--steel)]">
            Sechs visuelle Anker, bevor die Content-Maschine hochdreht.
          </p>
        </div>
        <span className="rounded-md border border-black/10 bg-black/[0.035] px-2.5 py-1 text-[12px] font-semibold text-[var(--steel)]">
          {slots.length} Slots
        </span>
      </div>

      <div className="grid gap-3 border-t border-[var(--line)] p-3 md:hidden">
        {slots.map((slot) => (
          <article key={slot.name} className="rounded-md border border-[var(--line)] bg-white p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: slot.color }}
                    aria-hidden="true"
                  />
                  <h3 className="text-[15px] font-bold text-[var(--ink)]">{slot.publicName}</h3>
                </div>
                <p className="mt-1 text-[12px] leading-4 text-[var(--steel)]">{slot.lane}</p>
              </div>
              <StatusBadge label={slot.slotLabel} tone={slot.slotTone} />
            </div>
            <p className="mt-3 text-[13px] leading-5 text-[var(--graphite)]">{slot.firstAction}</p>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead className="border-y border-[var(--line)] bg-black/[0.025]">
            <tr className="text-[11px] font-bold uppercase text-[var(--steel)]">
              <th className="px-4 py-2.5">Persona</th>
              <th className="px-4 py-2.5">Owner</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5">Medienstatus</th>
              <th className="px-4 py-2.5">Nächste Asset-Aktion</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.name} className="border-b border-[var(--line)] text-[13px] last:border-0">
                <td className="px-4 py-3 align-top">
                  <div className="flex items-start gap-2">
                    <span
                      className="mt-1 h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: slot.color }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-bold text-[var(--ink)]">{slot.publicName}</p>
                      <p className="mt-1 max-w-[240px] text-[12px] leading-4 text-[var(--steel)]">
                        {slot.lane}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-top font-semibold text-[var(--graphite)]">{slot.ownerLabel}</td>
                <td className="px-4 py-3 align-top">
                  <StatusBadge label={slot.slotLabel} tone={slot.slotTone} />
                </td>
                <td className="px-4 py-3 align-top font-medium text-[var(--graphite)]">
                  {slot.mediaReadinessStatus}
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="max-w-[360px] leading-5 text-[var(--graphite)]">{slot.firstAction}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MediaGroupSection({ group }: { group: MediaGroup }) {
  const Icon = mediaGroupIcons[group.key];

  return (
    <section className="panel overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-black/[0.045] text-[var(--graphite)]">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-condensed text-[24px] font-bold leading-none tracking-normal">
              {group.title}
            </h2>
            <p className="mt-1 text-[13px] font-medium text-[var(--steel)]">{group.description}</p>
          </div>
        </div>
        <span className="rounded-md border border-black/10 bg-black/[0.035] px-2.5 py-1 text-[12px] font-semibold text-[var(--steel)]">
          {group.items.length} Einträge
        </span>
      </div>

      {group.items.length > 0 ? (
        <MediaItems items={group.items} />
      ) : (
        <div className="border-t border-[var(--line)] px-4 py-5 text-[13px] font-medium text-[var(--steel)]">
          {group.emptyLabel}
        </div>
      )}
    </section>
  );
}

function MediaItems({ items }: { items: MediaLibraryItem[] }) {
  return (
    <>
      <div className="grid gap-3 border-t border-[var(--line)] p-3 md:hidden">
        {items.map((item) => (
          <MobileMediaRow key={item.id} item={item} />
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[1040px] border-collapse text-left">
          <thead className="border-y border-[var(--line)] bg-black/[0.025]">
            <tr className="text-[11px] font-bold uppercase text-[var(--steel)]">
              <th className="px-4 py-2.5">Vorschau</th>
              <th className="px-4 py-2.5">Persona</th>
              <th className="px-4 py-2.5">Datei</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5">Qualität</th>
              <th className="px-4 py-2.5">Prompt / Notiz</th>
              <th className="px-4 py-2.5">Inhalt / Datum</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-[var(--line)] text-[13px] last:border-0 hover:bg-black/[0.018]">
                <td className="px-4 py-3 align-top">
                  <AssetPreview item={item} />
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="flex items-start gap-2">
                    <span
                      className="mt-1 h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.personaColor }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-bold text-[var(--ink)]">{item.personaName}</p>
                      <p className="mt-1 max-w-[190px] text-[12px] leading-4 text-[var(--steel)]">
                        {item.personaLane}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="max-w-[220px] break-words font-semibold leading-5 text-[var(--ink)]">
                    {item.fileName}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-[var(--steel)]">
                    {item.typeLabel} · {item.sizeLabel} · {item.sourceTool}
                  </p>
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusBadge label={item.statusLabel} tone={item.statusTone} />
                </td>
                <td className="px-4 py-3 align-top font-medium text-[var(--graphite)]">
                  <span className="font-mono text-[12px]">Q {item.qualityLabel}</span>
                  <span className="mx-1 text-[var(--line)]">/</span>
                  <span className="font-mono text-[12px]">K {item.consistencyLabel}</span>
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="max-w-[260px] leading-5 text-[var(--graphite)]">
                    {item.promptSnippet || item.notes || "Noch keine Prompt- oder Notizspur."}
                  </p>
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="max-w-[220px] font-medium leading-5 text-[var(--graphite)]">
                    {item.contentHook || "Keinem ContentItem zugeordnet"}
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-semibold text-[var(--steel)]">
                    {item.createdLabel}
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

function MobileMediaRow({ item }: { item: MediaLibraryItem }) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-3">
      <div className="grid grid-cols-[64px_1fr] gap-3">
        <AssetPreview item={item} />
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold text-[var(--ink)]">{item.fileName}</p>
              <p className="mt-1 text-[12px] font-medium text-[var(--steel)]">
                {item.personaName} · {item.typeLabel}
              </p>
            </div>
            <StatusBadge label={item.statusLabel} tone={item.statusTone} />
          </div>
          <p className="mt-3 text-[13px] leading-5 text-[var(--graphite)]">
            {item.promptSnippet || item.notes || item.contentHook || "Noch keine Arbeitsnotiz."}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-semibold text-[var(--steel)]">
        <span className="rounded-md border border-black/10 bg-black/[0.025] px-2 py-1">
          Q {item.qualityLabel}
        </span>
        <span className="rounded-md border border-black/10 bg-black/[0.025] px-2 py-1">
          K {item.consistencyLabel}
        </span>
        <span className="rounded-md border border-black/10 bg-black/[0.025] px-2 py-1">
          {item.createdLabel}
        </span>
      </div>
    </article>
  );
}

function AssetPreview({ item }: { item: MediaLibraryItem }) {
  if (item.previewSrc) {
    return (
      <div className="relative h-16 w-16 overflow-hidden rounded-md border border-black/10 bg-black/[0.035]">
        <Image
          src={item.previewSrc}
          alt={`Vorschau für ${item.fileName}`}
          width={64}
          height={64}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const Icon = item.assetType === "KURZVIDEO" ? Video : item.assetType === "PROMPT" ? FileText : ImageIcon;

  return (
    <div className="grid h-16 w-16 place-items-center rounded-md border border-black/10 bg-black/[0.035] text-[var(--steel)]">
      <Icon className="h-6 w-6" aria-hidden="true" />
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
            Fallback-Setcard-Slots werden angezeigt. Technischer Hinweis: {message}
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
  tone?: "neutral" | "success" | "warning" | "active" | "info";
}) {
  const toneClass = {
    neutral: "text-white/52",
    success: "text-[var(--success)]",
    warning: "text-[var(--amber)]",
    active: "text-[var(--volt)]",
    info: "text-[var(--data-cyan)]"
  }[tone];

  return (
    <article className="rounded-md border border-white/10 bg-white/[0.055] p-3">
      <p className="font-mono text-[22px] font-semibold leading-none text-white">{value}</p>
      <p className={`mt-2 text-[11px] font-semibold uppercase ${toneClass}`}>{label}</p>
    </article>
  );
}

const mediaGroupIcons: Record<MediaGroup["key"], LucideIcon> = {
  setcards: LibraryBig,
  references: FileImage,
  postAssets: ImageIcon,
  videos: Video,
  prompts: History
};
