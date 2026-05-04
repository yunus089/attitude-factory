"use client";

import {
  BarChart3,
  ClipboardCheck,
  FlaskConical,
  Image,
  LayoutDashboard,
  Library,
  Radar,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/kommandozentrale", label: "Kommandozentrale", icon: LayoutDashboard },
  { href: "/30-tage-kommando", label: "30-Tage-Kommando", icon: Target },
  { href: "/personas", label: "Personas", icon: Users },
  { href: "/content-produktion", label: "Content-Produktion", icon: ClipboardCheck },
  { href: "/medien", label: "Medien", icon: Image },
  { href: "/recherche", label: "Recherche", icon: Library },
  { href: "/experimente", label: "Experimente", icon: FlaskConical },
  { href: "/kennzahlen", label: "Kennzahlen", icon: BarChart3 },
  { href: "/angebots-check", label: "Angebots-Check", icon: Sparkles },
  { href: "/regelcheck", label: "Regelcheck", icon: ShieldCheck }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--mist)]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[268px] border-r border-black/15 bg-[var(--ink)] text-white lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md border border-white/20 bg-white/5">
              <Radar className="h-5 w-5 text-[var(--volt)]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-condensed text-[18px] font-bold uppercase leading-none tracking-normal">
                Attitude Factory
              </p>
              <p className="mt-1 text-[12px] font-medium text-white/58">
                Operator OS
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring group flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/64 hover:bg-white/6 hover:text-white"
                }`}
              >
                <span
                  className={`h-5 w-1 rounded-full ${
                    active ? "bg-[var(--volt)]" : "bg-transparent"
                  }`}
                  aria-hidden="true"
                />
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-5 py-4">
          <Link
            href="/einstellungen"
            className="focus-ring flex items-center gap-3 text-[13px] font-semibold text-white/64 hover:text-white"
          >
            <Settings className="h-4 w-4" aria-hidden="true" />
            Einstellungen
          </Link>
        </div>
      </aside>

      <div className="lg:pl-[268px]">
        <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--mist)]/94 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-condensed text-[28px] font-bold leading-none tracking-normal text-[var(--ink)]">
                Kommandozentrale
              </h1>
              <p className="mt-1 text-[13px] font-medium text-[var(--steel)]">
                Tageslage der Maschine: Produktion, Signale, Blocker.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill label="Tag 1 / 30" tone="active" />
              <StatusPill label="6 aktive Personas" />
              <StatusPill label="20 im Portfolio" />
              <StatusPill label="2 Operator" />
              <StatusPill label="Letzte Kennzahlen: offen" tone="warning" />
            </div>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`focus-ring shrink-0 rounded-md border px-3 py-2 text-[12px] font-semibold ${
                    active
                      ? "border-[var(--volt)] bg-white text-[var(--ink)] shadow-[inset_0_0_0_1px_var(--volt)]"
                      : "border-black/10 bg-white text-[var(--graphite)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <div className="px-4 py-4 md:px-6">{children}</div>
      </div>
    </div>
  );
}

function StatusPill({
  label,
  tone = "default"
}: {
  label: string;
  tone?: "default" | "active" | "warning";
}) {
  const toneClass = {
    default: "border-black/10 bg-white text-[var(--ink)]",
    active: "border-[var(--volt)]/80 bg-[var(--volt)]/20 text-[var(--ink)]",
    warning: "border-[var(--amber)]/70 bg-[var(--amber)]/18 text-[var(--ink)]"
  }[tone];

  return (
    <span
      className={`rounded-md border px-2.5 py-1 text-[12px] font-semibold ${toneClass}`}
    >
      {label}
    </span>
  );
}
