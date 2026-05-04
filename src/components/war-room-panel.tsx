import { ArrowUpRight, CalendarClock, Gauge, Video } from "lucide-react";
import type { WarRoomSummary } from "@/src/domain/types";

export function WarRoomPanel({ warRoom }: { warRoom: WarRoomSummary }) {
  return (
    <section className="panel-dark subtle-grid overflow-hidden">
      <div className="grid gap-4 p-4 md:grid-cols-[1fr_0.95fr] xl:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-white/54">
              30-Tage-Kommando
            </p>
            <h2 className="mt-2 max-w-2xl font-condensed text-[34px] font-bold leading-[0.98] tracking-normal text-white md:text-[44px]">
              {warRoom.title}
            </h2>
            <p className="mt-3 max-w-xl text-[14px] leading-6 text-white/66">
              {warRoom.briefing}
            </p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
            {warRoom.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-white/10 bg-white/[0.055] p-3"
              >
                <p className="font-mono text-[20px] font-semibold leading-none text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase text-white/48">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-white/10 bg-white/[0.06] p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase text-white/50">
                Nächste Entscheidung
              </p>
              <p className="mt-1 text-[16px] font-semibold text-white">
                {warRoom.nextDecision}
              </p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--volt)] text-[var(--ink)]">
              <CalendarClock className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <SignalLine icon={Gauge} label="Aktueller Gewinner" value={warRoom.currentWinner} />
            <SignalLine icon={ArrowUpRight} label="Schwächste Spur" value={warRoom.weakestLane} />
            <SignalLine icon={Video} label="Videoeinsätze" value={warRoom.videoPolicy} />
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-[12px] font-semibold text-white/64">
              <span>Fortschritt</span>
              <span>{warRoom.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/12">
              <div
                className="h-full rounded-full bg-[var(--volt)]"
                style={{ width: `${warRoom.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalLine({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-white/10 bg-black/15 px-3 py-2.5">
      <Icon className="h-4 w-4 text-[var(--volt)]" aria-hidden="true" />
      <div>
        <p className="text-[11px] font-semibold uppercase text-white/46">{label}</p>
        <p className="mt-0.5 text-[13px] font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
