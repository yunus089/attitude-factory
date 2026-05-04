# Engineering-Plan v0 - Attitude Factory Operator OS

Status: Milestone 0-2 umgesetzt, Milestone 3 Launch-Pack-Seeding und Postmaterial-Workflow V1 umgesetzt; Kennzahlen als nächster Fokus  
Zuletzt aktualisiert: 2026-05-01  
Review: `/plan-eng-review`

## Executive Verdict

Wir bauen kein Spielzeug-Prototyping mehr, sondern eine echte private Web-App.

Entschiedener Stack:

- **Frontend/Backend:** Next.js App Router, TypeScript
- **UI:** Tailwind CSS, CSS-Variablen aus `DESIGN.md`, lucide-react Icons
- **Auth:** Better Auth, E-Mail/Passwort, DB-Sessions, kein öffentlicher Sign-up
- **Datenbank:** PostgreSQL
- **ORM/Migrations:** Prisma
- **Hosting:** Hostinger VPS KVM2
- **Betrieb:** Docker Compose
- **Reverse Proxy/HTTPS:** Caddy
- **Medien:** VPS-Dateisystem unter kontrolliertem Upload-Pfad plus DB-Metadaten

Wichtigste Scope-Entscheidung:

- Der Nutzer hat **Phase 1 vollständig** gewählt, nicht nur einen dünnen Vertical Slice.
- Damit bauen wir alle Phase-1-Module, aber in einer klaren Reihenfolge mit Stabilitätsgates.
- Keine SaaS-Mandantenfähigkeit, kein Billing, kein öffentlicher Onboarding-Flow in v1.
- Nach dem finalen CEO-Readiness-Check gilt zusätzlich **Dual-Track**: Milestone 0/1 werden gebaut, während das 30-Tage-Launch-Pack als echte Seed- und Arbeitsgrundlage vorbereitet wird.
- Nach Auswertung von `chat.md` gelten zusätzlich `docs/LAUNCH_DOCTRINE_V1.md` und `docs/FEATURE_BACKLOG_FROM_CHAT.md` als operative Leitplanken für Milestone 3+.

## Entscheidungen aus dem Review

| ID | Entscheidung | Ergebnis |
|---|---|---|
| D1 | Stack | Next.js Monolith + PostgreSQL + Prisma + Docker Compose + Caddy |
| D2 | Auth | Better Auth + E-Mail/Passwort + DB-Sessions + Rollen |
| D3 | Medien | VPS-Dateisystem + Datenbank-Metadaten |
| D4 | Datenmodell | V1-Kernmodell ohne Workspace/Billing/Client-Viewer |
| D5 | Build-Umfang | Phase 1 vollständig |
| D6 | Deployment | Docker Compose auf Hostinger VPS + Caddy + Backup-Scripts |

## Quellencheck

- Hostinger KVM2 wird von Hostinger mit 2 vCPU, 8 GB RAM, 100 GB Disk und 8 TB Bandbreite geführt:
  - https://www.hostinger.com/support/6976044-parameters-and-limits-of-hosting-plans-in-hostinger/
- Next.js unterstützt Self-Hosting und beschreibt Reverse-Proxy-, Environment- und Cache-Themen:
  - https://nextjs.org/docs/app/guides/self-hosting
- Better Auth unterstützt Installation und Next.js-Integration:
  - https://better-auth.com/docs/installation
  - https://better-auth.com/docs/integrations/next
- Prisma Migrate liefert Migrationen und `migrate deploy` für Produktionsdeploys:
  - https://docs.prisma.io/docs/cli/migrate
- Docker Compose Volumes/Bind Mounts sind offizielle persistente Mount-Mechaniken:
  - https://docs.docker.com/reference/compose-file/volumes/
- PostgreSQL beschreibt SQL-Dumps als Backup-Strategie:
  - https://www.postgresql.org/docs/current/backup-dump.html
- Caddy ist passend für Reverse Proxy und automatisches HTTPS:
  - https://caddyserver.com/docs/automatic-https

## Scope Challenge

### Was bereits existiert

- `docs/PRODUCT_BRIEF_V0.md`
  - Produktumfang, Datenmodell-Entwurf, Security-Anforderungen.
  - Wird wiederverwendet, aber durch diesen Plan technisch konkretisiert.
