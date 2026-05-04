import { MetricBoard } from "@/src/components/metric-board";
import { getKennzahlenData } from "@/src/lib/metric-queries";

export const metadata = {
  title: "Kennzahlen – Attitude Factory Operator OS"
};

export default async function KennzahlenPage() {
  const data = await getKennzahlenData();
  return <MetricBoard data={data} />;
}
