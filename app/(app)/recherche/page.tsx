import { getResearchItems } from "@/src/lib/research-queries";
import { ResearchBoard } from "@/src/components/research-board";

export const metadata = {
  title: "Recherche-Eingang | Operator OS",
};

export default async function RecherchePage() {
  const data = await getResearchItems();

  return <ResearchBoard data={data} />;
}
