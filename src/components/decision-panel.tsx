import { ArrowRight, OctagonAlert } from "lucide-react";
import { StatusBadge } from "@/src/components/status-badge";
import type { DecisionItem } from "@/src/domain/types";

export function DecisionPanel({ decisions }: { decisions: DecisionItem[] }) {
  return (
    <section className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <h2 className="font-condensed text-[24px] font-bold tracking-normal">
            Entscheidungslogik
          </h2>
          <p className="mt-1 text-[12px] font-medium text-[var(--steel)]">
            Jede Karte beantwortet: warum sehe ich das?
          </p>
        </div>
        <OctagonAlert className="h-5 w-5 text-[var(--signal-red)]" aria-hidden="true" />
      </div>
      <div className="space-y-3 border-t border-[var(--line)] p-4">
        {decisions.map((decision) => (
          <article
            key={decision.id}
            className="rounded-md border border-[var(--line)] bg-white p-3 shadow-[0_1px_0_rgba(25,26,26,0.04)]"
            style={{ borderLeft: `4px solid ${decision.color}` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <StatusBadge label={decision.signal} tone={decision.tone} />
                <h3 className="mt-2 text-[15px] font-bold text-[var(--ink)]">
                  {decision.title}
                </h3>
              </div>
              <span className="font-mono text-[11px] font-semibold text-[var(--steel)]">
                {decision.persona}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-5 text-[var(--steel)]">
              {decision.reason}
            </p>
            <button className="focus-ring mt-3 inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-3 py-2 text-[12px] font-bold text-white hover:bg-[var(--graphite)]">
              {decision.action}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
