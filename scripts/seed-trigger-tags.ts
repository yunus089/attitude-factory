import { prisma } from "../src/lib/prisma";

async function main() {
  const items = await prisma.contentItem.findMany({ include: { persona: true } });
  for (const item of items) {
    let tags: string[] = [];
    if (item.persona.name === "David Chen") tags = ["Workflow", "Produktivität", "Wiedererkennung"];
    if (item.persona.name === "Zara Patel") tags = ["Inhaltsstoff", "Skincare", "Neugier"];
    if (item.persona.name === "Luna Stone") tags = ["Minimalismus", "Aesthetic"];
    if (item.persona.name === "Alex Moreno") tags = ["Disziplin", "Motivation"];
    
    await prisma.contentItem.update({
      where: { id: item.id },
      data: {
        triggerTags: tags,
        originalityStatus: "Eigenes Design"
      }
    });
  }
  console.log("Trigger tags and originality status updated");
}

main().catch(console.error).finally(() => prisma.$disconnect());
