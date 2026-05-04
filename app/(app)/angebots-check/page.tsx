import { getOfferReadinessData } from "@/src/lib/offer-queries";
import { OfferReadinessBoard } from "@/src/components/offer-readiness-board";

export const metadata = {
  title: "Angebots-Check & Readiness | Operator OS",
};

export default async function AngebotsCheckPage() {
  const data = await getOfferReadinessData();

  return <OfferReadinessBoard data={data} />;
}
