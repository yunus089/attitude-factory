import type { SignalRadarRow } from "@/src/domain/types";

const legend = [
  { label: "Gewinner/Ausbauen", color: "var(--volt)" },
  { label: "Info/Videoeinsatz", color: "var(--data-cyan)" },
  { label: "Risiko/Blockiert", color: "var(--signal-red)" },
  { label: "Noch kein Signal", color: "#a7afaa" }
];

export function SignalRadar({ rows }: { rows: SignalRadarRow[] }) {
  return (
    <section className="panel overflow-hidden">
      <div className="grid gap-3 px-4 py-3 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="font-condensed text-[24px] font-bold tracking-normal">
            Signalradar
          </h2>
          <p className="mt-1 text-[12px] font-medium text-[var(--steel)]">
            Legende: Farben zeigen, was als Nächstes passieren soll.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {legend.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--steel)]"
            >
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <div className="border-t border-[var(--line)] p-4">
        <div className="grid gap-2">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[128px_1fr] items-center gap-3 rounded-md border border-[var(--line)] bg-white p-2.5"
            >
              <div>
                <p className="text-[13px] font-bold text-[var(--ink)]">{row.label}</p>
                <p className="mt-1 text-[11px] font-semibold text-[var(--steel)]">
                  {row.persona}
                </p>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {row.days.map((day) => (
                  <div
                    key={`${row.id}-${day.day}`}
                    title={`${row.label}, Tag ${day.day}: ${day.label}`}
                    className="h-9 rounded-sm border border-black/10"
                    style={{ backgroundColor: day.color }}
                  >
                    <span className="sr-only">
                      Tag {day.day}: {day.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