- `docs/CEO_REVIEW_V0.md`
  - Scope-Entscheidung Private MVP, Single-Workspace.
  - Wird wiederverwendet.
- `DESIGN.md`
  - Designsystem und UI-Richtung.
  - Wird als verbindliche UI-Quelle genutzt.
- `C:/Users/yunus/.gstack/projects/attitude-factory-mission-control/designs/kommandozentrale-20260430/approved-mix.html`
  - Freigegebene Design-Shotgun-Mischung für die Kommandozentrale.
  - Wird als visuelle Referenz für App-Shell, Produktions-Queue, Tageslage und Signalradar genutzt.
- `docs/SPRACHE_UND_BEGRIFFE.md`
  - Deutsch-first-Regeln, Modulnamen, Statuslabels.
  - Wird als Quelle für UI-Texte und Statusanzeigen genutzt.
- `assets/personas_media/`
  - Erste Persona-Bilder aus `PERSONAS.docx`.
  - Werden als Seed-/Referenzmedien importierbar gemacht.

Noch nicht umgesetzt im Code:

- echte CRUD-Flows für Personas, Inhalte und Medien
- Kennzahlen-Eingabe
- Decision Service
- Produktions-Deployment auf Hostinger

Aktueller Implementierungsstand:

- App-Code existiert als Next.js 16 App Router Projekt.
- Lokale PostgreSQL-Datenbank läuft per Docker Compose auf Port `5437`.
- Prisma Migration `20260430212915_init_operator_os_auth` ist angewendet.
- Better Auth ist mit DB-Sessions, E-Mail/Passwort, geschlossenem Sign-up und Seed-Usern verkabelt.
- Geschützte App-Routen leiten ohne Session auf `/anmelden`.
- Playwright testet erfolgreichen Login, falsches Passwort und Kommandozentrale auf Desktop/Mobile.
- `npm run typecheck`, `npm run lint`, `npm run test:e2e` und `npm run build` laufen grün.
- Postmaterial-Uploads sind als erster Upload-Service umgesetzt: Validierung, lokaler Speicherpfad, DB-Verknüpfung, Statusübergang und geschützte Auslieferung.

### Scope-Risiko

Der gewählte Umfang "Phase 1 vollständig" ist groß. Das Risiko ist nicht der Stack, sondern die Modulanzahl. Deshalb wird Phase 1 in Schichten gebaut:

```text
Schicht 1: Fundament
  Auth + Layout + Datenbank + Seed-Daten + Upload-Basis

Schicht 2: Operativer Kern
  Personas + Content-Produktion + Medien + Kennzahlen

Schicht 3: Entscheidungsfläche
  Kommandozentrale + 30-Tage-Kommando + Entscheidungslogik

Schicht 4: Phase-1-Erweiterungen
  Recherche-Eingang + Experimente + Angebots-Check + Regelcheck + Aufgaben
```

Jede Schicht muss lokal laufen, getestet sein und deploybar bleiben.

## NOT in Scope für v1

- Multi-Workspace / Multi-Tenant
  - Erst nach bewiesenem Attitude-Factory-Workflow.
- Billing und öffentliche Registrierung
  - Keine externen Kunden in v1.
- Automatisches Instagram-Posting
  - Zu viel Account- und Plattformrisiko.
- Unofficial Scraping/Botting
  - Nicht nötig für den ersten Arbeitsprozess.
- Vollautomatische Trend-Recherche
  - Recherche-Eingang bleibt manuell.
- Vollständiger Affiliate-CRM / Offer Ledger
  - v1 nutzt Angebots-Check.
- KI-Generierung direkt im Tool
  - Google AI, GPT Plus/Codex und Leonardo.ai werden manuell genutzt.
- Mobile App
  - Responsive Web reicht.
- Alle 20 Personas gleichzeitig operativ aktivieren
  - Datenmodell und Persona-Übersicht führen alle 20.
  - Aktive Startwelle sind 6 Personas: 3 pro Operator.
  - Die restlichen Personas bleiben sichtbar im Backlog.

## Architektur

