import { LoginForm } from "@/src/components/login-form";
import { Activity, LockKeyhole, Radar, ShieldCheck } from "lucide-react";

const systemFacts = [
  { label: "Zugang", value: "Privat" },
  { label: "Registrierung", value: "geschlossen" },
  { label: "Teststatus", value: "30 Tage vorbereitet" },
  { label: "Aktive Lanes", value: "6 Startwellen" }
];

export default function AnmeldenPage() {
  return (
    <main className="min-h-screen bg-[var(--mist)] px-4 py-4 md:px-6 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-6 lg:py-8">
      <section className="panel-dark subtle-grid flex flex-col justify-between overflow-hidden p-4 md:p-5 lg:min-h-[calc(100vh-64px)] lg:p-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md border border-white/18 bg-white/6">
              <Radar className="h-5 w-5 text-[var(--volt)]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-condensed text-[22px] font-bold uppercase leading-none text-white">
                Attitude Factory
              </p>
              <p className="mt-1 text-[13px] font-semibold text-white/58">
                Operator OS
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-xl lg:mt-10">
            <p className="font-mono text-[11px] font-semibold uppercase text-white/50">
              Private Kontrollraum-Schleuse
            </p>
            <h1 className="mt-3 font-condensed text-[38px] font-bold leading-[0.98] tracking-normal text-white md:text-[58px]">
              Zugang zur Maschine.
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-6 text-white/66">
              Dieser Bereich ist nur für Gründer und Operator freigegeben. Keine
              öffentliche Registrierung, keine externe Ansicht.
            </p>
          </div>
        </div>

        <div className="mt-8 hidden gap-3 sm:grid md:grid-cols-2 lg:mt-10">
          {systemFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-md border border-white/10 bg-white/[0.055] p-3"
            >
              <p className="font-mono text-[10px] font-semibold uppercase text-white/42">
                {fact.label}
              </p>
              <p className="mt-1 text-[14px] font-bold text-white">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 flex items-center justify-center lg:mt-0">
        <div className="panel w-full max-w-[520px] p-5 md:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase text-[var(--steel)]">
                Privater Zugang
              </p>
              <h2 className="mt-2 font-condensed text-[30px] font-bold leading-none tracking-normal text-[var(--ink)] md:text-[34px]">
                Anmelden
              </h2>
              <p className="mt-2 text-[14px] leading-5 text-[var(--steel)]">
                Zugang nur für aktive Nutzer mit freigegebener Rolle.
              </p>
            </div>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-[var(--volt)]/22 text-[var(--ink)]">
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>

          <LoginForm />

          <div className="mt-5 grid gap-2 border-t border-[var(--line)] pt-4">
            <StatusLine icon={ShieldCheck} text="Keine öffentliche Registrierung" />
            <StatusLine icon={Activity} text="Sessions laufen über Better Auth" />
          </div>
        </div>
      </section>
    </main>
  );
}

function StatusLine({
  icon: Icon,
  text
}: {
  icon: typeof ShieldCheck;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--steel)]">
      <Icon className="h-4 w-4 text-[var(--success)]" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
