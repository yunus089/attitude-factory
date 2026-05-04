import { Clock3, MoreHorizontal } from "lucide-react";
import { StatusBadge } from "@/src/components/status-badge";
import type { QueueItem } from "@/src/domain/types";

export function TodayQueue({ items }: { items: QueueItem[] }) {
  return (
    <section className="panel overflow-hidden">
      <Header title="Heute-Queue" action="8 offene Aktionen" />

      <div className="grid gap-3 border-t border-[var(--line)] p-3 md:hidden">
        {items.map((item) => (
          <MobileQueueCard key={item.id} item={item} />
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead className="border-y border-[var(--line)] bg-black/[0.025]">
            <tr className="text-[11px] font-bold uppercase text-[var(--steel)]">
              <th className="px-4 py-2.5">Inhalt</th>
              <th className="px-4 py-2.5">Persona</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5">Zuständig</th>
              <th className="px-4 py-2.5">Nächste Aktion</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[var(--line)] text-[13px] last:border-0 hover:bg-black/[0.018]"
              >
                <td className="px-4 py-3">
                  <p className="font-semibold text-[var(--ink)]">{item.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-[12px] text-[var(--steel)]">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{item.due}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold" style={{ color: item.personaColor }}>
                    {item.persona}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge label={item.status.label} tone={item.status.tone} />
                </td>
                <td className="px-4 py-3 font-medium text-[var(--graphite)]">
                  {item.owner}
                </td>
                <td className="px-4 py-3 text-[var(--graphite)]">{item.nextAction}</td>
                <td className="px-4 py-3 text-right">
                  <button className="focus-ring rounded-md p-1.5 text-[var(--steel)] hover:bg-black/[0.06]">
                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Weitere Aktionen</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MobileQueueCard({ item }: { item: QueueItem }) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-snug text-[var(--ink)]">
            {item.title}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase text-[var(--steel)]">
              {item.owner}
            </span>
            <span className="h-1 w-1 rounded-full bg-[var(--line)]" aria-hidden="true" />
            <span className="font-semibold text-[12px]" style={{ color: item.personaColor }}>
              {item.persona}
            </span>
          </div>
        </div>
        <button className="focus-ring -mr-1 grid min-h-11 min-w-11 place-items-center rounded-md text-[var(--steel)] hover:bg-black/[0.06]">
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Weitere Aktionen</span>
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatusBadge label={item.status.label} tone={item.status.tone} />
        <span className="inline-flex min-h-8 items-center gap-1.5 rounded-md border border-black/10 bg-black/[0.025] px-2 text-[12px] font-semibold text-[var(--steel)]">
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          {item.due}
        </span>
      </div>

      <div className="mt-3 rounded-md border border-black/10 bg-black/[0.025] px-3 py-2">
        <p className="font-mono text-[10px] font-semibold uppercase text-[var(--steel)]">
          Nächste Aktion
        </p>
        <p className="mt-1 text-[13px] leading-5 text-[var(--graphite)]">
          {item.nextAction}
        </p>
      </div>
    </article>
  );
}

function Header({ title, action }: { title: string; action: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <h2 className="font-condensed text-[24px] font-bold tracking-normal">{title}</h2>
      <span className="rounded-md border border-black/10 bg-black/[0.035] px-2.5 py-1 text-[12px] font-semibold text-[var(--steel)]">
        {action}
      </span>
    </div>
  );
}