```text
Browser
  |
  v
Caddy HTTPS / Reverse Proxy
  |
  v
Next.js App Container
  |
  +-- App Router Pages
  +-- Server Actions / Route Handlers
  +-- Better Auth
  +-- Prisma Client
  +-- Upload Service
  +-- Decision Service
  |
  +----------------------+
  |                      |
  v                      v
PostgreSQL            /srv/attitude-factory/uploads
  |                      |
  +-- structured data    +-- images, videos, reference files
```

### App-Struktur

Vorgeschlagene Ordner:

```text
app/
  (auth)/
    anmelden/
  (app)/
    kommandozentrale/
    30-tage-kommando/
    personas/
    content-produktion/
    medien/
    recherche/
    experimente/
    angebots-check/
    regelcheck/
    kennzahlen/
    einstellungen/
  api/
    auth/[...all]/
    uploads/

src/
  components/
  features/
    auth/
    personas/
    content/
    assets/
    metrics/
    decisions/
    war-room/
    research/
    offers/
    compliance/
    tasks/
  domain/
    labels.ts
    status.ts
    decisions.ts
  lib/
    auth.ts
    prisma.ts
    upload-paths.ts
    permissions.ts
    rates.ts
```

### Sprachgrenze im Code

Deutsch-first heißt:

- sichtbare UI-Texte sind Deutsch
- Routen dürfen Deutsch sein, z.B. `/kommandozentrale`
- Status-Slugs sind Deutsch ohne Umlaute, z.B. `material_fehlt`
- Seed-Daten sind Deutsch
- Fehlermeldungen sind Deutsch

Pragmatische Grenze:

- technische Modellnamen dürfen Englisch bleiben, z.B. `ContentItem`, `MetricSnapshot`, `DecisionLog`
- Framework- und Library-Begriffe bleiben Englisch
- alle Anzeigenamen kommen aus `src/domain/labels.ts` oder ähnlichen zentralen Label-Dateien

Das verhindert Übersetzungsstress für Nutzer, aber hält den Code für KI-Agenten, Prisma und Next.js stabil.

## Datenmodell v1

### Kernentitäten

```text
User
  id, name, email, role, status

Persona
  id, name, publicName, lane, niche, status
  archetype, targetAudience, feedEnemies, differentiationThesis
  visualIdentity, voiceRules, bannedClaims, disclosureRules

PlatformAccount
  id, personaId, platform, handle, profileUrl, followerCount, status

ContentItem
  id, personaId, ownerUserId, format, intent, pillar, hook
  brief, outline, caption, cta, disclosure
  status, plannedDate, postedAt, postUrl
  experimentId, offerReadinessItemId, complianceStatus

AssetFile
  id, personaId, contentItemId, assetType, sourceTool
  storagePath, originalFilename, mimeType, byteSize
  prompt, qualityRating, consistencyRating, status

MetricSnapshot
  id, contentItemId, capturedAt
  impressions, reach, likes, comments, saves, shares
  profileVisits, follows, linkClicks, sales, revenue, notes

DecisionLog
  id, relatedEntityType, relatedEntityId, signal, decision, reason
  decidedByUserId, decidedAt

ResearchItem
  id, sourceUrl, note, personaId, category, whyItMatters
  suggestedContentIdea, ownerUserId, status

Experiment
  id, personaId, name, hypothesis, variable
  primaryMetric, startDate, endDate, status, result, decision

OfferReadinessItem
  id, personaId, contentItemId, category, specificOfferName
  claimSafeAngle, softCta, disclosureText, readinessLevel, status

ComplianceCheck
  id, contentItemId, aiDisclosureChecked, affiliateDisclosureChecked
  noFakeUsageClaim, noMedicalClaim, noFinancialClaim, notes, status

Task
  id, assigneeUserId, relatedEntityType, relatedEntityId
  title, status, dueDate, priority, blockedReason

VideoSlot
  id, date, personaId, contentItemId, reason, expectedLearning
  productionStatus, publishedUrl, result

WarRoomTest
  id, name, startDate, endDate, status
  activePersonaIds, dailyOutputTarget, nextDecisionDate, notes
```

### Spätere Entitäten, nicht v1

```text
Workspace
TeamInvite
BillingAccount
ClientViewer
BrandDeal
AffiliateCommission
ExternalPlatformIntegration
```

