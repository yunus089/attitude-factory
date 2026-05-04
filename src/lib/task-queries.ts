import { prisma } from "@/src/lib/prisma";

export type TaskItemData = {
  id: string;
  title: string;
  status: string;
  priority: number;
  dueDate: Date | null;
  blockedReason: string | null;
  assigneeName: string | null;
};

export async function getOperatorTasks(): Promise<TaskItemData[]> {
  const tasks = await prisma.task.findMany({
    where: {
      status: { not: "ERLEDIGT" }
    },
    include: {
      assignee: true
    },
    orderBy: [
      { priority: "desc" },
      { dueDate: "asc" }
    ],
    take: 10
  });

  return tasks.map(task => ({
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    blockedReason: task.blockedReason,
    assigneeName: task.assignee?.name || "Nicht zugewiesen"
  }));
}
