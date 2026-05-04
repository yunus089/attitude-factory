"use client";

import { useRef, useState } from "react";
import { saveMetricSnapshot } from "@/src/lib/metric-actions";
import type { KennzahlenPostItem } from "@/src/lib/metric-queries";

type Props = {
  posts: KennzahlenPostItem[];
  preselectedId?: string;
  onSuccess?: () => void;
};

type FieldDef = {
  key: keyof FormValues;
  label: string;
  hint: string;
  primary: boolean;
};

type FormValues = {
  contentItemId: string;
  capturedAt: string;
  impressions: number | "";
  reach: number | "";
  likes: number | "";
  comments: number | "";
  saves: number | "";
  shares: number | "";
  profileVisits: number | "";
  follows: number | "";
  linkClicks: number | "";
  notes: string;
};

const METRIC_FIELDS: FieldDef[] = [
  { key: "reach", label: "Reichweite", hint: "Personen, die den Beitrag gesehen haben", primary: true },
  { key: "impressions", label: "Impressionen", hint: "Gesamtanzahl der Anzeigen (inkl. Mehrfach)", primary: false },
  { key: "saves", label: "Saves", hint: "Gespeicherte Beiträge — primäres Signal", primary: true },
  { key: "shares", label: "Shares", hint: "Weiterleitungen — primäres Signal", primary: true },
  { key: "follows", label: "Neue Follower", hint: "Neue Follower durch diesen Beitrag", primary: true },
  { key: "profileVisits", label: "Profilbesuche", hint: "Profilbesuche ausgelöst durch diesen Beitrag", primary: true },
  { key: "likes", label: "Likes", hint: "Sekundäres Signal", primary: false },
  { key: "comments", label: "Kommentare", hint: "Sekundäres Signal", primary: false },
  { key: "linkClicks", label: "Link-Klicks", hint: "Sekundäres Signal — relevant ab Woche 3+", primary: false }
];

function todayIso() {
  return new Date().toISOString().split("T")[0]!;
}

