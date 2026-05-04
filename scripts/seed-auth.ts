import "dotenv/config";

process.env.AUTH_ALLOW_SIGN_UP = "true";

const { UserRole, UserStatus } = await import("@prisma/client");
const { auth } = await import("../src/lib/auth");
const { prisma } = await import("../src/lib/prisma");

const seedUsers = [
  {
    name: "Gründer",
    email: process.env.SEED_GRUENDER_EMAIL ?? "gruender@attitude-factory.com",
    password: process.env.SEED_GRUENDER_PASSWORD ?? "gruender-dev-2026!",
    role: UserRole.GRUENDER
  },
  {
    name: "Operator",
    email: process.env.SEED_OPERATOR_EMAIL ?? "operator@attitude-factory.com",
    password: process.env.SEED_OPERATOR_PASSWORD ?? "operator-dev-2026!",
    role: UserRole.OPERATOR
  }
];

for (const user of seedUsers) {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email }
  });

  if (!existingUser) {
    await auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });
  }

  await prisma.user.update({
    where: { email: user.email },
    data: {
      emailVerified: true,
      role: user.role,
      status: UserStatus.AKTIV
    }
  });

  console.log(`${existingUser ? "Aktualisiert" : "Angelegt"}: ${user.email}`);
}

await prisma.$disconnect();
