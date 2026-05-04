# 🚀 Dokploy Deployment Guide – Attitude Factory

Dieses Projekt ist für **Dokploy** optimiert. Da Dokploy HTTPS und Reverse Proxying selbst übernimmt, ist das Setup extrem einfach.

## 1. Voraussetzungen in Dokploy
1. Erstelle ein neues **Projekt** (z.B. `Attitude Factory`).
2. Erstelle innerhalb des Projekts eine **PostgreSQL Service**.
   - Notiere dir das interne Passwort und den Service-Namen (standardmäßig `postgres`).

## 2. App-Setup
1. Erstelle eine neue **Application**.
2. Wähle **GitHub/GitLab** oder den Pfad zu deinem Repository.
3. **Build Configuration**:
   - Wähle **Docker**.
   - Dokploy erkennt das `Dockerfile` automatisch.
4. **Networking**:
   - Port: `3000`
   - Domain: Trage `attitude-factory.com` und `operator.attitude-factory.com` ein.

## 3. Environment Variables (.env)
Kopiere diese Werte in das Dokploy Dashboard (Application -> Environment Variables):

```env
# Datenbank (interne Dokploy-Verbindung)
# Format: postgresql://[USER]:[PASSWORD]@[SERVICE_NAME]:5432/[DB_NAME]?schema=public
DATABASE_URL="postgresql://attitude:DEIN_POSTGRES_PASSWORT@postgres:5432/attitude_factory?schema=public"

# Auth
BETTER_AUTH_SECRET="DEIN_GENERIERTER_SECRET" # openssl rand -base64 48
BETTER_AUTH_URL="https://attitude-factory.com"

# App-Settings
AUTH_ALLOW_SIGN_UP="false"
AUTH_ENFORCED="true"
UPLOAD_ROOT="/app/uploads"
NODE_ENV="production"
PORT="3000"

# Initiales Seeding (Nur beim ERSTEN Deploy auf true setzen, danach auf false!)
RUN_SEED="true"
SEED_GRUENDER_EMAIL="gruender@attitude-factory.com"
SEED_GRUENDER_PASSWORD="DEIN_SICHERES_PASSWORT"
SEED_OPERATOR_EMAIL="operator@attitude-factory.com"
SEED_OPERATOR_PASSWORD="DEIN_SICHERES_PASSWORT"
```

## 4. Persistente Daten (Storage)
Damit hochgeladene Bilder nicht bei jedem Deploy gelöscht werden:
1. Gehe zu **Storage / Volumes**.
2. Erstelle einen Mount:
   - **Mount Path**: `/app/uploads`
   - **Type**: Volume (oder lokaler Pfad auf dem Host)

## 5. Deployment
- Klicke auf **Deploy**.
- Das `entrypoint.sh` Skript führt automatisch `prisma migrate deploy` aus.
- Wenn `RUN_SEED="true"` gesetzt ist, werden auch alle 24 Personas und das Launch-Pack angelegt.

---

**Hinweis:** Nach dem ersten erfolgreichen Start solltest du `RUN_SEED` auf `false` stellen, um unnötige Re-Seeds bei jedem Update zu vermeiden.
