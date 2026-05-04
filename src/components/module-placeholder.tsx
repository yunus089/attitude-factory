import { EmptyState } from "@/src/components/empty-state";

export function ModulePlaceholder({
  title,
  status
}: {
  title: string;
  status: string;
}) {
  return (
    <main className="panel min-h-[420px] p-5">
      <p className="font-mono text-[11px] font-semibold uppercase text-[var(--steel)]">
        Modul
      </p>
      <h2 className="mt-2 font-condensed text-[40px] font-bold leading-none tracking-normal">
        {title}
      </h2>
      <div className="mt-5">
        <EmptyState
          title={`${title} wird vorbereitet`}
          description={status}
          mentorNote="Dieses Modul bleibt sichtbar, damit die Produktstruktur beim Aufbau nicht aus dem Blick rutscht."
          actionLabel="Zur Kommandozentrale"
          actionHref="/kommandozentrale"
          tone="mentor"
        />
      </div>
    </main>
  );
}
