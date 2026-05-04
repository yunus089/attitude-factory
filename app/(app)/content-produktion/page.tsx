import { ContentProductionBoard } from "@/src/components/content-production-board";
import { getContentProductionData } from "@/src/lib/content-queries";

export default async function ContentProduktionPage() {
  const data = await getContentProductionData();

  return <ContentProductionBoard data={data} />;
}
