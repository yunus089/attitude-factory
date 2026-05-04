"use client";

import { Upload } from "lucide-react";
import { useState } from "react";
import { useActionState } from "react";

import { uploadPostMaterialAsset, type PostMaterialUploadState } from "@/src/lib/post-material-actions";

const initialPostMaterialUploadState: PostMaterialUploadState = {
  status: "idle",
  message: null
};

export function PostMaterialUploadForm({ contentItemId }: { contentItemId: string }) {
  const [state, formAction, pending] = useActionState(
    uploadPostMaterialAsset,
    initialPostMaterialUploadState
  );
  const [selectedFileName, setSelectedFileName] = useState("Keine Datei gewählt");

  return (
    <form action={formAction} className="min-w-[240px] space-y-2">
      <input type="hidden" name="contentItemId" value={contentItemId} />

      <div className="grid gap-2 xl:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-bold uppercase text-[var(--steel)]">Materialtyp</span>
          <select
            name="assetType"
            aria-label="Materialtyp"
            defaultValue="POSTBILD"
            className="focus-ring mt-1 min-h-10 w-full rounded-md border border-[var(--line)] bg-white px-2 text-[12px] font-semibold text-[var(--ink)]"
          >
            <option value="POSTBILD">Postbild</option>
            <option value="CAROUSEL_SLIDE">Carousel-Slide</option>
            <option value="KURZVIDEO">Kurzvideo</option>
          </select>
        </label>

        <label className="block">
          <span className="text-[11px] font-bold uppercase text-[var(--steel)]">Materialstatus</span>
          <select
            name="assetStatus"
            aria-label="Materialstatus"
            defaultValue="KANDIDAT"
            className="focus-ring mt-1 min-h-10 w-full rounded-md border border-[var(--line)] bg-white px-2 text-[12px] font-semibold text-[var(--ink)]"
          >
            <option value="KANDIDAT">Kandidat</option>
            <option value="FREIGEGEBENES_POST_MATERIAL">Postmaterial frei</option>
            <option value="BEARBEITEN">Bearbeiten</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-[11px] font-bold uppercase text-[var(--steel)]">Postmaterial-Datei</span>
        <input
          name="file"
          aria-label="Postmaterial-Datei"
          type="file"
          accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
          className="sr-only"
          onChange={(event) => {
            setSelectedFileName(event.currentTarget.files?.[0]?.name ?? "Keine Datei gewählt");
          }}
        />
        <span className="focus-ring mt-1 grid min-h-10 cursor-pointer grid-cols-[auto_1fr] items-center gap-3 rounded-md border border-dashed border-[var(--line)] bg-black/[0.018] px-2 py-2 text-[12px] font-semibold text-[var(--graphite)]">
          <span className="rounded-md bg-[var(--ink)] px-2 py-1 text-[11px] font-bold text-white">
            Datei wählen
          </span>
          <span className="min-w-0 truncate">{selectedFileName}</span>
        </span>
      </label>

      <label className="block">
        <span className="text-[11px] font-bold uppercase text-[var(--steel)]">Materialnotiz</span>
        <input
          name="notes"
          aria-label="Materialnotiz"
          type="text"
          placeholder="z.B. Cover V1, Prompt aus Leonardo"
          className="focus-ring mt-1 min-h-10 w-full rounded-md border border-[var(--line)] bg-white px-2 text-[12px] font-medium text-[var(--ink)] placeholder:text-[var(--steel)]/62"
        />
      </label>

      {state.message ? (
        <p
          className={`rounded-md border px-2 py-1.5 text-[12px] font-semibold ${
            state.status === "success"
              ? "border-[var(--success)]/35 bg-[var(--success)]/10 text-[var(--success)]"
              : "border-[var(--signal-red)]/35 bg-[var(--signal-red)]/10 text-[var(--signal-red)]"
          }`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="focus-ring inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-3 py-2 text-[12px] font-bold text-white transition hover:bg-[var(--graphite)] disabled:cursor-not-allowed disabled:opacity-65"
      >
        <Upload className="h-4 w-4" aria-hidden="true" />
        {pending ? "Speichern..." : "Material speichern"}
      </button>
    </form>
  );
}
