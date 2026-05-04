import { getPersonaVisualIdentity } from "@/src/lib/visual-identity-queries";
import { VisualIdentityLab } from "@/src/components/visual-identity-lab";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Visual Identity Lab | Operator OS",
};

export default async function VisualLabPage({ params }: { params: { id: string } }) {
  const persona = await getPersonaVisualIdentity(params.id);

  if (!persona) {
    notFound();
  }

  return <VisualIdentityLab persona={persona} />;
}
