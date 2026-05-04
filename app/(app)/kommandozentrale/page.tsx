import { DecisionPanel } from "@/src/components/decision-panel";
import { MetricStrip } from "@/src/components/metric-strip";
import { PersonaHealth } from "@/src/components/persona-health";
import { SignalRadar } from "@/src/components/signal-radar";
import { TodayQueue } from "@/src/components/today-queue";
import { WarRoomPanel } from "@/src/components/war-room-panel";
import { TaskPanel } from "@/src/components/task-panel";
import { getKommandozentraleData } from "@/src/lib/kommandozentrale-queries";
import { getOperatorTasks } from "@/src/lib/task-queries";

export default async function KommandozentralePage() {
  const [data, tasks] = await Promise.all([
    getKommandozentraleData(),
    getOperatorTasks()
  ]);

  return (
    <main className="space-y-4">
      <WarRoomPanel warRoom={data.warRoom} />
      <MetricStrip metrics={data.metricStrip} />
      
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_0.8fr_0.65fr]">
        <TodayQueue items={data.todayQueue} />
        <DecisionPanel decisions={data.decisions} />
        <TaskPanel tasks={tasks} />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[0.95fr_1.1fr]">
        <PersonaHealth personas={data.personas} />
        <SignalRadar rows={data.signalRadar} />
      </section>
    </main>
  );
}