### Wichtige Indizes

- `content_items(persona_id, status)`
- `content_items(owner_user_id, planned_date)`
- `content_items(posted_at)`
- `asset_files(persona_id, status)`
- `metric_snapshots(content_item_id, captured_at)`
- `research_items(status, persona_id)`
- `tasks(assignee_user_id, status, due_date)`
- `video_slots(date, persona_id)`
- `decision_logs(related_entity_type, related_entity_id)`

## Statusflüsse

### Content-Produktion

```text
idee
  -> gebrieft
  -> text_entwurf
  -> material_fehlt
  -> material_bereit
  -> pruefung
  -> bereit_zum_posten
  -> gepostet
  -> kennzahlen_fehlen
  -> ausgewertet
  -> wiederverwenden | ausbauen | stoppen_pausieren
```

Regeln:

- `bereit_zum_posten` braucht erfüllten Regelcheck.
- `gepostet` darf ohne URL möglich sein, markiert aber `post_url_fehlt`.
- `kennzahlen_fehlen` wird automatisch vorgeschlagen, wenn ein geposteter Inhalt keine MetricSnapshot hat.

### Medien

```text
roh
  -> kandidat
  -> freigegebene_referenz
  -> freigegebenes_post_material
  -> bearbeiten
  -> abgelehnt
  -> archiviert
```

### Entscheidungssignale

```text
kennzahlen_fehlen
pruefung_noetig
gewinner_kandidat
schwaches_signal
videoeinsatz_kandidat
ausbauen
stoppen_pausieren
wiederverwenden
```

## Entscheidungslogik v1

V1 bleibt deterministisch und erklärbar.

```text
ContentItem + MetricSnapshots + Portfolio Median
  |
  v
Decision Service
  |
  +-- erzeugt Signal
  +-- erzeugt Begründung
  +-- zeigt nächste Aktion
```

Beispiele:

- gepostet und keine Kennzahlen: `kennzahlen_fehlen`
- Saves pro 1.000 Reichweite über Portfolio-Median: `gewinner_kandidat`
- Follow-Rate unter Median bei ausreichender Reichweite: `schwaches_signal`
- hoher Save-Wert plus gute Persona-Konsistenz: `videoeinsatz_kandidat`

Keine AI-Empfehlungen in v1. Erst Daten sammeln, dann automatisieren.

## Auth und Rollen

Rollen:

- `gruender`
- `operator`

Regeln:

- Öffentliche Registrierung deaktiviert.
- Nutzer werden per Seed-Script oder Admin-Command angelegt.
- Alle App-Routen außer `/anmelden` brauchen Session.
- Gründer darf Nutzer, Persona-Status, Entscheidungen und harte Stops verwalten.
- Operator darf Inhalte, Medien, Recherche, Aufgaben und Kennzahlen pflegen.
- Passwort-Reset wird in v1 nur implementiert, wenn SMTP sauber steht. Sonst manuelles Admin-Reset.

## Upload- und Medienstrategie

Pfad:

```text
/srv/attitude-factory/uploads/
  personas/
  content/
  research/
  temp/
```

Regeln:

- Original-Dateiname nie als finaler Pfad.
- Finaler Dateiname: UUID plus geprüfte Extension.
- Erlaubt: JPG, PNG, WEBP, MP4, MOV optional später.
- V1-Limit: Bilder 15 MB, Videos 80 MB.
- Upload wird zuerst geprüft, dann gespeichert, dann in DB eingetragen.
- Wenn DB-Save fehlschlägt, temporäre Datei löschen.
- Wenn Datei-Save fehlschlägt, klare deutsche Fehlermeldung.

Späterer Wechsel zu S3/R2:

- Upload-Zugriff nur über `UploadService`.
- DB speichert `storageDriver`, `storagePath`, `publicUrl`.
- UI kennt den Speicherort nicht direkt.

## Deployment

### Container

```text
docker-compose.yml
  caddy
  app
  postgres
```

### Serverpfade

```text
/srv/attitude-factory/
  app/
  uploads/
  backups/
  caddy/
  postgres/
  .env
```

### Deploy-Sequenz

