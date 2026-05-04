"use client";

import { useState, useTransition } from "react";
import { Palette, MapPin, Shirt, Sun, Camera, Ban, UserCircle2, Save, Loader2 } from "lucide-react";
import type { PersonaVisualIdentity } from "@/src/lib/visual-identity-queries";
import { updatePersonaVisualIdentity } from "@/src/lib/visual-identity-actions";

export function VisualIdentityLab({ persona }: { persona: PersonaVisualIdentity }) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(persona);

  const handleSave = () => {
    startTransition(async () => {
      const res = await updatePersonaVisualIdentity(persona.id, {
        visualColorPalette: form.visualColorPalette || undefined,
        visualLocations: form.visualLocations || undefined,
        visualOutfitAnchors: form.visualOutfitAnchors || undefined,
        visualLightingLogic: form.visualLightingLogic || undefined,
        visualCameraDistance: form.visualCameraDistance || undefined,
        visualNoGoImages: form.visualNoGoImages || undefined,
        visualFaceConsistency: form.visualFaceConsistency || undefined,
        visualIdentity: form.visualIdentity || undefined,
      });
      if (res.success) {
        alert("Visual Identity erfolgreich gespeichert!");
      } else {
        alert("Fehler: " + res.error);
      }
    });
  };

  return (
    <div className="space-y-6">
      <section className="panel-dark subtle-grid overflow-hidden">
        <div className="p-4">
          <p className="font-mono text-[11px] font-semibold uppercase text-white/54">Branding Lab</p>
          <h2 className="mt-2 font-condensed text-[34px] font-bold leading-none tracking-normal text-white">
            Visual Code: {persona.publicName || persona.name}
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-white/66">
            Definiere die visuellen Leitplanken für die KI-Generierung. Je präziser diese Anker sind, desto konsistenter wird das gesamte Portfolio.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <IdentityField 
            icon={<Palette className="h-4 w-4" />} 
            label="Farbwelt & Palette" 
            value={form.visualColorPalette || ""} 
            onChange={(v) => setForm({...form, visualColorPalette: v})}
            placeholder="z.B. Pastell-Töne, Muted Earth, High Contrast Neon..."
          />
          <IdentityField 
            icon={<MapPin className="h-4 w-4" />} 
            label="Locations & Settings" 
            value={form.visualLocations || ""} 
            onChange={(v) => setForm({...form, visualLocations: v})}
            placeholder="z.B. Urban Modern, Minimalist Home, Luxury Beach..."
          />
          <IdentityField 
            icon={<Shirt className="h-4 w-4" />} 
            label="Outfit- & Stilanker" 
            value={form.visualOutfitAnchors || ""} 
            onChange={(v) => setForm({...form, visualOutfitAnchors: v})}
            placeholder="z.B. Oversized Streetwear, Silent Luxury, Tech-Wear..."
          />
           <IdentityField 
            icon={<Sun className="h-4 w-4" />} 
            label="Licht- & Schattenlogik" 
            value={form.visualLightingLogic || ""} 
            onChange={(v) => setForm({...form, visualLightingLogic: v})}
            placeholder="z.B. Golden Hour, Harsh Sunlight, Studio Softbox..."
          />
        </div>

        <div className="space-y-6">
          <IdentityField 
            icon={<Camera className="h-4 w-4" />} 
            label="Kameradistanz & Winkel" 
            value={form.visualCameraDistance || ""} 
            onChange={(v) => setForm({...form, visualCameraDistance: v})}
            placeholder="z.B. Close-up, Waist-up, Low Angle, Cinematic Wide..."
          />
          <IdentityField 
            icon={<UserCircle2 className="h-4 w-4" />} 
            label="Gesichtskonsistenz-Notiz" 
            value={form.visualFaceConsistency || ""} 
            onChange={(v) => setForm({...form, visualFaceConsistency: v})}
            placeholder="z.B. Markante Kieferpartie, Sommersprossen, Fokus auf Augen..."
          />
          <IdentityField 
            icon={<Ban className="h-4 w-4" />} 
            label="Visual No-Go's" 
            value={form.visualNoGoImages || ""} 
            onChange={(v) => setForm({...form, visualNoGoImages: v})}
            placeholder="z.B. Keine überladenen Hintergründe, kein Billig-Look..."
          />
          
          <div className="rounded-md border border-[var(--line)] bg-white p-4 shadow-sm">
            <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[var(--steel)] mb-3">
              <Save className="h-4 w-4" />
              Zusammenfassung / Prompt-Baustein
            </label>
            <textarea 
              className="w-full h-32 rounded border border-[var(--line)] bg-[var(--mist)] p-3 text-[13px] font-medium text-[var(--graphite)] focus:border-[var(--volt)] focus:outline-none"
              value={form.visualIdentity || ""}
              onChange={(e) => setForm({...form, visualIdentity: e.target.value})}
              placeholder="Hier fließen alle Anker in einen kurzen, prägnanten Visual-Identity-Block zusammen."
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 rounded bg-[var(--volt)] px-6 py-3 text-[15px] font-bold text-[var(--ink)] shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          Visual Code Speichern
        </button>
      </div>
    </div>
  );
}

function IdentityField({ icon, label, value, onChange, placeholder }: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  onChange: (v: string) => void,
  placeholder?: string
}) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-white p-4 shadow-sm">
      <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[var(--steel)] mb-2">
        {icon}
        {label}
      </label>
      <input 
        type="text" 
        className="w-full border-b border-[var(--line)] bg-transparent py-1 text-[15px] font-bold text-[var(--ink)] placeholder:text-[var(--line)] focus:border-[var(--volt)] focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
