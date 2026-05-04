-- AlterTable
ALTER TABLE "Persona" ADD COLUMN     "affiliateFitScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "assetEaseScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "backlogActivationNote" TEXT,
ADD COLUMN     "complianceEaseScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "differentiationScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "instagramReachScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "launchWave" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "launchWaveOrder" INTEGER,
ADD COLUMN     "mediaReadinessStatus" TEXT NOT NULL DEFAULT 'offen',
ADD COLUMN     "operatorFitScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "operatorUserId" TEXT,
ADD COLUMN     "ownerUserId" TEXT,
ADD COLUMN     "repeatabilityScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "setcardQualityScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "setcardStatus" TEXT NOT NULL DEFAULT 'fehlt';

-- CreateIndex
CREATE INDEX "Persona_operatorUserId_launchWave_idx" ON "Persona"("operatorUserId", "launchWave");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_name_key" ON "Persona"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformAccount_personaId_platform_key" ON "PlatformAccount"("personaId", "platform");

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_operatorUserId_fkey" FOREIGN KEY ("operatorUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
