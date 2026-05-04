"use client";

import { CheckCircle2, Clock, PlayCircle, Target, Trophy, AlertTriangle } from "lucide-react";
import type { WarRoomSummary } from "@/src/domain/types";

export function WarRoomDetail({ warRoom, progress }: { warRoom: WarRoomSummary; progress: number }) {
  const currentDay = Math.floor((progress / 100) * 30);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="panel-dark subtle-grid overflow-hidden p-6">
        <div className="max-w-3xl">
          <p className="font-mono text-[13px] font-semibold uppercase text-[var(--volt)]">
            Mission Briefing
          </p>
          <h1 className="mt-3 font-condensed text-[40px] font-bold leading-[0.98] tracking-normal text-white md:text-[52px]">
            {warRoom.title}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-white/70">
            {warRoom.briefing} Die Regel ist simpel: Keine Ausreden, keine Eitelkeitsmetriken. Nur deterministische Tests.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {warRoom.stats.map((stat) => (
            <div key={stat.label} className="rounded-md border border-white/10 bg-white/5 p-4">
              <p className="font-mono text-[24px] font-bold leading-none text-white">{stat.value}</p>
              <p className="mt-2 text-[12px] font-semibold uppercase text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        {/* Timeline */}
        <section className="panel p-6">
          <h2 className="font-condensed text-[24px] font-bold tracking-normal mb-6">
            30-Tage Zeitleiste
          </h2>
          
          <div className="relative border-l-2 border-black/10 ml-3 pl-6 space-y-8">
            <TimelinePhase 
              title="Tag 1–7: Basis-Traktion"
              status={currentDay >= 7 ? "done" : currentDay > 0 ? "active" : "waiting"}
              description="Jede Persona muss mindestens 2 Posts live haben. Erste Saves und Shares als Basis."
              icon={PlayCircle}
            />
            
            <TimelinePhase 
              title="Tag 14: Portfolio-Check"
              status={currentDay >= 14 ? "done" : currentDay >= 7 ? "active" : "waiting"}
              description="Erste harte Entscheidung. Die am schlechtesten performende Lane wird eingefroren. Fokus auf die Top 3."
              icon={Target}
              isMilestone
            />
            
            <TimelinePhase 
              title="Tag 15–21: Video-Einskalierung"
              status={currentDay >= 21 ? "done" : currentDay >= 14 ? "active" : "waiting"}
              description="Die Top-Themen werden in Video-Formate übersetzt. Reichweite aufbauen."
              icon={Clock}
            />
            
            <TimelinePhase 
              title="Tag 30: Finale Auswertung"
              status={currentDay >= 30 ? "done" : currentDay >= 21 ? "active" : "waiting"}
              description="Entscheidung über das dauerhafte Setup. Wer bleibt, wer fliegt, welches Format skaliert."
              icon={Trophy}
              isMilestone
            />
          </div>
        </section>

        {/* Action Blocks */}
        <div className="space-y-6">
           <section className="panel p-5 bg-[var(--mist)]">
             <div className="flex items-center gap-2 mb-4">
               <AlertTriangle className="h-5 w-5 text-[var(--signal-red)]" />
               <h3 className="font-bold text-[16px] text-[var(--ink)]">Tag 14 Check (Upcoming)</h3>
             </div>
             <p className="text-[13px] text-[var(--graphite)] leading-relaxed mb-4">
               Am 14. Tag entscheidet der Algorithmus hart: Eine Persona wird auf Basis des Portfolio-Medians aussortiert. Keine Emotionen.
             </p>
             <div className="bg-white rounded-md border border-black/10 p-3">
               <p className="text-[11px] font-semibold text-[var(--steel)] uppercase mb-1">Gefährdet</p>
               <p className="font-bold text-[var(--ink)] text-[14px]">{warRoom.weakestLane}</p>
             </div>
           </section>

           <section className="panel p-5 border-l-[4px] border-l-[var(--volt)]">
             <div className="flex items-center gap-2 mb-4">
               <Trophy className="h-5 w-5 text-[var(--volt)]" />
               <h3 className="font-bold text-[16px] text-[var(--ink)]">Skalierungs-Fokus</h3>
             </div>
             <p className="text-[13px] text-[var(--graphite)] leading-relaxed mb-4">
               Der aktuelle Gewinner bekommt Vorrang in der Produktion und die ersten Premium-Video-Slots.
             </p>
             <div className="bg-[var(--mist)] rounded-md border border-black/5 p-3">
               <p className="text-[11px] font-semibold text-[var(--steel)] uppercase mb-1">Spitzenreiter</p>
               <p className="font-bold text-[var(--ink)] text-[14px]">{warRoom.currentWinner}</p>
             </div>
           </section>
        </div>
      </div>
    </div>
  );
}

function TimelinePhase({ 
  title, 
  status, 
  description, 
  icon: Icon,
  isMilestone
}: { 
  title: string; 
  status: "done" | "active" | "waiting"; 
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isMilestone?: boolean;
}) {
  const getColors = () => {
    if (status === "done") return "bg-[var(--ink)] text-white border-[var(--ink)]";
    if (status === "active") return "bg-[var(--volt)] text-[var(--ink)] border-[var(--volt)]";
    return "bg-white text-[var(--steel)] border-black/20";
  };

  return (
    <div className="relative">
      <div className={`absolute -left-[39px] flex h-8 w-8 items-center justify-center rounded-full border-2 ${getColors()}`}>
        {status === "done" ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
      </div>
      <div className={`rounded-md p-4 border ${isMilestone ? 'border-[var(--volt)] bg-[var(--volt)]/5' : 'border-black/5 bg-white'}`}>
        <h3 className="font-bold text-[16px] text-[var(--ink)]">{title}</h3>
        <p className="mt-1.5 text-[13px] text-[var(--graphite)] leading-relaxed">{description}</p>
        {status === "active" && (
           <span className="mt-3 inline-block rounded-md bg-[var(--volt)]/20 px-2 py-1 text-[11px] font-bold uppercase text-[var(--ink)]">
             Aktuelle Phase
           </span>
        )}
      </div>
    </div>
  );
}