```text
1. SSH auf VPS
2. Backup vor Migration
3. Code aktualisieren
4. Docker Image bauen
5. Prisma migrate deploy
6. Container neu starten
7. Smoke Test
8. Alte Backups rotieren
```

### Smoke Test

- Login-Seite lädt.
- Login mit Gründer-User funktioniert.
- Kommandozentrale lädt.
- ContentItem kann erstellt werden.
- Test-Upload funktioniert.
- Kennzahlen-Snapshot kann gespeichert werden.
- Decision Signal erscheint.

## Backup und Recovery

### Täglich

```text
02:30 DB Backup mit pg_dump -Fc
02:35 Uploads als tar.zst oder rsync-Kopie
02:45 Backup-Prüfung: Datei vorhanden und größer als 0 Bytes
```

### Retention

- 14 tägliche lokale DB-Backups
- 14 tägliche lokale Upload-Backups
- vor jeder Migration zusätzlich ein manueller Pre-Deploy-Backup
- externe Kopie später ergänzen, sobald ein Ziel gewählt ist

### Restore-Probe

Mindestens vor dem echten Launch einmal testen:

```text
neue leere DB
  -> Backup restore
  -> App gegen Restore starten
  -> Login + Dashboard prüfen
```

## Security Review

Muss in v1 drin sein:

- HTTPS-only über Caddy.
- Secrets nur in `.env`, nicht im Repo.
- Better Auth Sessions in DB.
- Session Expiration.
- Upload Type Validation.
- Upload Size Limit.
- Path Traversal verhindern.
- Keine ausführbaren Dateien im Upload-Pfad.
- User-Text escaped rendern.
- CSRF-Schutz über Framework/Auth-Layer prüfen.
- Rate Limit für Login.
- Fehler in deutscher Sprache, aber keine internen Details.

Besonders gefährlich:

- Uploads
- Captions/Research Notes mit HTML/Script
- falsche Pfadberechnung
- fehlende Backups
- versehentlich öffentliche Medien-URLs

## Tests

Teststack:

- Vitest für Domain-Logik und Services.
- Testing Library für UI-Komponenten.
- Playwright für kritische E2E-Flows.
- Prisma Test DB für Integrationsfälle.

### Pflichtabdeckung

Auth:

- Login erfolgreich.
- Login falsch.
- geschützte Seite ohne Session leitet zu `/anmelden`.
- Operator kann keine Gründer-only-Aktion ausführen.

Personas:

- Persona erstellen/bearbeiten.
- Aktive Persona erscheint in Kommandozentrale.
- pausierte Persona erscheint nicht in aktiver Test-Queue.

Content-Produktion:

- Inhalt erstellen.
- Statusübergang gültig.
- ungültiger Statusübergang blockiert.
- Owner, Due Date und Blocked Reason erscheinen.

Medien:

- gültiger Upload akzeptiert.
- zu große Datei abgelehnt.
- falscher MIME-Type abgelehnt.
- Dateiname mit `../` kann keinen Pfad verlassen.

Kennzahlen:

- Snapshot speichern.
- negative Zahlen abgelehnt.
- Division durch 0 verhindert.
- doppelte Snapshot-Regel definiert.

Entscheidungslogik:

- fehlende Kennzahlen erzeugen Signal.
- Gewinner-Kandidat bei hoher Save-/Follow-Rate.
- schwaches Signal bei unterdurchschnittlicher Rate.
- Begründung wird immer mitgeliefert.

30-Tage-Kommando:

- Tag-Zähler korrekt.
- Tag-14-Entscheidung erscheint.
- Tag-30-Entscheidung erscheint.

Regelcheck:

- unvollständiger Pflicht-Regelcheck blockiert `bereit_zum_posten`.
- Affiliate Disclosure wird bei Affiliate-Intent verlangt.

## Failure Modes

