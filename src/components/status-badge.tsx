type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info" | "active";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-black/10 bg-black/[0.035] text-[var(--graphite)]",
  success: "border-[var(--success)]/35 bg-[var(--success)]/10 text-[var(--success)]",
  warning: "border-[var(--amber)]/45 bg-[var(--amber)]/12 text-[#8a580c]",
  danger: "border-[var(--signal-red)]/35 bg-[var(--signal-red)]/10 text-[var(--signal-red)]",
  info: "border-[var(--data-cyan)]/35 bg-[var(--data-cyan)]/10 text-[#116b94]",
  active: "border-[var(--volt)]/70 bg-[var(--volt)]/20 text-[var(--ink)]"
};

export function StatusBadge({
  label,
  tone = "neutral"
}: {
  label: string;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-bold uppercase leading-none ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