export function MetricEntryForm({ posts, preselectedId, onSuccess }: Props) {
  const [values, setValues] = useState<FormValues>({
    contentItemId: preselectedId ?? posts[0]?.id ?? "",
    capturedAt: todayIso(),
    impressions: "",
    reach: "",
    likes: "",
    comments: "",
    saves: "",
    shares: "",
    profileVisits: "",
    follows: "",
    linkClicks: "",
    notes: ""
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const selectedPost = posts.find((p) => p.id === values.contentItemId);

  function handleChange(key: keyof FormValues, raw: string) {
    setError(null);
    setSuccessMsg(null);

    if (key === "contentItemId" || key === "capturedAt" || key === "notes") {
      setValues((prev) => ({ ...prev, [key]: raw }));
      return;
    }

    if (raw === "") {
      setValues((prev) => ({ ...prev, [key]: "" }));
      return;
    }

    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 0) {
      setValues((prev) => ({ ...prev, [key]: num }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const numericFields: Array<keyof FormValues> = [
      "impressions", "reach", "likes", "comments", "saves",
      "shares", "profileVisits", "follows", "linkClicks"
    ];

    for (const field of numericFields) {
      if (values[field] === "") {
        const def = METRIC_FIELDS.find((f) => f.key === field);
        setError(`${def?.label ?? field}: Bitte einen Wert eintragen. Wenn der Wert 0 ist, bitte 0 eintragen.`);
        return;
      }
    }

    setPending(true);
    const result = await saveMetricSnapshot({
      contentItemId: values.contentItemId,
      capturedAt: values.capturedAt,
      impressions: values.impressions as number,
      reach: values.reach as number,
      likes: values.likes as number,
      comments: values.comments as number,
      saves: values.saves as number,
      shares: values.shares as number,
      profileVisits: values.profileVisits as number,
      follows: values.follows as number,
      linkClicks: values.linkClicks as number,
      notes: values.notes || undefined
    });
    setPending(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSuccessMsg("Kennzahlen eingetragen. Entscheidungssignal aktualisiert.");

    // Reset Zahlfelder, behalte Auswahl und Datum
    setValues((prev) => ({
      ...prev,
      impressions: "",
      reach: "",
      likes: "",
      comments: "",
      saves: "",
      shares: "",
      profileVisits: "",
      follows: "",
      linkClicks: "",
      notes: ""
    }));

    onSuccess?.();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      id="metric-entry-form"
      className="flex flex-col gap-5"
      aria-label="Kennzahlen eintragen"
      noValidate
    >
      {/* Content-Auswahl */}
      <div className="flex flex-col gap-1">
        <label htmlFor="metric-content-select" className="text-xs font-semibold text-[var(--steel)] uppercase tracking-wide">
          Content-Slot
        </label>
        <select
          id="metric-content-select"
          value={values.contentItemId}
          onChange={(e) => handleChange("contentItemId", e.target.value)}
          className="w-full rounded-md border border-black/10 bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink)] font-mono focus:outline-none focus:ring-2 focus:ring-[var(--data-cyan)]/50"
          required
        >
          {posts.length === 0 ? (
            <option value="">Keine geposteten Inhalte</option>
          ) : (
            posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.personaShortName} – {truncate(post.hook, 55)}
                {post.hasMetric ? " ✓" : ""}
              </option>
            ))
          )}
        </select>
        {selectedPost && (
          <p className="text-[11px] text-[var(--steel)] mt-0.5">
            {selectedPost.personaName} · {selectedPost.formatLabel} ·{" "}
            {selectedPost.postedAt ? `Gepostet ${selectedPost.postedAt}` : selectedPost.plannedDateLabel}
            {selectedPost.hasMetric && " · Bereits Kennzahlen vorhanden — neuer Snapshot wird gespeichert"}
          </p>
        )}
      </div>

      {/* Erfassungsdatum */}
      <div className="flex flex-col gap-1">
        <label htmlFor="metric-captured-at" className="text-xs font-semibold text-[var(--steel)] uppercase tracking-wide">
          Erfassungsdatum
        </label>
        <input
          id="metric-captured-at"
          type="date"
          value={values.capturedAt}
          onChange={(e) => handleChange("capturedAt", e.target.value)}
          className="w-full rounded-md border border-black/10 bg-[var(--panel)] px-3 py-2 text-sm font-mono text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--data-cyan)]/50"
          required
        />
        <p className="text-[11px] text-[var(--steel)]">
          Datum der Ablessung aus Instagram Insights (meist 24h, 3 Tage oder 7 Tage nach Posting)
        </p>
      </div>

      {/* Primäre Metriken */}
      <div>
        <p className="text-xs font-semibold text-[var(--steel)] uppercase tracking-wide mb-3">
          Primäre Signale
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {METRIC_FIELDS.filter((f) => f.primary).map((field) => (
            <MetricNumberField
              key={field.key}
              fieldKey={field.key}
              label={field.label}
              hint={field.hint}
              value={values[field.key] as number | ""}
              onChange={(val) => handleChange(field.key, val)}
            />
          ))}
        </div>
      </div>

      {/* Sekundäre Metriken */}
      <div>
        <p className="text-xs font-semibold text-[var(--steel)] uppercase tracking-wide mb-3">
          Sekundäre Signale
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {METRIC_FIELDS.filter((f) => !f.primary).map((field) => (
            <MetricNumberField
              key={field.key}
              fieldKey={field.key}
              label={field.label}
              hint={field.hint}
              value={values[field.key] as number | ""}
              onChange={(val) => handleChange(field.key, val)}
            />
          ))}
        </div>
      </div>

      {/* Notiz */}
      <div className="flex flex-col gap-1">
        <label htmlFor="metric-notes" className="text-xs font-semibold text-[var(--steel)] uppercase tracking-wide">
          Notiz <span className="font-normal normal-case">(optional)</span>
        </label>
        <textarea
          id="metric-notes"
          value={values.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Auffälligkeiten, Vergleichswerte, Kontext..."
          rows={2}
          className="w-full resize-none rounded-md border border-black/10 bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--steel)] focus:outline-none focus:ring-2 focus:ring-[var(--data-cyan)]/50"
        />
      </div>

      {/* Fehlermeldung */}
      {error && (
        <div
          role="alert"
          className="rounded-md border border-[var(--signal-red)]/30 bg-[var(--signal-red)]/8 px-3 py-2 text-sm text-[var(--signal-red)]"
        >
          {error}
        </div>
      )}

      {/* Erfolgsmeldung */}
      {successMsg && (
        <div
          role="status"
          className="rounded-md border border-[var(--volt)]/40 bg-[var(--volt)]/12 px-3 py-2 text-sm text-[var(--ink)] font-medium"
        >
          {successMsg}
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end pt-1">
        <button
          type="submit"
          id="metric-entry-submit"
          disabled={pending || posts.length === 0}
          className="rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Wird gespeichert…" : "Kennzahlen eintragen"}
        </button>
      </div>
    </form>
  );
}

// ─── Einzel-Zahlenfeld ───────────────────────────────────────────────────────

function MetricNumberField({
  fieldKey,
  label,
  hint,
  value,
  onChange
}: {
  fieldKey: string;
  label: string;
  hint: string;
  value: number | "";
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={`metric-${fieldKey}`}
        className="text-[11px] font-semibold text-[var(--ink)] uppercase tracking-wide"
      >
        {label}
      </label>
      <input
        id={`metric-${fieldKey}`}
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full rounded-md border border-black/10 bg-[var(--panel)] px-3 py-2 font-mono text-sm text-[var(--ink)] tabular-nums placeholder:text-[var(--steel)] focus:outline-none focus:ring-2 focus:ring-[var(--data-cyan)]/50"
        aria-describedby={`metric-${fieldKey}-hint`}
      />
      <p id={`metric-${fieldKey}-hint`} className="text-[10px] text-[var(--steel)] leading-snug">
        {hint}
      </p>
    </div>
  );
}

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}
