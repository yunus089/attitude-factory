import { AppShell } from "@/src/components/app-shell";
import { auth } from "@/src/lib/auth";
import { isAuthEnforced } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedAppLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (isAuthEnforced()) {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      redirect("/anmelden");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { status: true }
    });

    if (user?.status !== "AKTIV") {
      redirect("/anmelden");
    }
  }

  return <AppShell>{children}</AppShell>;
}
