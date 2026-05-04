"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasActiveSession } from "./auth-guard";

export async function updateTaskStatus(id: string, status: "OFFEN" | "IN_ARBEIT" | "BLOCKIERT" | "ERLEDIGT", blockedReason?: string) {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    await prisma.task.update({
      where: { id },
      data: { 
        status,
        blockedReason: status === "BLOCKIERT" ? blockedReason : null
      }
    });
    revalidatePath("/kommandozentrale");
    return { success: true };
  } catch (error) {
    console.error("Task Update Fehler:", error);
    return { success: false, error: "Aufgabe konnte nicht aktualisiert werden." };
  }
}

export async function createTask(data: {
  title: string;
  assigneeUserId?: string;
  dueDate?: Date;
  priority?: number;
}) {
  if (!(await hasActiveSession())) {
    return { success: false, error: "Bitte neu anmelden." };
  }

  try {
    const task = await prisma.task.create({
      data: {
        ...data,
        status: "OFFEN"
      }
    });
    revalidatePath("/kommandozentrale");
    return { success: true, id: task.id };
  } catch (error) {
    console.error("Task Create Fehler:", error);
    return { success: false, error: "Aufgabe konnte nicht erstellt werden." };
  }
}
