"use client";

import { useTransition } from "react";
import { CheckSquare, Square, Info } from "lucide-react";
import type { ComplianceCheckData } from "@/src/lib/compliance-queries";
import { updateComplianceCheck } from "@/src/lib/compliance-actions";
import { StatusBadge } from "@/src/components/status-badge";

export function ComplianceBoard({ data }: { data: ComplianceCheckData[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: string, field: string, currentValue: boolean) => {
    startTransition(async () => {
      await updateComplianceCheck(id, { [field]: !currentValue });
    });
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      await updateComplianceCheck(id, { status: newStatus });
    });
  };

  return (
    <main className="space-y-4">
      {/* Compliance Header Panel */}
      <section className="panel-dark subtle-grid overflow-hidden">
        <div className="grid gap-4 p-4 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-white/54">
              Regelwerk & Risiko
            </p>
            <h2 className="mt-2 font-condensed text-[34px] font-bold leading-none tracking-normal text-white md:text-[42px]">
              Regelcheck & Claims
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-6 text-white/66">
              Kein Inhalt geht ohne Prüfung der AI-Disclosure und Claim-Sicherheit live. Dies schützt das Portfolio vor Schattenbanns und Account-Löschungen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded border border-white/10 bg-white/5 p-3">
              <p className="font-mono text-[10px] font-bold uppercase text-white/40">Audit-Status</p>
              <p className="mt-1 text-[18px] font-bold text-white">{data.filter(d => d.status === "bestanden").length} Bestanden</p>
            </div>
            <div className="rounded border border-white/10 bg-[var(--red)]/10 p-3">
              <p className="font-mono text-[10px] font-bold uppercase text-[var(--red)]">Risiko-Fälle</p>
              <p className="mt-1 text-[18px] font-bold text-white">{data.filter(d => d.status === "risiko").length} Offen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Checklist Grid */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <article key={item.id} className="panel flex flex-col overflow-hidden">
            <div className="border-b border-[var(--line)] bg-black/[0.015] p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[14px] font-bold text-[var(--ink)] line-clamp-1">{item.hook}</h3>
                <StatusBadge 
                  label={item.status === "bestanden" ? "Bestanden" : item.status === "risiko" ? "Risiko" : "Offen"} 
                  tone={item.status === "bestanden" ? "success" : item.status === "risiko" ? "danger" : "neutral"} 
                />
              </div>
              <p className="mt-1 text-[12px] font-medium text-[var(--steel)]">{item.personaName}</p>
            </div>

            <div className="flex-1 p-4 space-y-4">
              <div className="space-y-2">
                <ComplianceItem 
                  label="KI-Hinweis vorhanden" 
                  checked={item.aiDisclosureChecked} 
                  onToggle={() => handleToggle(item.id, "aiDisclosureChecked", item.aiDisclosureChecked)}
                  disabled={isPending}
                />
                <ComplianceItem 
                  label="Affiliate-Hinweis (falls nötig)" 
                  checked={item.affiliateDisclosureChecked} 
                  onToggle={() => handleToggle(item.id, "affiliateDisclosureChecked", item.affiliateDisclosureChecked)}
                  disabled={isPending}
                />
                <ComplianceItem 
                  label="Kein Fake-Nutzungsversprechen" 
                  checked={item.noFakeUsageClaim} 
                  onToggle={() => handleToggle(item.id, "noFakeUsageClaim", item.noFakeUsageClaim)}
                  disabled={isPending}
                />
                <ComplianceItem 
                  label="Keine Heilversprechen" 
                  checked={item.noMedicalClaim} 
                  onToggle={() => handleToggle(item.id, "noMedicalClaim", item.noMedicalClaim)}
                  disabled={isPending}
                />
                <ComplianceItem 
                  label="Keine Finanzversprechen" 
                  checked={item.noFinancialClaim} 
                  onToggle={() => handleToggle(item.id, "noFinancialClaim", item.noFinancialClaim)}
                  disabled={isPending}
                />
              </div>

              {item.notes && (
                <div className="rounded bg-black/[0.025] p-2.5 text-[12px] text-[var(--graphite)] flex gap-2">
                  <Info className="h-4 w-4 shrink-0 text-[var(--steel)]" />
                  <p>{item.notes}</p>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--line)] bg-black/[0.015] px-4 py-3 flex gap-2">
              <button 
                onClick={() => handleStatusChange(item.id, "bestanden")}
                disabled={isPending}
                className="flex-1 rounded bg-[var(--volt)]/20 py-2 text-[12px] font-bold text-[var(--ink)] transition-colors hover:bg-[var(--volt)]/30 border border-[var(--volt)]/20"
              >
                Bestanden
              </button>
              <button 
                onClick={() => handleStatusChange(item.id, "risiko")}
                disabled={isPending}
                className="flex-1 rounded bg-[var(--red)]/10 py-2 text-[12px] font-bold text-[var(--red)] transition-colors hover:bg-[var(--red)]/20 border border-[var(--red)]/20"
              >
                Risiko melden
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function ComplianceItem({ label, checked, onToggle, disabled }: { label: string, checked: boolean, onToggle: () => void, disabled: boolean }) {
  return (
    <button 
      onClick={onToggle}
      disabled={disabled}
      className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-black/[0.03] text-left"
    >
      {checked ? (
        <CheckSquare className="h-4 w-4 text-[var(--volt)] shrink-0" />
      ) : (
        <Square className="h-4 w-4 text-[var(--line)] shrink-0" />
      )}
      <span className={`text-[13px] font-medium ${checked ? "text-[var(--ink)]" : "text-[var(--steel)]"}`}>
        {label}
      </span>
    </button>
  );
}
