"use client";

import { useTransition } from "react";
import { CheckCircle2, Circle, Clock, AlertCircle, User } from "lucide-react";
import type { TaskItemData } from "@/src/lib/task-queries";
import { updateTaskStatus } from "@/src/lib/task-actions";

export function TaskPanel({ tasks }: { tasks: TaskItemData[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: string, currentStatus: string) => {
    startTransition(async () => {
      const nextStatus = currentStatus === "ERLEDIGT" ? "OFFEN" : "ERLEDIGT";
      await updateTaskStatus(id, nextStatus as "OFFEN" | "ERLEDIGT");
    });
  };

  return (
    <section className="panel flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--line)] bg-black/[0.015] px-4 py-3">
        <h2 className="font-condensed text-[22px] font-bold tracking-tight text-[var(--ink)]">
          Operative Aufgaben
        </h2>
        <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-bold text-[var(--steel)]">
          {tasks.length} offen
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="group flex items-start gap-3 border-b border-[var(--line)] p-3 last:border-0 hover:bg-black/[0.02]"
          >
            <button 
              onClick={() => handleToggle(task.id, task.status)}
              disabled={isPending}
              className="mt-0.5 shrink-0 text-[var(--line)] transition-colors hover:text-[var(--volt)] disabled:opacity-50"
            >
              {task.status === "ERLEDIGT" ? (
                <CheckCircle2 className="h-5 w-5 text-[var(--volt)]" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            
            <div className="min-w-0 flex-1">
              <p className={`text-[13px] font-semibold leading-tight text-[var(--ink)] ${task.status === "ERLEDIGT" ? "line-through opacity-50" : ""}`}>
                {task.title}
              </p>
              
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-[11px] font-medium text-[var(--steel)]">
                  <User className="h-3 w-3" />
                  {task.assigneeName}
                </div>
                
                {task.dueDate && (
                  <div className={`flex items-center gap-1 text-[11px] font-bold ${isOverdue(task.dueDate) ? "text-[var(--red)]" : "text-[var(--steel)]"}`}>
                    <Clock className="h-3 w-3" />
                    {new Date(task.dueDate).toLocaleDateString("de-DE")}
                  </div>
                )}

                {task.status === "BLOCKIERT" && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--red)]">
                    <AlertCircle className="h-3 w-3" />
                    Blockiert: {task.blockedReason}
                  </div>
                )}
              </div>
            </div>

            <div className={`h-1.5 w-1.5 rounded-full shrink-0 mt-2 ${getPriorityColor(task.priority)}`} title={`Priorität ${task.priority}`} />
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-[var(--volt)]/40 mb-2" />
            <p className="text-[13px] font-medium text-[var(--steel)]">Alle Aufgaben erledigt.</p>
          </div>
        )}
      </div>
      
      <div className="border-t border-[var(--line)] bg-black/[0.015] p-2">
        <button className="w-full rounded border border-black/10 bg-white py-1.5 text-[11px] font-bold text-[var(--graphite)] hover:bg-black/[0.02]">
          Alle Aufgaben anzeigen
        </button>
      </div>
    </section>
  );
}

function getPriorityColor(priority: number) {
  if (priority >= 3) return "bg-[var(--red)]";
  if (priority === 2) return "bg-[var(--amber)]";
  return "bg-[var(--line)]";
}

function isOverdue(date: Date) {
  return new Date(date) < new Date();
}
