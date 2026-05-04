-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('gruender', 'operator');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('aktiv', 'pausiert');

-- CreateEnum
CREATE TYPE "PersonaStatus" AS ENUM ('entwurf', 'aktiv', 'pausiert', 'gestoppt', 'archiviert');

-- CreateEnum
CREATE TYPE "PlatformName" AS ENUM ('instagram', 'facebook', 'tiktok', 'youtube');

-- CreateEnum
CREATE TYPE "ContentFormat" AS ENUM ('einzelbild', 'carousel', 'kurzvideo', 'story');

-- CreateEnum
CREATE TYPE "ContentIntent" AS ENUM ('reichweite', 'saves', 'shares', 'follows', 'vertrauen', 'affiliate_soft_test', 'affiliate_hard_sell', 'weltaufbau', 'trend');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('idee', 'gebrieft', 'text_entwurf', 'material_fehlt', 'material_bereit', 'pruefung', 'bereit_zum_posten', 'gepostet', 'kennzahlen_fehlen', 'ausgewertet', 'wiederverwenden', 'ausbauen', 'stoppen_pausieren');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('referenz', 'setcard', 'postbild', 'carousel_slide', 'kurzvideo', 'prompt', 'style_guide');

-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('roh', 'kandidat', 'freigegebene_referenz', 'freigegebenes_post_material', 'bearbeiten', 'abgelehnt', 'archiviert');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('offen', 'in_arbeit', 'blockiert', 'erledigt');

-- CreateEnum
CREATE TYPE "ExperimentStatus" AS ENUM ('geplant', 'aktiv', 'ausgewertet', 'gestoppt');

