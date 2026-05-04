import { getComplianceChecks } from "@/src/lib/compliance-queries";
import { ComplianceBoard } from "@/src/components/compliance-board";

export const metadata = {
  title: "Regelcheck & Claims | Operator OS",
};

export default async function RegelcheckPage() {
  const data = await getComplianceChecks();

  return <ComplianceBoard data={data} />;
}