| Codepfad | Realistischer Fehler | Test | Handling | Nutzer sieht |
|---|---|---|---|---|
| Login | falsches Passwort | ja | Auth reject + Rate Limit | "E-Mail oder Passwort falsch" |
| Session | Session abgelaufen | ja | Redirect | "Bitte neu anmelden" |
| Upload | Datei zu groß | ja | vor Speichern ablehnen | "Datei ist zu groß" |
| Upload | Pfad-Traversal | ja | UUID-Dateiname erzwingen | "Upload fehlgeschlagen" |
| Upload | Disk voll | nein, schwer lokal | Fehler loggen, Save abbrechen | klare Upload-Fehlermeldung |
| DB Save | Prisma/Migration Problem | Integration | Fehler abfangen | "Speichern fehlgeschlagen" |
| Kennzahlen | Reach = 0 | ja | Rate als null/0 behandeln | "Noch keine Reichweite" |
| Decision Service | Median fehlt | ja | "zu wenig Daten" | kein Fake-Signal |
| Zwei Nutzer | gleichzeitige Bearbeitung | später | `updatedAt` prüfen | Warnung vor Überschreiben |
| Backup | Backup fehlgeschlagen | Script-Test | Exit-Code + Log | Admin-Hinweis |

Kritische Lücke, falls nicht gebaut:

- Upload- und Kennzahlenfehler dürfen nie still verschwinden. Wenn Nutzer Daten eintragen und sie weg sind, verliert das Tool sofort Vertrauen.

## Performance Review

Wahrscheinliche Engpässe:

- viele große Bilder/Videos
- Asset-Grid ohne Pagination
- Dashboard mit zu vielen MetricSnapshot-Joins
- große Uploads über Next.js Route Handler

V1-Regeln:

- Content und Medien paginieren.
- Kommandzentrale nutzt gezielte Queries, keine "alles laden"-Abfrage.
- Metriken voraggregieren, wo nötig, aber noch keine komplexe Analytics Engine.
- Upload-Limits hart setzen.
- Keine Bilder in Originalgröße in Listenansichten.
- Später Thumbnail-Job ergänzen, wenn Asset Library schwer wird.

## Observability

Muss vorhanden sein:

- Server-Logs für Login-Fehler, Upload-Fehler, DB-Fehler.
- Health Endpoint intern, z.B. `/api/health`.
- Backup-Log unter `/srv/attitude-factory/backups/backup.log`.
- DecisionLog als menschenlesbare Produkt-Observability.

Beispiel DecisionLog:

```text
Wir bauen Davids Workflow-Karussell-Format aus,
weil 3 Posts den Portfolio-Median bei Saves pro 1.000 Reichweite schlagen.
```

## Implementierungsreihenfolge

Diese Reihenfolge gilt zusammen mit `docs/DUAL_TRACK_LAUNCH_PLAN_V0.md`.

Das bedeutet:

- Track A baut Operator OS in Milestones.
- Track B liefert echte Startdaten, Content-Planung und Entscheidungslogik für die ersten 30 Tage.
- Die App darf nicht als leeres Dashboard entstehen; die 6 aktiven Startwellen-Personas und das komplette 20er-Portfolio müssen den Produktkern prägen.

### Milestone 0: Projektfundament

- Git Repo initialisieren.
- Next.js + TypeScript + Tailwind.
- Prisma + PostgreSQL lokal.
- Docker Compose lokal und Produktionsvariante.
- Caddyfile-Entwurf.
- `DESIGN.md` Tokens in CSS Variablen.

Done:

- `npm run lint`, `npm run typecheck`, `npm run test:e2e` und `npm run build` laufen.
- lokale App startet.
- Docker Compose Postgres läuft lokal healthy.
- Prisma Migrationen laufen gegen die lokale Datenbank.

### Milestone 1: Auth und App-Shell

- Better Auth einrichten.
- Login-Seite `/anmelden`.
- geschützter App-Bereich.
- Rollen `gruender` und `operator`.
- deutsche Navigation.
- Seed-Script für zwei Nutzer.

Done:

- geschützte Seiten sind wirklich geschützt.
- kein öffentlicher Sign-up.
- Seed-User `gruender` und `operator` existieren.
- Login und falsches Passwort sind per Playwright auf Desktop und Mobile geprüft.

### Milestone 2: Datenkern

- Prisma Schema für v1-Kernmodell.
- Seed für alle 20 Personas aus `PERSONAS.docx`.
- Startwelle mit 6 aktiven Personas: 3 pro Operator.
- Backlog-Status, Score und nächste Aktivierungsbedingung für nicht aktive Personas.
- Persona-Übersicht und Detail.
- Content-Produktion Grundform.
- Medien-Metadaten und Upload-Service.

