-- CreateEnum
CREATE TYPE "HookStatus" AS ENUM ('idee', 'getestet', 'gewinner', 'schwach');

-- AlterTable
ALTER TABLE "ContentItem" ADD COLUMN     "hookId" TEXT;

-- CreateTable
CREATE TABLE "Hook" (
    "id" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "status" "HookStatus" NOT NULL DEFAULT 'idee',
    "intent" "ContentIntent" NOT NULL,
    "triggerTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentItem" ADD CONSTRAINT "ContentItem_hookId_fkey" FOREIGN KEY ("hookId") REFERENCES "Hook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hook" ADD CONSTRAINT "Hook_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;
