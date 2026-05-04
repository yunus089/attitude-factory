"use client";

import { ArrowRight, CircleAlert, KeyRound, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { signIn } from "@/src/lib/auth-client";

export function LoginForm() {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: "/kommandozentrale"
      });

      if (result.error) {
        setErrorMessage("Anmeldung fehlgeschlagen. E-Mail oder Passwort prüfen.");
        setState("error");
        return;
      }

      router.push("/kommandozentrale");
      router.refresh();
    } catch {
      setErrorMessage(
        "Anmeldung konnte nicht abgeschlossen werden. Prüfe Server und Datenbank."
      );
      setState("error");
    }
  }

  const loading = state === "loading";

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-[13px] font-bold text-[var(--ink)]">E-Mail</span>
        <span className="mt-1 flex min-h-11 items-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 focus-within:border-[var(--data-cyan)] focus-within:ring-2 focus-within:ring-[var(--data-cyan)]/18">
          <Mail className="h-4 w-4 text-[var(--steel)]" aria-hidden="true" />
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@attitude-factory.com"
            className="min-w-0 flex-1 border-0 bg-transparent py-2 text-[14px] font-medium text-[var(--ink)] outline-none placeholder:text-[var(--steel)]/62"
          />
        </span>
      </label>

      <label className="block">
        <span className="text-[13px] font-bold text-[var(--ink)]">Passwort</span>
        <span className="mt-1 flex min-h-11 items-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 focus-within:border-[var(--data-cyan)] focus-within:ring-2 focus-within:ring-[var(--data-cyan)]/18">
          <KeyRound className="h-4 w-4 text-[var(--steel)]" aria-hidden="true" />
          <input
            required
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Passwort eingeben"
            className="min-w-0 flex-1 border-0 bg-transparent py-2 text-[14px] font-medium text-[var(--ink)] outline-none placeholder:text-[var(--steel)]/62"
          />
        </span>
      </label>

      {state === "error" ? (
        <div
          className="flex items-start gap-2 rounded-md border border-[var(--amber)]/45 bg-[var(--amber)]/12 px-3 py-2 text-[13px] leading-5 text-[#7a500c]"
          role="alert"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-4 py-2.5 text-[14px] font-bold text-white transition hover:bg-[var(--graphite)] disabled:cursor-not-allowed disabled:opacity-68"
      >
        {loading ? "Anmeldung läuft..." : "Anmelden"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