Umgesetzt am 2026-05-01:

- Migration `20260501005148_persona_portfolio_core` erweitert Persona um Owner, Operator, Startwelle, Backlog-Aktivierung, Setcard-/Medienstatus und Scoring.
- `src/domain/persona-portfolio.ts` führt alle 20 Personas als typed Portfolio-Quelle.
- `scripts/seed-personas.ts` seedet 20 Personas und Instagram PlatformAccount-Datensätze idempotent.
- Lokale DB ist gefüllt mit 20 Personas, 6 Startwellen-Personas und 14 Backlog-Personas.
- `/personas` ist DB-backed und zeigt das komplette Portfolio inklusive Filter.
- `/content-produktion` ist DB-backed und zeigt eine operative Queue oder Startwellen-Produktionsslots.
- `/medien` ist DB-backed und zeigt Mediengruppen oder Startwellen-Setcard-Slots.

Noch offen aus diesem Bereich:

- Detailseiten und echte CRUD-Flows.
- weitere Upload-Flows für Referenzen/Setcards außerhalb des Postmaterial-Workflows.

### Milestone 3: Operative Arbeit

- Content-Statusfluss.
- Aufgaben/Owner/Due Dates.
- Kennzahlen-Eingabe.
- 30-Tage-Kommando.
- Kommandozentrale mit Heute-Queue.

Done:

- `src/domain/launch-pack.ts` definiert den ersten 30-Tage-Launch-Pack für 6 Startwellen-Personas.
- `scripts/seed-launch-pack.ts` seedet idempotent 6 ContentItems, 6 Aufgaben, ComplianceCheck-Zeilen, 4 sichere Setcards, 6 Prompt-Spuren, 2 VideoSlots und `30-Tage-Startwelle 1`.
- `/content-produktion` zeigt echte Launch-Pack-Zeilen statt Platzhaltern.
- Prompt-Spuren zählen nicht als fertiges Postmaterial; `Material fehlt` bleibt korrekt, bis echte Postbilder, Slides oder Kurzvideos vorliegen.
- `/content-produktion` zählt `Video-Slots` aus der echten `VideoSlot`-Tabelle.
- `/medien` zeigt 4 sichere Setcards und 6 Prompt-Historie-Einträge; Sophie Larue und Emma Winters bleiben bewusst ohne fake-fertige Setcard.
- `docs/LAUNCH_DOCTRINE_V1.md` verdichtet `chat.md` zur 30-Tage-Doktrin.
- `docs/FEATURE_BACKLOG_FROM_CHAT.md` priorisiert übernehmbare Feature-Ansätze aus `chat.md`.
- `src/domain/post-material-upload.ts` validiert Postbild-, Carousel-Slide- und Kurzvideo-Uploads inklusive MIME-Type, Größenlimit und Statusübergang.
- `src/lib/upload-storage.ts` verhindert Pfad-Traversal und erzeugt geschützte Upload-URLs.
- `/api/uploads/[...path]` liefert hochgeladene Dateien über die App-Grenze aus.
- `/content-produktion` enthält die Postmaterial-Schleuse für reale Uploads pro Produktionsslot.
- Uploads werden mit ContentItem und Persona verknüpft, in `/medien` sichtbar und setzen ContentItems bei Kandidat/Freigabe auf `Material bereit`.
- Unit- und Playwright-Tests decken Upload-Regeln, Speicherpfad-Sicherheit und den Desktop/Mobile-Upload-Flow ab.

Noch offen:

- Kennzahlen-Eingabe V1: MetricSnapshot-Formular und Ratenberechnung.
- 30-Tage-Kommando und Kommandozentrale auf Live-Daten umstellen.
- Trigger-Tags und Originalitäts-Check in Content-/Regelcheck-Workflow integrieren.

### Milestone 4: Entscheidungs- und Kontrollsystem

- Decision Service.
- DecisionLog.
- Experimente.
- Recherche-Eingang.
- Angebots-Check.
- Regelcheck.
- Videoeinsätze.

Done:

- Phase 1 vollständig nutzbar.

### Milestone 5: Deployment

