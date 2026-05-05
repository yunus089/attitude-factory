#!/bin/sh
set -e

# Führe Datenbank-Migrationen aus
echo "Running database migrations..."
if ! npx prisma migrate deploy; then
  echo "❌ Migration failed!"
  exit 1
fi

# Führe Seeding aus, falls FLAG gesetzt ist (optional)
if [ "$RUN_SEED" = "true" ]; then
  echo "Running seeding..."
  if ! npm run seed:auth || ! npm run seed:personas || ! npm run seed:launch-pack || ! npm run seed:visual-identity; then
    echo "❌ Seeding failed!"
    exit 1
  fi
fi

# Starte die Anwendung
echo "Starting application..."
exec node server.js