-- CreateEnum
CREATE TYPE "DecisionSignal" AS ENUM ('kennzahlen_fehlen', 'pruefung_noetig', 'gewinner_kandidat', 'schwaches_signal', 'videoeinsatz_kandidat', 'ausbauen', 'stoppen_pausieren', 'wiederverwenden');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'operator',
    "status" "UserStatus" NOT NULL DEFAULT 'aktiv',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Persona" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publicName" TEXT NOT NULL,
    "lane" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "status" "PersonaStatus" NOT NULL DEFAULT 'entwurf',
    "archetype" TEXT,
    "originStory" TEXT,
    "targetAudience" TEXT,
    "audiencePain" TEXT,
    "audienceDesire" TEXT,
    "feedEnemies" TEXT,
    "differentiationThesis" TEXT,
    "contentWedge" TEXT,
    "visualIdentity" TEXT,
    "voiceRules" TEXT,
    "bannedClaims" TEXT,
    "disclosureRules" TEXT,
    "monetizationNotes" TEXT,
    "priorityScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformAccount" (
    "id" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "platform" "PlatformName" NOT NULL,
    "handle" TEXT,
    "profileUrl" TEXT,
    "followerCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'entwurf',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentItem" (
    "id" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "ownerUserId" TEXT,
    "format" "ContentFormat" NOT NULL,
    "intent" "ContentIntent" NOT NULL,
    "pillar" TEXT,
    "hook" TEXT NOT NULL,
    "brief" TEXT,
    "outline" TEXT,
    "caption" TEXT,
    "cta" TEXT,
    "disclosure" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'idee',
    "plannedDate" TIMESTAMP(3),
    "postedAt" TIMESTAMP(3),
    "postUrl" TEXT,
    "complianceStatus" TEXT NOT NULL DEFAULT 'offen',
    "experimentId" TEXT,
    "offerReadinessItemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetFile" (
    "id" TEXT NOT NULL,
    "personaId" TEXT,
    "contentItemId" TEXT,
    "assetType" "AssetType" NOT NULL,
    "sourceTool" TEXT,
    "storagePath" TEXT NOT NULL,
    "originalFilename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "byteSize" INTEGER NOT NULL,
    "prompt" TEXT,
    "qualityRating" INTEGER,
    "consistencyRating" INTEGER,
    "status" "AssetStatus" NOT NULL DEFAULT 'roh',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricSnapshot" (
    "id" TEXT NOT NULL,
    "contentItemId" TEXT NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "reach" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "profileVisits" INTEGER NOT NULL DEFAULT 0,
    "follows" INTEGER NOT NULL DEFAULT 0,
    "linkClicks" INTEGER NOT NULL DEFAULT 0,
    "sales" INTEGER NOT NULL DEFAULT 0,
    "revenueCents" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecisionLog" (
    "id" TEXT NOT NULL,
    "relatedEntityType" TEXT NOT NULL,
    "relatedEntityId" TEXT NOT NULL,
    "signal" "DecisionSignal" NOT NULL,
    "decision" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "decidedByUserId" TEXT,
    "decidedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DecisionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchItem" (
    "id" TEXT NOT NULL,
    "personaId" TEXT,
    "sourceUrl" TEXT,
    "note" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "whyItMatters" TEXT,
    "suggestedContentIdea" TEXT,
    "ownerUserId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'erfasst',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiment" (
    "id" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hypothesis" TEXT NOT NULL,
    "variable" TEXT NOT NULL,
    "primaryMetric" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "ExperimentStatus" NOT NULL DEFAULT 'geplant',
    "result" TEXT,
    "decision" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferReadinessItem" (
    "id" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "specificOfferName" TEXT,
    "claimSafeAngle" TEXT,
    "softCta" TEXT,
    "disclosureText" TEXT,
    "readinessLevel" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'offen',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferReadinessItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceCheck" (
    "id" TEXT NOT NULL,
    "contentItemId" TEXT NOT NULL,
    "aiDisclosureChecked" BOOLEAN NOT NULL DEFAULT false,
    "affiliateDisclosureChecked" BOOLEAN NOT NULL DEFAULT false,
    "noFakeUsageClaim" BOOLEAN NOT NULL DEFAULT false,
    "noMedicalClaim" BOOLEAN NOT NULL DEFAULT false,
    "noFinancialClaim" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'offen',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComplianceCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "assigneeUserId" TEXT,
    "relatedEntityType" TEXT,
    "relatedEntityId" TEXT,
    "title" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'offen',
    "dueDate" TIMESTAMP(3),
    "priority" INTEGER NOT NULL DEFAULT 2,
    "blockedReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoSlot" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "personaId" TEXT,
    "contentItemId" TEXT,
    "reason" TEXT NOT NULL,
    "expectedLearning" TEXT,
    "productionStatus" TEXT NOT NULL DEFAULT 'geplant',
    "publishedUrl" TEXT,
    "result" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarRoomTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aktiv',
    "activePersonaIds" TEXT[],
    "dailyOutputTarget" INTEGER NOT NULL DEFAULT 3,
    "nextDecisionDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarRoomTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "Persona_status_idx" ON "Persona"("status");

-- CreateIndex
CREATE INDEX "PlatformAccount_personaId_platform_idx" ON "PlatformAccount"("personaId", "platform");

-- CreateIndex
CREATE INDEX "ContentItem_personaId_status_idx" ON "ContentItem"("personaId", "status");

-- CreateIndex
CREATE INDEX "ContentItem_ownerUserId_plannedDate_idx" ON "ContentItem"("ownerUserId", "plannedDate");

-- CreateIndex
CREATE INDEX "ContentItem_postedAt_idx" ON "ContentItem"("postedAt");

-- CreateIndex
CREATE INDEX "AssetFile_personaId_status_idx" ON "AssetFile"("personaId", "status");

-- CreateIndex
CREATE INDEX "AssetFile_contentItemId_idx" ON "AssetFile"("contentItemId");

-- CreateIndex
CREATE INDEX "MetricSnapshot_contentItemId_capturedAt_idx" ON "MetricSnapshot"("contentItemId", "capturedAt");

-- CreateIndex
CREATE INDEX "DecisionLog_relatedEntityType_relatedEntityId_idx" ON "DecisionLog"("relatedEntityType", "relatedEntityId");

-- CreateIndex
CREATE INDEX "ResearchItem_status_personaId_idx" ON "ResearchItem"("status", "personaId");

-- CreateIndex
CREATE UNIQUE INDEX "ComplianceCheck_contentItemId_key" ON "ComplianceCheck"("contentItemId");

-- CreateIndex
CREATE INDEX "Task_assigneeUserId_status_dueDate_idx" ON "Task"("assigneeUserId", "status", "dueDate");

-- CreateIndex
CREATE INDEX "VideoSlot_date_personaId_idx" ON "VideoSlot"("date", "personaId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformAccount" ADD CONSTRAINT "PlatformAccount_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentItem" ADD CONSTRAINT "ContentItem_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentItem" ADD CONSTRAINT "ContentItem_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentItem" ADD CONSTRAINT "ContentItem_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentItem" ADD CONSTRAINT "ContentItem_offerReadinessItemId_fkey" FOREIGN KEY ("offerReadinessItemId") REFERENCES "OfferReadinessItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetFile" ADD CONSTRAINT "AssetFile_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetFile" ADD CONSTRAINT "AssetFile_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricSnapshot" ADD CONSTRAINT "MetricSnapshot_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionLog" ADD CONSTRAINT "DecisionLog_decidedByUserId_fkey" FOREIGN KEY ("decidedByUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchItem" ADD CONSTRAINT "ResearchItem_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiment" ADD CONSTRAINT "Experiment_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferReadinessItem" ADD CONSTRAINT "OfferReadinessItem_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceCheck" ADD CONSTRAINT "ComplianceCheck_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeUserId_fkey" FOREIGN KEY ("assigneeUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoSlot" ADD CONSTRAINT "VideoSlot_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoSlot" ADD CONSTRAINT "VideoSlot_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "ContentItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
