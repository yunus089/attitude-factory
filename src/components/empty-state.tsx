import {
  ArrowRight,
  CircleAlert,
  Info,
  Lightbulb,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

type EmptyStateTone = "neutral" | "mentor" | "warning" | "danger";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const toneConfig: Record<
  EmptyStateTone,
  {
    icon: IconComponent;
    border: string;
    iconBox: string;
  }
> = {
  neutral: {
    icon: Info,
    border: "border-black/10",
    iconBox: "bg-black/[0.04] text-[var(--steel)]"
  },
  mentor: {
    icon: Lightbulb,
    border: "border-[var(--data-cyan)]/35",
    iconBox: "bg-[var(--data-cyan)]/10 text-[#116b94]"
  },
  warning: {
    icon: CircleAlert,
    border: "border-[var(--amber)]/45",
    iconBox: "bg-[var(--amber)]/14 text-[#8a580c]"
  },
  danger: {
    icon: ShieldAlert,
    border: "border-[var(--signal-red)]/35",
    iconBox: "bg-[var(--signal-red)]/10 text-[var(--signal-red)]"
  }
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  mentorNote,
  tone = "neutral"
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  mentorNote?: string;
  tone?: EmptyStateTone;
}) {
  const config = toneConfig[tone];
  const Icon = config.icon;

  return (
    <section
      className={`rounded-md border bg-white p-4 ${config.border}`}
      aria-label={title}
    >
      <div className="flex max-w-2xl items-start gap-3">
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${config.iconBox}`}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[16px] font-bold leading-snug text-[var(--ink)]">
            {title}
          </h3>
          <p className="mt-1 text-[13px] leading-5 text-[var(--steel)]">
            {description}
          </p>
          {mentorNote ? (
            <p className="mt-3 border-l-2 border-[var(--data-cyan)]/55 pl-3 text-[13px] leading-5 text-[var(--graphite)]">
              {mentorNote}
            </p>
          ) : null}
          {actionLabel && actionHref ? (
            <Link
              href={actionHref}
              className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--ink)] px-3.5 py-2 text-[13px] font-bold text-white hover:bg-[var(--graphite)]"
            >
              {actionLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
