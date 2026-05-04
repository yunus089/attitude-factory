"use client";

import { useState, useTransition } from "react";
import { Flame, Snowflake, Sparkles, Loader2 } from "lucide-react";
import type { HookEngineItem } from "@/src/lib/hook-queries";
import { StatusBadge } from "@/src/components/status-badge";
import { createSpinOff } from "@/src/lib/hook-actions";

export function HookEngineBoard({ data }: { data: HookEngineItem[] }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSpinOff = (hookId: string) => {
    startTransition(async () => {
      const result = await createSpinOff(hookId);
      if (result.success) {
        setMessage({ type: "success", text: "Spin-Off erzeugt! Siehe Content-Produktion." });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: result.error || "Fehler beim Erzeugen." });
      }
    });
  };

  const hotHooks = data.filter(h => h.status === "GEWINNER");
  const frozenHooks = data.filter(h => h.status === "SCHWACH");
  
  return (
    <main className="space-y-4">
      {/* Proactive Content Director Dashboard */}
      <section className="panel-dark subtle-grid overflow-hidden">
        <div className="grid gap-4 p-4 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-white/54">
              Insights & Proaktive Vorschläge
            </p>
            <h2 className="mt-2 font-condensed text-[34px] font-bold leading-none tracking-normal text-white md:text-[42px]">
              Proactive Content Director
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-6 text-white/66">
              Das System aggregiert die Metriken zu jedem Hook. Hooks, die in ihren Posts wiederholt über dem Portfolio-Median (Reichweite/Saves) abschneiden, werden automatisch zu &quot;Gewinnern&quot; erklärt.
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            {hotHooks.length > 0 ? (
              <div className="rounded-lg bg-[var(--volt)]/10 p-3 border border-[var(--volt)]/20">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-[var(--volt)]" />
                  <span className="text-[14px] font-bold text-[var(--volt)]">Gewinner-Streak!</span>
                </div>
                <p className="text-[13px] text-white/80">
                  {hotHooks.length} Hooks performen aktuell über dem Median. Generiere Spin-Offs, um den Erfolg zu wiederholen.
                </p>
              </div>
            ) : (
               <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                 <p className="text-[13px] text-white/80">Noch keine Gewinner-Hooks identifiziert. Wir brauchen mehr Daten.</p>
               </div>
            )}
            
            {frozenHooks.length > 0 && (
               <div className="rounded-lg bg-[var(--red)]/10 p-3 border border-[var(--red)]/20">
                <div className="flex items-center gap-2 mb-1">
                  <Snowflake className="w-4 h-4 text-[var(--red)]" />
                  <span className="text-[14px] font-bold text-[var(--red)]">Warnung</span>
                </div>
                <p className="text-[13px] text-white/80">
                  {frozenHooks.length} Hooks liegen konstant unter dem Median. Vermeide diese Formate.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hook List */}
      <section className="panel overflow-hidden">
        {message && (
          <div className={`p-3 text-[13px] font-bold text-center ${message.type === "success" ? "bg-[var(--volt)]/20 text-[var(--ink)]" : "bg-[var(--red)]/20 text-[var(--red)]"}`}>
            {message.text}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <h2 className="font-condensed text-[26px] font-bold leading-none tracking-normal">
              Hook-Bibliothek
            </h2>
            <p className="mt-1 text-[13px] font-medium text-[var(--steel)]">
              Zentrale Verwaltung aller Hooks und deren Performance-Status.
            </p>
          </div>
          <span className="rounded-md border border-black/10 bg-black/[0.035] px-2.5 py-1 text-[12px] font-semibold text-[var(--steel)]">
            {data.length} Hooks
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead className="border-y border-[var(--line)] bg-black/[0.025]">
              <tr className="text-[11px] font-bold uppercase text-[var(--steel)]">
                <th className="px-4 py-2.5 w-[25%]">Hook & Status</th>
                <th className="px-4 py-2.5 w-[15%]">Persona</th>
                <th className="px-4 py-2.5 w-[15%]">Intent & Trigger</th>
                <th className="px-4 py-2.5 w-[10%] text-center">Einsätze</th>
                <th className="px-4 py-2.5 w-[15%]">Letzter Einsatz</th>
                <th className="px-4 py-2.5 w-[20%] text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-[var(--line)] text-[13px] hover:bg-black/[0.018]">
                  <td className="px-4 py-3 align-top">
                    <p className="font-semibold text-[var(--ink)] leading-snug">{item.text}</p>
                    <div className="mt-2">
                       {item.status === "GEWINNER" && <StatusBadge label="Hot / Gewinner" tone="success" />}
                       {item.status === "SCHWACH" && <StatusBadge label="Eis / Frozen" tone="danger" />}
                       {item.status === "GETESTET" && <StatusBadge label="Getestet" tone="info" />}
                       {item.status === "IDEE" && <StatusBadge label="Idee" tone="neutral" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <p className="font-bold text-[var(--ink)]">{item.personaName}</p>
                    <p className="text-[12px] text-[var(--steel)]">{item.personaLane}</p>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <p className="font-medium text-[var(--graphite)] uppercase text-[11px]">{item.intent}</p>
                    {item.triggerTags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.triggerTags.map(tag => (
                           <span key={tag} className="inline-block rounded-sm bg-[var(--volt)]/15 px-1.5 py-0.5 text-[10px] font-bold text-[var(--ink)]">
                             {tag}
                           </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-center font-bold text-[var(--ink)]">
                    {item.usageCount}
                  </td>
                  <td className="px-4 py-3 align-top text-[12px] font-mono text-[var(--steel)]">
                    {item.lastUsedAt ? new Date(item.lastUsedAt).toLocaleDateString("de-DE") : "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    <button 
                      className="inline-flex items-center gap-1.5 rounded bg-[var(--ink)] px-3 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-[var(--ink)]/80 focus:outline-none focus:ring-2 focus:ring-[var(--ink)] focus:ring-offset-2 disabled:opacity-50"
                      onClick={() => handleSpinOff(item.id)}
                      disabled={isPending}
                    >
                      {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      Spin-Off erzeugen
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[var(--steel)]">
                    Keine Hooks gefunden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
