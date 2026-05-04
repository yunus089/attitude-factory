"use client";

import { useTransition } from "react";
import { Link2, Lightbulb, ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import type { ResearchItemData } from "@/src/lib/research-queries";
import { convertResearchToContent } from "@/src/lib/research-actions";
import { StatusBadge } from "@/src/components/status-badge";

export function ResearchBoard({ data }: { data: ResearchItemData[] }) {
  const [isPending, startTransition] = useTransition();

  const handleConvert = (id: string) => {
    startTransition(async () => {
      const res = await convertResearchToContent(id);
      if (res.success) {
        alert("Recherche erfolgreich in Content-Slot umgewandelt!");
      } else {
        alert("Fehler: " + res.error);
      }
    });
  };

  return (
    <main className="space-y-4">
      {/* Research Intake Panel */}
      <section className="panel-dark subtle-grid overflow-hidden">
        <div className="grid gap-4 p-4 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-white/54">
              Ideen & Trends
            </p>
            <h2 className="mt-2 font-condensed text-[34px] font-bold leading-none tracking-normal text-white md:text-[42px]">
              Recherche-Eingang
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-6 text-white/66">
              Trends, Hooks von Konkurrenten oder virale Inspiration landen hier. Der Operator wandelt relevante Items in echte Produktions-Slots um.
            </p>
          </div>
          <div className="flex flex-col items-end justify-center">
             <button className="rounded bg-[var(--volt)] px-4 py-2 text-[14px] font-bold text-[var(--ink)] transition-colors hover:bg-[var(--volt)]/90">
               + Neue Recherche erfassen
             </button>
          </div>
        </div>
      </section>

      {/* Research Items List */}
      <section className="grid gap-4 md:grid-cols-2">
        {data.map((item) => (
          <article key={item.id} className="panel flex flex-col overflow-hidden">
            <div className="border-b border-[var(--line)] bg-black/[0.015] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--steel)]">{item.category}</span>
                <span className="text-[var(--line)]">/</span>
                <span className="text-[13px] font-bold text-[var(--ink)]">{item.personaName}</span>
              </div>
              <StatusBadge 
                label={item.status === "umgesetzt" ? "Umgesetzt" : "Offen"} 
                tone={item.status === "umgesetzt" ? "success" : "info"} 
              />
            </div>

            <div className="p-4 space-y-4 flex-1">
              {item.sourceUrl && (
                <a 
                  href={item.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ink)] hover:underline"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  Quelle öffnen
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}

              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-[var(--steel)]">Notiz / Beobachtung</p>
                <p className="mt-1 text-[14px] leading-relaxed text-[var(--graphite)]">
                  {item.note || "Keine Notiz vorhanden."}
                </p>
              </div>

              {item.whyItMatters && (
                <div className="rounded-md bg-black/[0.025] p-3 border border-[var(--line)]">
                   <div className="flex items-center gap-1.5 mb-1 text-[var(--steel)]">
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Warum relevant?</span>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[var(--graphite)]">
                    {item.whyItMatters}
                  </p>
                </div>
              )}

              {item.suggestedContentIdea && (
                <div className="border-l-2 border-[var(--volt)] pl-3">
                  <p className="font-mono text-[10px] font-bold uppercase text-[var(--steel)]">Content Idee / Hook</p>
                  <p className="mt-1 text-[13px] font-bold leading-relaxed text-[var(--ink)]">
                    {item.suggestedContentIdea}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--line)] bg-black/[0.015] px-4 py-3 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[var(--steel)]">
                Aktualisiert am {new Date(item.updatedAt).toLocaleDateString("de-DE")}
              </span>
              {item.status !== "umgesetzt" && (
                <button 
                  onClick={() => handleConvert(item.id)}
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--ink)] hover:underline disabled:opacity-50"
                >
                  {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <ArrowRight className="h-3 w-3" />}
                  In Content umwandeln
                </button>
              )}
            </div>
          </article>
        ))}
        {data.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--steel)]">
            Keine Recherche-Items vorhanden.
          </div>
        )}
      </section>
    </main>
  );
}
