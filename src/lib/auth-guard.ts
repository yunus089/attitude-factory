import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";

export function isAuthEnforced() {
  return process.env.AUTH_ENFORCED === "true";
}

export async function hasActiveSession() {
  if (!isAuthEnforced()) {
    return true;
  }

  const session = await auth.api.getSession({
    headers: await headers()
  });

  return Boolean(session);
}
