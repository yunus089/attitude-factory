import { getHookEngineData } from "@/src/lib/hook-queries";
import { HookEngineBoard } from "@/src/components/hook-engine-board";

export const metadata = {
  title: "Experimente & Hooks | Operator OS",
};

export default async function ExperimentePage() {
  const data = await getHookEngineData();

  return <HookEngineBoard data={data} />;
}
