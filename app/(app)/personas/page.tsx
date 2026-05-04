import { PersonaPortfolioBoard } from "@/src/components/persona-portfolio-board";
import { getPersonaPortfolioBoardData } from "@/src/lib/persona-queries";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getPersonaPortfolioBoardData();

  return <PersonaPortfolioBoard data={data} />;
}
