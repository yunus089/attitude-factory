-- AlterTable
ALTER TABLE "ContentItem" ADD COLUMN     "ctaType" TEXT,
ADD COLUMN     "hookType" TEXT,
ADD COLUMN     "originalityStatus" TEXT NOT NULL DEFAULT 'offen',
ADD COLUMN     "productionAngle" TEXT,
ADD COLUMN     "triggerTags" TEXT[] DEFAULT ARRAY[]::TEXT[];
