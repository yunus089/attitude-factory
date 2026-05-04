import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "@/src/lib/prisma";

const authUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  appName: "Attitude Factory Operator OS",
  baseURL: authUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    authUrl,
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: process.env.AUTH_ALLOW_SIGN_UP !== "true"
  },
  plugins: [nextCookies()]
});
