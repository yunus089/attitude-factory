import type { MetricStripItem } from "@/src/domain/types";

export function MetricStrip({ metrics }: { metrics: MetricStripItem[] }) {
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
      {metrics.map((metric) => (
        <article key={metric.label} className="panel p-3">
          <p className="font-mono text-[22px] font-semibold leading-none text-[var(--ink)]">
            {metric.value}
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-[12px] font-semibold text-[var(--steel)]">
              {metric.label}
            </p>
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: metric.color }}
              aria-hidden="true"
            />
          </div>
        </article>
      ))}
    </section>
  );
}
