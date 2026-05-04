#!/bin/sh

# Führe Datenbank-Migrationen aus
echo "Running database migrations..."
npx prisma migrate deploy

# Führe Seeding aus, falls FLAG gesetzt ist (optional)
if [ "$RUN_SEED" = "true" ]; then
  echo "Running seeding..."
  npm run seed:auth
  npm run seed:personas
  npm run seed:launch-pack
  npm run seed:visual-identity
fi

# Starte die Anwendung
echo "Starting application..."
exec node server.js
