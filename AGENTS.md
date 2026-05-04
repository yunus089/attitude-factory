# Agent Instructions: Attitude Factory

This workspace is for planning and building Attitude Factory Mission Control.

Before doing strategy, design, or implementation work, read:

- `docs/ATTITUDE_FACTORY_CONTEXT.md`
- `docs/SPRACHE_UND_BEGRIFFE.md`
- `docs/ENGINEERING_PLAN_V0.md` before implementation or architecture decisions
- `DESIGN.md` before UI or visual decisions

Core operating rules:

- Do not treat this as a generic persona dashboard. The product is an internal mission-control system for scaling independent AI influencer accounts.
- Attitude Factory should stay invisible to audiences at first. Each persona should look and feel like an independent creator.
- Optimize the first phase for reach and follower growth, with affiliate monetization prepared but not forced.
- Start operationally with 6 active personas because there are 2 operators: 3 personas per operator.
- Keep all 20 personas from `PERSONAS.docx` visible in the system as a portfolio backlog; do not let non-active personas disappear from planning.
- Zara Patel, Alex Moreno, and David Chen are anchor personas, not the complete launch set.
- Use `docs/PERSONA_PORTFOLIO_V0.md` as the binding source for launch-wave and backlog logic.
- Prefer a real private web dashboard hosted on `attitude-factory.com` / Hostinger VPS over a temporary Notion-style setup.
- Avoid risky Instagram automation or unofficial API workflows. Planning, production, tracking, and analytics can be internal; posting should initially be manual or through official tools.
- Include compliance/disclosure thinking for AI-generated personas, affiliate links, health claims, finance claims, and platform rules.
- The user wants direct mentor-style pressure testing, not vague encouragement.
- The active design direction is "Editorial Control Room": dense, serious, operational, and decision-first. Avoid generic SaaS dashboards and social-media-calendar aesthetics.
- Product and UI language is German-first. Navigation, buttons, status labels, demo data, empty states, validation messages, and user-facing copy must be German from the start. English is only acceptable for intentional brand/product names like "Attitude Factory" and "Operator OS", or for technical framework terms.
- The approved engineering stack is Next.js App Router + TypeScript + PostgreSQL + Prisma + Better Auth + Docker Compose + Caddy. Do not switch stacks without explicit user approval.

Current best next step:

- Continue implementation from `docs/ENGINEERING_PLAN_V0.md`.
- Milestone 0 app scaffold is in place: Next.js, TypeScript, Tailwind, Prisma schema, Playwright smoke test, Docker/Caddy drafts, static Kommandozentrale, `/anmelden` design, EmptyState, mobile Heute-Queue cards.
- Milestone 1 auth foundation is in place: Docker Desktop runs locally, Postgres runs through Docker Compose, Prisma migration `20260430212915_init_operator_os_auth` is applied, Better Auth protects app routes, `/anmelden` performs real E-Mail/Passwort login, and seed users exist for `gruender` and `operator`.
- Milestone 2 data core is in place: migration `20260501005148_persona_portfolio_core`, typed 20-persona portfolio, idempotent persona seed, 6 active launch-wave personas, 14 backlog personas, and DB-backed `/personas`, `/content-produktion`, and `/medien`.
- Milestone 3 launch-pack seed is in place: 6 first ContentItems, 6 production tasks, ComplianceCheck rows, 4 verified Setcards, 6 Prompt-Spuren, 2 VideoSlots, and the first `30-Tage-Startwelle 1` WarRoomTest.
- `/content-produktion` now shows real launch-pack rows, prompt-only assets correctly remain `Material fehlt`, and the summary counts real `VideoSlot` rows.
- `/medien` now shows the 4 safe start-wave Setcards and 6 Prompt-Historie records; Sophie Larue and Emma Winters intentionally remain without fake-finished Setcards.
- Postmaterial-Workflow V1 is in place: `/content-produktion` has a Postmaterial-Schleuse for real Postbild, Carousel-Slide, and Kurzvideo uploads; uploads are validated, stored through a guarded local path, linked to ContentItem and Persona, surfaced in `/medien`, and protected through `/api/uploads/[...path]`.
- `docs/LAUNCH_DOCTRINE_V1.md` translates `chat.md` into the active 30-day operating doctrine.
- `docs/FEATURE_BACKLOG_FROM_CHAT.md` translates `chat.md` into a prioritized Operator-OS feature backlog and explicitly rejects bot/fake-engagement, 20 active accounts, and daily Reels for all.
- Milestone 3 metrics & signals are in place: migration `20260501141935_metrics_and_trigger_tags`, `MetricSnapshot` model, manual Kennzahlen-Eingabe V1, psychologische Trigger-Tags, Originalitäts-Status, and live Portfolio-Median calculation in `kommandozentrale-queries.ts`.
- `/kommandozentrale` is now a live decision engine showing real winner/loser signals, radar tracks, and actionable alerts based on the median reach/saves comparison.
- Milestone 4 Hook-Centric Test Engine is in place: migration `20260501152738_hook_centric_engine`, `Hook` model linked to `ContentItem`, `/experimente` as the central Hook-Bibliothek, "Proactive Content Director" insights dashboard, 1-Click "Spin-Off" server action, and event-driven hook status automation (Hot/Frozen) based on metric thresholds.
- Milestone 5 Affiliate Readiness Lab is in place: `OfferReadinessItem` model integration, `/angebots-check` dashboard with Readiness-Level (0-5) visualization, Claim-Safe Audit (Green/Red Zone definition), and server actions for monetization readiness tracking.
- Operational Modules V1 Finalized: `/recherche` for trend intake and `/regelcheck` for compliance audits are live. Task-Management is integrated into `/kommandozentrale`.
- Senior Quality Audit Applied: All 20+ mutation server actions are protected with session-checks (auth-guard), internal error details are stripped from user-facing messages, and hardcoded fake numbers in the monetization board have been replaced with live data.
- Verification baseline: `npm run typecheck`, `npm run lint`, `npm run test`, `npm run test:e2e`, and `npm run build` pass locally. (Note: E2E requires a fresh server start after Prisma migrations).
- Visual Identity Lab: `Persona` model expanded with structured visual parameters (Color, Location, Outfit, Lighting, etc.) to ensure long-term KI consistency across all lanes.
- Portfolio erweitert auf 24 Personas: 4 neue Personas aus dem aktualisierten PERSONAS.pdf (Elias Vogel, Zara Sky, Amina Koroma, Marcus Thorne) wurden in DB und portfolio-portfolio.ts aufgenommen. PORTFOLIO_TARGET in persona-queries.ts ist auf 24/6/18 gesetzt.
- Deployment-Infrastruktur fertig: `docker-compose.prod.yml` (Postgres + App + Caddy), `infra/Caddyfile` mit Security-Headers und Operator-Subdomain, `infra/deploy.sh` mit `--first-deploy` Flag für initiales Seeding.
- ENV-Struktur sauber: `.env.example` (Dev) und `.env.production.example` (Prod) sind vollständig dokumentiert. `.env.production` ist in `.gitignore` geschützt.
- E2E-Tests aktualisiert: `new-modules.spec.ts` deckt Recherche, Regelcheck, Angebots-Check, Task-Panel und Visual Lab ab. Alle bestehenden Tests auf Portfolio-Größe 24 aktualisiert.
- Dokploy Readiness: `entrypoint.sh` integriert für automatische DB-Migrationen und Seeding. `Dockerfile` und `package.json` für Container-Deployment optimiert. `DOKPLOY.md` Guide erstellt.
- Verification baseline: `npm run lint`, `npm run typecheck`, `npm run build` – alle grün.
