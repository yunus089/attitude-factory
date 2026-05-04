#!/bin/bash
# =========================================================
# Attitude Factory – deploy.sh
# Hostinger VPS Deployment Script
#
# Voraussetzungen auf dem Server:
#   - Docker + Docker Compose v2 installiert
#   - /srv/attitude-factory/ als Arbeitsverzeichnis
#   - .env Datei befüllt (Vorlage: .env.production.example)
#   - DNS auf Server-IP zeigt (attitude-factory.com)
#
# Erster Deploy:
#   chmod +x deploy.sh && ./deploy.sh --first-deploy
#
# Normaler Deploy (Update):
#   ./deploy.sh
# =========================================================

set -euo pipefail

DEPLOY_DIR="/srv/attitude-factory"
IMAGE_NAME="attitude-factory-app"
COMPOSE_FILE="docker-compose.prod.yml"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Attitude Factory – Deployment startet"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$DEPLOY_DIR"

# Prüfe ob .env vorhanden
if [ ! -f ".env" ]; then
  echo "❌ FEHLER: .env fehlt in $DEPLOY_DIR"
  echo "   Vorlage: .env.production.example"
  exit 1
fi

# Build Docker Image
echo "🔨 Baue Docker Image..."
docker build -t "$IMAGE_NAME:latest" .

# Migrationen ausführen (temporärer Container mit gleicher .env)
echo "🗄️  Führe Datenbank-Migrationen aus..."
docker run --rm \
  --env-file .env \
  --network attitude-factory_internal \
  "$IMAGE_NAME:latest" \
  sh -c "npx prisma migrate deploy"

# Erster Deploy: Seed-Daten anlegen
if [ "${1:-}" = "--first-deploy" ]; then
  echo "🌱 Erster Deploy: Seed-Daten werden angelegt..."
  docker run --rm \
    --env-file .env \
    --network attitude-factory_internal \
    "$IMAGE_NAME:latest" \
    sh -c "tsx scripts/seed-auth.ts && tsx scripts/seed-personas.ts && tsx scripts/seed-launch-pack.ts && tsx scripts/seed-visual-identity.ts"
fi

# Stack hochfahren / neu starten
echo "🚀 Starte Services..."
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Deployment abgeschlossen"
echo "  🌍 https://attitude-factory.com"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
