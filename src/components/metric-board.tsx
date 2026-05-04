"use client";

import { useState } from "react";
import { StatusBadge } from "@/src/components/status-badge";
import { MetricEntryForm } from "@/src/components/metric-entry-form";
import type { KennzahlenData, KennzahlenPostItem, MetricSnapshotRow } from "@/src/lib/metric-queries";

type Tab = "eintragen" | "uebersicht";

export function MetricBoard({ data }: { data: KennzahlenData }) {
  const [activeTab, setActiveTab] = useState<Tab>("eintragen");
  const [selectedPostId, setSelectedPostId] = useState<string | undefined>(
    data.posts.find((p) => !p.hasMetric)?.id ?? data.posts[0]?.id
  );

  const { posts, snapshots, summary, portfolioMedian, queryError } = data;

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Seitentitel */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--ink)]">
          Kennzahlen
        </h1>
        <p className="mt-1 text-sm text-[var(--steel)]">
          Likes sind Nebenrauschen. Saves, Shares, Follows und Profilbesuche lösen Entscheidungen aus.
        </p>
      </div>

      {/* Fehlermeldung DB */}
      {queryError && (
        <div
          role="alert"
          className="rounded-md border border-[var(--signal-red)]/30 bg-[var(--signal-red)]/8 px-4 py-3 text-sm text-[var(--signal-red)]"
        >
          Datenbankfehler: {queryError}
        </div>
      )}

      {/* Summary Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <SummaryCell label="Gepostet gesamt" value={summary.totalPosted} />
        <SummaryCell label="Mit Kennzahlen" value={summary.withMetrics} tone="success" />
        <SummaryCell label="Kennzahlen fehlen" value={summary.missingMetrics} tone={summary.missingMetrics > 0 ? "warning" : "neutral"} />
        <SummaryCell label="Gewinner-Signale" value={summary.winners} tone={summary.winners > 0 ? "active" : "neutral"} />
        <SummaryCell label="Schwache Signale" value={summary.weakSignals} tone={summary.weakSignals > 0 ? "danger" : "neutral"} />
      </div>

      {/* Portfolio-Median Info */}
      <div className="rounded-md border border-black/8 bg-[var(--mist)] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--steel)] mb-2">
          Portfolio-Median (aktuell)
        </p>
        <div className="flex flex-wrap gap-4">
          <MedianItem label="Saves/1k" value={portfolioMedian.savesPerThousand} />
          <MedianItem label="Shares/1k" value={portfolioMedian.sharesPerThousand} />
          <MedianItem label="Follows/1k" value={portfolioMedian.followsPerThousand} />
          <MedianItem label="Profilbesuche/1k" value={portfolioMedian.profileVisitsPerThousand} />
        </div>
        <p className="mt-2 text-[10px] text-[var(--steel)]">
          {snapshots.length < 3
            ? "Noch weniger als 3 Snapshots vorhanden — Basis-Schwellwerte aktiv. Median aktualisiert sich automatisch."
            : `Berechnet aus ${snapshots.length} Snapshots.`}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-black/10">
        <TabButton id="tab-eintragen" active={activeTab === "eintragen"} onClick={() => setActiveTab("eintragen")}>
          Kennzahlen eintragen
        </TabButton>
        <TabButton id="tab-uebersicht" active={activeTab === "uebersicht"} onClick={() => setActiveTab("uebersicht")}>
          Alle Snapshots ({snapshots.length})
        </TabButton>
      </div>

      {/* Tab: Eintragen */}
      {activeTab === "eintragen" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* Linke Seite: Postliste */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--steel)]">
              Gepostete Inhalte
            </p>
            {posts.length === 0 ? (
              <div className="rounded-md border border-black/8 bg-[var(--panel)] px-4 py-8 text-center">
                <p className="text-sm font-medium text-[var(--ink)]">Noch keine geposteten Inhalte.</p>
                <p className="mt-1 text-xs text-[var(--steel)]">
                  Inhalte müssen in Content-Produktion auf &ldquo;Gepostet&rdquo; gesetzt werden, bevor Kennzahlen eingetragen werden können.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    selected={selectedPostId === post.id}
                    onClick={() => setSelectedPostId(post.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Rechte Seite: Formular */}
          <div className="rounded-md border border-black/8 bg-[var(--panel)] p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--steel)]">
              Kennzahlen eintragen
            </p>
            <MetricEntryForm
              posts={posts}
              preselectedId={selectedPostId}
              onSuccess={() => {
                // nach Speichern zum nächsten fehlenden Post springen
                const nextMissing = posts.find((p) => !p.hasMetric && p.id !== selectedPostId);
                if (nextMissing) setSelectedPostId(nextMissing.id);
              }}
            />
          </div>
        </div>
      )}

      {/* Tab: Übersicht */}
      {activeTab === "uebersicht" && (
        <div>
          {snapshots.length === 0 ? (
            <div className="rounded-md border border-black/8 bg-[var(--panel)] px-4 py-8 text-center">
              <p className="text-sm font-medium text-[var(--ink)]">Noch keine Kennzahlen eingetragen.</p>
              <p className="mt-1 text-xs text-[var(--steel)]">
                Noch kein Kennzahlen-Snapshot. Ohne Reichweite, Saves und Follows kann die Maschine keine Gewinner erkennen.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Tabelle */}
              <div className="hidden md:block overflow-x-auto rounded-md border border-black/8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/8 bg-[var(--mist)]">
                      <Th>Persona</Th>
                      <Th>Hook</Th>
                      <Th>Datum</Th>
                      <Th>Reichweite</Th>
                      <Th>Saves/1k</Th>
                      <Th>Shares/1k</Th>
                      <Th>Follows/1k</Th>
                      <Th>Signal</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {snapshots.map((snap) => (
                      <tr key={snap.id} className="border-b border-black/5 hover:bg-[var(--mist)] transition-colors">
                        <td className="px-3 py-2.5">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                            style={{ backgroundColor: snap.personaColor }}
                          />
                          <span className="font-medium text-[var(--ink)]">{snap.personaShortName}</span>
                        </td>
                        <td className="px-3 py-2.5 max-w-[240px]">
                          <span className="text-[var(--ink)] line-clamp-1">{snap.hook}</span>
                        </td>
                        <Td mono>{snap.capturedAt}</Td>
                        <Td mono>{snap.reach.toLocaleString("de-DE")}</Td>
                        <Td mono>{rateDisplay(snap.rates.savesPerThousand)}</Td>
                        <Td mono>{rateDisplay(snap.rates.sharesPerThousand)}</Td>
                        <Td mono>{rateDisplay(snap.rates.followsPerThousand)}</Td>
                        <td className="px-3 py-2.5">
                          <div className="flex flex-col gap-0.5">
                            <StatusBadge label={snap.signalLabel} tone={snap.signalTone} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Karten */}
              <div className="flex flex-col gap-3 md:hidden">
                {snapshots.map((snap) => (
                  <MobileSnapshotCard key={snap.id} snap={snap} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Sub-Komponenten ─────────────────────────────────────────────────────────

function PostCard({
  post,
  selected,
  onClick
}: {
  post: KennzahlenPostItem;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-md border px-3 py-3 transition-colors ${
        selected
          ? "border-[var(--ink)]/30 bg-[var(--ink)]/5"
          : "border-black/8 bg-[var(--panel)] hover:bg-[var(--mist)]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full"
            style={{ backgroundColor: post.personaColor }}
          />
          <span className="text-xs font-semibold text-[var(--ink)]">{post.personaShortName}</span>
          <span className="text-xs text-[var(--steel)]">{post.formatLabel}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <StatusBadge label={post.statusLabel} tone={post.statusTone} />
          {post.hasMetric && (
            <span className="text-[10px] font-bold text-[var(--steel)] uppercase tracking-wide">✓</span>
          )}
        </div>
      </div>
      <p className="mt-1.5 text-[13px] text-[var(--ink)] line-clamp-2 pl-4">{post.hook}</p>
      {post.latestSnapshot && (
        <div className="mt-2 flex gap-3 pl-4 font-mono text-[11px] text-[var(--steel)]">
          <span>Saves {rateDisplay(post.latestSnapshot.rates.savesPerThousand)}/1k</span>
          <span>Shares {rateDisplay(post.latestSnapshot.rates.sharesPerThousand)}/1k</span>
          <span>Follows {rateDisplay(post.latestSnapshot.rates.followsPerThousand)}/1k</span>
        </div>
      )}
    </button>
  );
}

function MobileSnapshotCard({ snap }: { snap: MetricSnapshotRow }) {
  return (
    <div className="rounded-md border border-black/8 bg-[var(--panel)] px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 flex-shrink-0 rounded-full"
            style={{ backgroundColor: snap.personaColor }}
          />
          <span className="text-sm font-semibold text-[var(--ink)]">{snap.personaShortName}</span>
          <span className="font-mono text-xs text-[var(--steel)]">{snap.capturedAt}</span>
        </div>
        <StatusBadge label={snap.signalLabel} tone={snap.signalTone} />
      </div>
      <p className="mt-1.5 text-[13px] text-[var(--ink)] line-clamp-2">{snap.hook}</p>
      <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-xs">
        <div>
          <p className="text-[var(--steel)] text-[10px] uppercase tracking-wide">Reichweite</p>
          <p className="text-[var(--ink)] font-semibold">{snap.reach.toLocaleString("de-DE")}</p>
        </div>
        <div>
          <p className="text-[var(--steel)] text-[10px] uppercase tracking-wide">Saves/1k</p>
          <p className="text-[var(--ink)] font-semibold">{rateDisplay(snap.rates.savesPerThousand)}</p>
        </div>
        <div>
          <p className="text-[var(--steel)] text-[10px] uppercase tracking-wide">Shares/1k</p>
          <p className="text-[var(--ink)] font-semibold">{rateDisplay(snap.rates.sharesPerThousand)}</p>
        </div>
        <div>
          <p className="text-[var(--steel)] text-[10px] uppercase tracking-wide">Follows/1k</p>
          <p className="text-[var(--ink)] font-semibold">{rateDisplay(snap.rates.followsPerThousand)}</p>
        </div>
        <div>
          <p className="text-[var(--steel)] text-[10px] uppercase tracking-wide">Profil/1k</p>
          <p className="text-[var(--ink)] font-semibold">{rateDisplay(snap.rates.profileVisitsPerThousand)}</p>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-[var(--steel)] leading-snug">{snap.reason}</p>
      <p className="mt-1 text-[11px] font-medium text-[var(--ink)]">→ {snap.nextAction}</p>
    </div>
  );
}

function SummaryCell({
  label,
  value,
  tone
}: {
  label: string;
  value: number;
  tone?: "neutral" | "success" | "warning" | "danger" | "active";
}) {
  const colorMap = {
    neutral: "text-[var(--ink)]",
    success: "text-[var(--success)]",
    warning: "text-[#8a580c]",
    danger: "text-[var(--signal-red)]",
    active: "text-[var(--ink)]"
  };
  const color = tone ? colorMap[tone] : colorMap.neutral;

  return (
    <div className="rounded-md border border-black/8 bg-[var(--panel)] px-3 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--steel)]">{label}</p>
      <p className={`mt-1 font-mono text-2xl font-bold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}

function MedianItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-mono text-base font-bold tabular-nums text-[var(--ink)]">{value}</span>
      <span className="text-[11px] text-[var(--steel)]">{label}</span>
    </div>
  );
}

function TabButton({
  id,
  active,
  onClick,
  children
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
        active
          ? "border-[var(--ink)] text-[var(--ink)]"
          : "border-transparent text-[var(--steel)] hover:text-[var(--ink)]"
      }`}
      role="tab"
      aria-selected={active}
    >
      {children}
    </button>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wide text-[var(--steel)]">
      {children}
    </th>
  );
}

function Td({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <td className={`px-3 py-2.5 text-[var(--ink)] ${mono ? "font-mono tabular-nums" : ""}`}>
      {children}
    </td>
  );
}

function rateDisplay(rate: number | null): string {
  if (rate === null) return "—";
  return rate.toFixed(1);
}
