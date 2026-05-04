"use client";

import { ShieldCheck, ShieldAlert, TrendingUp } from "lucide-react";
import type { OfferReadinessData } from "@/src/lib/offer-queries";
import { StatusBadge } from "@/src/components/status-badge";

export function OfferReadinessBoard({ data }: { data: OfferReadinessData[] }) {
  const readinessAvg = data.length > 0 
    ? (data.reduce((acc, item) => acc + item.readinessLevel, 0) / data.length).toFixed(1)
    : "0.0";

  const allClaimSafe = data.length > 0 && data.every(item => item.claimSafeAngle && item.claimSafeAngle.length > 10);

  return (
    <main className="space-y-4">
      {/* Monetization Strategy Panel */}
      <section className="panel-dark subtle-grid overflow-hidden">
        <div className="grid gap-4 p-4 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-white/54">
              Monetarisierung & Compliance
            </p>
            <h2 className="mt-2 font-condensed text-[34px] font-bold leading-none tracking-normal text-white md:text-[42px]">
              Angebots-Check & Readiness
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-6 text-white/66">
              Affiliate-Marketing startet erst, wenn die Persona eine &quot;Readiness&quot; von 3+ erreicht hat. Bis dahin liegt der Fokus zu 100% auf Vertrauensaufbau und Reichweite.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded border border-white/10 bg-white/5 p-3">
              <p className="font-mono text-[10px] font-bold uppercase text-white/40">Audit-Status</p>
              <p className="mt-1 text-[18px] font-bold text-white">
                {allClaimSafe ? "Claim-Safe" : "Audit offen"}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <ShieldCheck className={`h-4 w-4 ${allClaimSafe ? "text-[var(--volt)]" : "text-white/20"}`} />
                <span className="text-[12px] text-white/60">
                  {allClaimSafe ? "Alle Angles geprüft" : "Angles unvollständig"}
                </span>
              </div>
            </div>
            <div className="rounded border border-white/10 bg-white/5 p-3">
              <p className="font-mono text-[10px] font-bold uppercase text-white/40">Readiness Avg</p>
              <p className="mt-1 text-[18px] font-bold text-white">Level {readinessAvg}</p>
              <div className="mt-2 flex items-center gap-2 text-[var(--amber)]">
                <TrendingUp className="h-4 w-4" />
                <span className="text-[12px]">Wachstumsphase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Readiness Grid */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <article key={item.id} className="panel flex flex-col overflow-hidden">
            <div className="border-b border-[var(--line)] bg-black/[0.015] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                   <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.personaColor }}
                  />
                  <h3 className="text-[16px] font-bold text-[var(--ink)]">{item.personaName}</h3>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-4 w-1.5 rounded-full ${
                        level <= item.readinessLevel ? "bg-[var(--volt)]" : "bg-[var(--line)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-[12px] font-medium text-[var(--steel)]">{item.personaLane}</p>
            </div>

            <div className="flex-1 space-y-4 p-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-[var(--steel)]">Ziel-Kategorie</p>
                <p className="mt-1 text-[14px] font-bold text-[var(--ink)]">{item.category}</p>
                {item.specificOffer && (
                  <p className="mt-0.5 text-[12px] font-medium text-[var(--graphite)]">→ {item.specificOffer}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="rounded-md bg-[var(--volt)]/10 p-2.5 border border-[var(--volt)]/20">
                  <div className="flex items-center gap-1.5 mb-1 text-[var(--ink)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--volt)]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Green Zone (Safe)</span>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[var(--graphite)] italic font-medium">
                    &quot;{item.claimSafeAngle || "Noch kein sicherer Angle definiert."}&quot;
                  </p>
                </div>

                <div className="rounded-md bg-[var(--red)]/5 p-2.5 border border-[var(--red)]/10">
                  <div className="flex items-center gap-1.5 mb-1 text-[var(--red)]">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Red Zone (No-Go)</span>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[var(--steel)]">
                    Keine medizinischen Heilversprechen, keine &quot;Über Nacht&quot;-Garantien.
                  </p>
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-[var(--steel)]">Soft-CTA Strategie</p>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-[var(--graphite)]">
                  {item.softCta || "Fokus auf Engagement-Trigger."}
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--line)] bg-black/[0.015] px-4 py-3 flex items-center justify-between">
               <StatusBadge label={item.status === "aktiv" ? "Pitch-Ready" : "Warten / Trust"} tone={item.status === "aktiv" ? "success" : "neutral"} />
               <button className="text-[12px] font-bold text-[var(--ink)] hover:underline">
                 Audit bearbeiten
               </button>
            </div>
          </article>
        ))}
        {data.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--steel)]">
            Noch keine Angebots-Checks durchgeführt.
          </div>
        )}
      </section>
    </main>
  );
}