- VPS Setup.
- Caddy HTTPS.
- Docker Compose Production.
- Backup-Scripts.
- Smoke Test.
- Restore-Probe.

Done:

- `attitude-factory.com` zeigt Login.
- Gründer und Partner können arbeiten.
- Backup und Restore sind geprüft.

## Parallelisierung

| Workstream | Module | Hängt ab von |
|---|---|---|
| Fundament | Next.js, Docker, Prisma, Tailwind | keine |
| Auth | Better Auth, Users, Sessions, Rollen | Fundament |
| UI Shell | Layout, Navigation, Design Tokens | Fundament |
| Datenmodell | Prisma Schema, Seeds | Fundament |
| Medien | Upload Service, AssetFile | Datenmodell |
| Content/Personas | Personas, ContentItems | Datenmodell, UI Shell |
| Kennzahlen/Entscheidungen | MetricSnapshots, Decision Service | Content/Personas |
| Phase-1-Module | Recherche, Experimente, Angebots-Check, Regelcheck, Aufgaben | Datenmodell, UI Shell |
| Deployment | Docker Prod, Caddy, Backup | Fundament |

Lanes:

- Lane A: Fundament -> Datenmodell -> Content/Personas -> Kennzahlen/Entscheidungen
- Lane B: UI Shell -> Design-Komponenten
- Lane C: Medien nach Datenmodell
- Lane D: Deployment nach Fundament
- Lane E: Phase-1-Module nach Datenmodell und UI Shell

Konfliktflag:

- Lane A und Lane E teilen Prisma Schema. Wenn mehrere Agenten arbeiten, muss eine Person das Schema besitzen.
- UI Shell und Feature-Seiten teilen Komponenten. Design Tokens zuerst festziehen.

## Completion Summary

- Step 0 Scope Challenge: Scope akzeptiert, aber mit Milestone-Gates abgesichert.
- Architecture Review: 5 Issues gefunden und entschieden.
- Code Quality Review: 4 Plan-Risiken gefunden, Grenzen definiert.
- Test Review: Diagramme produziert, 10 Testbereiche definiert.
- Performance Review: 4 Risiken gefunden.
- NOT in Scope: geschrieben.
- What Already Exists: geschrieben.
- Failure Modes: 0 stille kritische Lücken erlaubt, Upload/Kennzahlen explizit markiert.
- Outside Voice: Web-Quellencheck über Primärquellen statt Modell-Zweitmeinung.
- Parallelization: 5 Lanes, 3 parallel nach Fundament möglich.
- Lake Score: 6/6 Entscheidungen mit vollständiger oder produktionsnaher Option.

## Engineering Verdict

Freigabe zum Implementieren, wenn diese Bedingungen akzeptiert bleiben:

1. Phase 1 vollständig, aber in Milestones.
2. Deutsch-first UI bleibt hart.
3. Keine öffentliche Registrierung.
4. Keine Instagram-Automation.
5. Uploads und Kennzahlen bekommen Tests und sichtbare Fehler.
6. Backup/Restore wird vor echtem Launch geprüft.

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|---|---|---|---|---|---|
| CEO Review | `/plan-ceo-review` | Scope & Strategie | 1 | CLEAR | Private MVP, Single-Workspace, 6 akzeptierte v1-Erweiterungen |
| Eng Review | `/plan-eng-review` | Architektur, Tests, Deployment | 1 | CLEAR | 6 Entscheidungen getroffen, 0 ungelöste Architekturentscheidungen |
| Design Review | `/design-consultation` + `/plan-design-review` | UI/UX-Richtung und Planlücken | 2 | CLEAR | Editorial Control Room, Deutsch-first, 7 Designentscheidungen, Score 7.5/10 -> 9/10 |
| Codex Review | `/codex review` | spätere Diff-Prüfung | 0 | pending | App-Code vorhanden; Review vor erstem Commit sinnvoll |
| DX Review | `/plan-devex-review` | Entwicklererfahrung | 0 | optional | Für v1-Start nicht blockierend |

VERDICT: CEO + DESIGN + ENG CLEARED. Milestone 3 Launch-Pack-Seeding und Postmaterial-Workflow verified. Ready to continue Milestone 3 Kennzahlen und Live-Kommandozentrale-Wiring.
