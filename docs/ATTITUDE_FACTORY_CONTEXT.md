# Attitude Factory Context

Last updated: 2026-05-01

## Project

Attitude Factory is planned as a portfolio of AI-generated influencer personas that will grow audiences on Instagram first, then later expand to Facebook, TikTok, YouTube, and international markets.

The user's long-term goal is to monetize the persona network as fast as possible and then scale aggressively. Monetization paths include affiliate revenue, UGC, branding, marketing services, and later possibly agency-style brand deals.

The internal tool should be a private Mission Control, not a public-facing marketing site at first. However, it should be designed as a product-like web dashboard from day one, so it can later become usable by other agencies or operator teams if that path becomes attractive.

## Existing Assets And Infrastructure

- Domain: `attitude-factory.com`
- Hosting: Hostinger VPS KVM2 with remaining capacity
- AI subscriptions:
  - Google AI Pro, about 22 EUR/month
  - GPT Plus / Codex access
  - Leonardo.ai, about 12 EUR/month
- Persona source document:
  - `C:/Users/yunus/Downloads/PERSONAS.docx`
  - Contains 20 persona profiles and 10 embedded PNG images.
- Extracted persona images for inspection:
  - `assets/personas_media/`
  - Contact sheet:
    - `assets/personas_media/contact_sheet.jpg`

## Important Strategic Decisions

- Mission Control should become a real product-like web dashboard with login for the user and one partner.
- Strategic decision: build Mission Control as if it could later serve other agencies/operator teams, while keeping the MVP private and optimized for Attitude Factory's own execution.
- It can be hosted on the Hostinger VPS and placed behind login on `attitude-factory.com`.
- Product language is German-first because the partner speaks no English.
  - UI, navigation, buttons, status labels, validation messages, seed data, demo content, checklists, and workflow copy must be German from the start.
  - `docs/SPRACHE_UND_BEGRIFFE.md` is the canonical glossary for module names, status labels, and decision signals.
  - "Attitude Factory" and "Operator OS" may remain as intentional brand/product names; visible working modules use German names.
- Attitude Factory should not be visible as a shared umbrella brand to audiences in the first phase.
- Each persona should appear as a separate independent creator with its own world, voice, bio, visual identity, and posting rhythm.
- The first phase is reach-first, affiliate-ready:
  - Primary goal: follower and reach growth.
  - Secondary goal: prepare affiliate monetization without making content feel like spam.
- No assumption that brand buyers are needed at the start.
  - Affiliate can be the first monetization path.
  - Brand/UGC/agency revenue can come later after audience proof.
- The first operational test should use 6 active personas because the operating team is 2 people: 3 personas per operator.
- The system must keep all 20 personas from `PERSONAS.docx` visible from the start, even when only 6 are active.
- Binding portfolio source: `docs/PERSONA_PORTFOLIO_V0.md`.
- Final CEO readiness decision: **C - Dual-Track**.
  - Build Operator OS now.
  - Prepare the 30-Tage-Launch-Pack in parallel.
  - Do not let app-building delay content-market learning.
  - Binding doc: `docs/DUAL_TRACK_LAUNCH_PLAN_V0.md`
- Current video capacity exists but is limited:
  - About 2 videos per day
  - Max about 10 seconds each
  - Instagram remains the first focus
  - Images and carousels remain the baseline content engine
  - Videos are premium slots, assigned intentionally

## Anchor Personas And Launch Wave

Zara Patel, Alex Moreno and David Chen were the first three anchor lanes. They remain important, but they are not the complete launch set anymore.

The current operating model is:

- 6 active launch-wave personas
- 3 personas per operator
- 14 portfolio-backlog personas
- all 20 personas tracked in Operator OS

Provisional Startwelle 1 from `docs/PERSONA_PORTFOLIO_V0.md`:

- Gründer: David Chen, Zara Patel, Luna Stone
- Partner: Alex Moreno, Sophie Larue, Emma Winters

The final active six can still be adjusted after setcard quality and scoring, but Milestone 2 must not seed only three personas.

## Original Anchor Personas

### Zara Patel

Lane: Beauty / skincare / inclusive beauty.

Likely competitors in feed:

- Dermatology and ingredient-education accounts
- Beauty-review creators
- Clean aesthetic / glow-up accounts
- Beauty brand accounts

Differentiation thesis:

- Inclusive beauty plus calm education plus high-end visual storytelling.
- Avoid fake first-person usage claims.
- Position around routine design, skin type, undertone, skin longevity, barrier repair, gentle exfoliation, and fewer smarter products.

Monetization fit:

- Skincare
- Haircare
- Beauty tools
- Shade-inclusive products
- Later UGC/brand deals

### Alex Moreno

Lane: Fitness / motivation / discipline.

Likely competitors in feed:

- Real fitness coaches with body proof
- Workout carousel accounts
- Gym motivation pages
- Supplement and biohacking accounts
- Challenge accounts

Differentiation thesis:

- Do not rely on fake transformation proof.
- Position as fitness psychology, discipline systems, beginner-friendly routines, gym anxiety, and identity.
- Avoid false supplement/body-result claims.

Monetization fit:

- Fitness apps
- Training plans
- Home gym gear
- Supplements, with strict claim discipline
- Later coaching-style funnels or partner products

### David Chen

Lane: AI / productivity / automation.

Likely competitors in feed:

- AI tool list accounts
- Productivity creators
- Notion/automation creators
- LinkedIn-style carousel creators on Instagram
- Tech tutorial creators

Differentiation thesis:

- Strongest carousel fit.
- Do not publish generic "Top 7 AI tools" content.
- Position as workflow-first AI: output, automations, creator systems, solo-operator leverage.

Monetization fit:

- AI SaaS affiliates
- Productivity tools
- Templates
- Notion/automation assets
- Courses or mini-products later

## Mission-Control Product Direction

The product should be an internal operating system first and a potential agency/operator SaaS later. The design should use product-quality information architecture, roles, reusable data models, and clean UX, but should not slow down the first 30-day Instagram execution test.

Primary product brief:

- `docs/PRODUCT_BRIEF_V0.md`

Launch doctrine and chat extraction:

- `docs/LAUNCH_DOCTRINE_V1.md`
  - Active 30-day operating doctrine extracted from `chat.md`.
  - Keeps 6 active personas, image/carousel baseline, 2 video slots, originality discipline, trigger taxonomy, KPI logic, compliance, and kill/scale decisions.
- `docs/FEATURE_BACKLOG_FROM_CHAT.md`
  - Converts `chat.md` inspiration into prioritized Operator-OS features.
  - P0 sequence: Postmaterial-Workflow V1 is implemented; next are Kennzahlen-Eingabe V1, live 30-Tage-Kommando, Trigger-Tags, Originalitäts-Check.
  - Explicitly rejects bot/fake engagement, 20 active accounts at once, daily Reels for all, and raw "Sex sells" language in the UI.

CEO review:

- `docs/CEO_REVIEW_V0.md`
- Decision: v1 is **Private MVP, Single-Workspace**, not agency SaaS.
- Mode: Selective Expansion.
- Accepted v1 additions: Manual Decision Engine v1, Persona Consistency Lab v1, Research Inbox v1, Offer Readiness, 30-Day War Room, Lightweight Partner Accountability.

Design system:

- `DESIGN.md`
- Preview: `docs/design-preview.html`
- Direction: Editorial Control Room.
- Memorable thing: "Kommandozentrale, nicht Content-Kalender."
- Typography: IBM Plex Sans Condensed, IBM Plex Sans, IBM Plex Mono.
- Palette: restrained neutral base with Signal Red, Volt, Data Cyan, Amber, and small persona accents.
- Design-shotgun decision: Mix von allen Varianten.
  - A Kontrollraum = Basis-Shell und 30-Tage-Kommando.
  - D Produktionsmaschine = table-first Arbeitsmotor.
  - B Redaktionsdesk = "Tageslage der Maschine" und kurze editorial Entscheidungsblöcke.
  - C Signalradar = dunkler Daten-/Alarm-Akzent, sparsam eingesetzt.
  - Approved mockup: `C:/Users/yunus/.gstack/projects/attitude-factory-mission-control/designs/kommandozentrale-20260430/approved-mix.html`

Engineering plan:

- `docs/ENGINEERING_PLAN_V0.md`
- Decision: Next.js App Router + TypeScript + PostgreSQL + Prisma + Better Auth + Docker Compose + Caddy.
- Auth: E-Mail/Passwort, Datenbank-Sessions, Rollen `gruender` und `operator`, kein öffentlicher Sign-up.
- Medien: Uploads auf dem VPS-Dateisystem, Metadaten in PostgreSQL.
- Deployment: Hostinger VPS KVM2, Caddy HTTPS, App/Postgres per Docker Compose, Backup-Scripts.
- Scope: Phase 1 vollständig, aber in Milestones; keine Multi-Tenant-SaaS-Architektur in v1.

Implementation status:

- Git repository initialized locally.
- Next.js 16 + TypeScript app scaffold exists.
- Tailwind CSS 4 is configured through PostCSS and CSS variables from `DESIGN.md`.
- Prisma 7 is configured with `prisma.config.ts` and a v1 PostgreSQL schema.
- Docker Desktop is installed locally and Docker Compose runs PostgreSQL 17 on port `5437`.
- Prisma migration `20260430212915_init_operator_os_auth` is applied locally.
- Prisma migration `20260501005148_persona_portfolio_core` is applied locally.
- Better Auth is wired with E-Mail/Passwort, database sessions, no public sign-up, seed users, and protected app routes.
- Playwright E2E tests run serially for stability and cover login, wrong password, protected Kommandozentrale loading, `/personas`, `/content-produktion`, and `/medien` on desktop and mobile.
- First Kommandozentrale screen exists at `/kommandozentrale`.
- `/anmelden` exists as a private Kontrollraum-Schleuse with real Better Auth login.
- `EmptyState` exists and placeholder modules use it.
- `Heute-Queue` has a desktop table and mobile card/list variant.
- Persona media was copied into `public/personas_media/` for app rendering.
- `src/domain/persona-portfolio.ts` is the typed source for all 20 personas.
- `scripts/seed-personas.ts` idempotently seeds all 20 personas and Instagram PlatformAccount rows.
- `src/domain/launch-pack.ts` is the typed source for the first 30-Tage-Launch-Pack.
- `scripts/seed-launch-pack.ts` idempotently seeds first production data for the 6 launch-wave personas.
- `docs/LAUNCH_DOCTRINE_V1.md` and `docs/FEATURE_BACKLOG_FROM_CHAT.md` extract the useful strategy/features from `chat.md`.
- Local database is seeded with 20 personas: 6 launch-wave personas, 14 backlog personas, 3 owned by Gründer and 3 owned by Partner in the launch wave.
- Local database is seeded with 6 first ContentItems, 6 production tasks, ComplianceCheck rows, 4 verified Setcards, 6 Prompt-Spuren, 2 VideoSlots, and `30-Tage-Startwelle 1`.
- `/personas` is DB-backed and shows the full 20-persona portfolio with filters for all, Startwelle, Backlog, Gründer, Partner, and Setcard fehlt.
- `/content-produktion` is DB-backed and shows real launch-pack rows, production status, compliance state, material state, and real daily VideoSlot count.
- `src/domain/content-asset-status.ts` prevents prompt-only records from being counted as finished post material; prompt-only launch slots correctly stay `Material fehlt`.
- `src/domain/post-material-upload.ts` validates real post material uploads and defines the allowed status transition from `Material fehlt` / `Gebrieft` toward `Material bereit`.
- `src/lib/upload-storage.ts` and `/api/uploads/[...path]` provide a guarded local upload path and protected file delivery for uploaded post material.
- `/content-produktion` now includes the Postmaterial-Schleuse: operators can attach a Postbild, Carousel-Slide, or Kurzvideo to an existing ContentItem, choose Kandidat / Postmaterial frei / Bearbeiten, and store a production note.
- Uploading candidate or approved post material links the AssetFile to both ContentItem and Persona; approved/candidate material moves the content item into `Material bereit`.
- `/medien` is DB-backed and shows asset groups, 4 safe Setcards, 6 Prompt-Historie records, plus missing Setcard slots for Sophie Larue and Emma Winters.
- `/medien` now also surfaces uploaded post material via DB metadata and protected upload URLs.
- Local dev server runs at `http://127.0.0.1:3000`.
- Verification baseline after Milestone 3 Postmaterial-Workflow wiring: `npm run typecheck`, `npm run lint`, `npm run test`, `npm run test:e2e`, and `npm run build` pass locally.
- Next implementation focus is Milestone 3 continuation in this order: Kennzahlen-Eingabe V1, live 30-Tage-Kommando/Kommandozentrale wiring, then Trigger-Tags and Originalitäts-Check.

Latest design review:

- `/plan-design-review` completed on 2026-04-30.
- Overall design completeness moved from 7.5/10 to 9/10.
- Key decisions:
  - Arbeitsboard zuerst.
  - Operative Leere plus Mentor-Erklärung.
  - Gemeinsame Kommandozentrale mit Rollenfokus.
  - Gleiche Shell, eigene Modul-Arbeitslogik.
  - Kleine verbindliche Operator-Komponentenbibliothek.
  - Mobile ist eine vollwertige App.
  - Login ist eine private Kontrollraum-Schleuse.

Core loop:

Persona -> Feed Enemy -> Content Wedge -> Asset Pipeline -> Posting -> Metrics -> Decision

Mission Control should include these modules:

1. Persona OS
   - Persona identity
   - Visual identity
   - Voice and tone
   - Niche and content pillars
   - Feed enemies
   - Differentiation thesis
   - Banned claims
   - Disclosure rules
   - Platform handles
   - Asset consistency notes

2. Content Factory
   - Ideas
   - Hooks
   - Carousel outlines
   - Image prompts
   - Video prompts
   - Captions
   - CTAs
   - Hashtags
   - Disclosure snippets
   - Status workflow

3. Asset Library
   - Setcards
   - Persona reference images
   - Finished post images
   - Carousel slides
   - Short videos
   - Prompt history
   - Quality rating

4. Video Slot System
   - 2 short videos per day initially
   - Assign to the highest-learning opportunity, not evenly by default
   - Track which persona got the slot and why

5. Offer Readiness
   - Affiliate categories
   - Specific offer name, optional
   - Persona fit
   - Claim-safe angle
   - Soft CTA
   - Disclosure text
   - Readiness level
   - Conversion data later, not in v1

6. Experiment Board
   - Hook tests
   - Format tests
   - CTA tests
   - Visual style tests
   - Posting time tests
   - Kill/double-down decisions

7. Metrics Dashboard
   - Impressions
   - Reach
   - Saves
   - Shares
   - Comments
   - Profile visits
   - Follows
   - Link clicks
   - Sales, when available
   - Follows per 1,000 reach
   - Saves per 1,000 reach
   - Shares per 1,000 reach

8. Partner Workflow
   - Two users initially: founder and partner
   - Roles should support ownership, review, production, scheduling, and metric entry
   - The tool should show who owns the next action

9. Compliance Layer
   - AI-generated content disclosure
   - Affiliate disclosure
   - Health/fitness claim safety
   - Finance claim safety
   - No fake product usage or fake personal results

## Operational Strategy

First 30 days should likely be:

- 6 personas active: 3 per operator
- Instagram first
- Daily image or carousel per active persona if sustainable
- 2 short videos per day, distributed intentionally
- Track data manually at first
- Decide after 14 and 30 days which lanes deserve more output

Potential first metric targets should be defined later, but likely include:

- Follows per 1,000 reach
- Saves per 1,000 reach
- Shares per 1,000 reach
- Profile visit rate
- Content completion for carousels, if available
- Link clicks only as secondary metric in the first phase

## User Preferences And Style

- The user wants direct mentor-style guidance.
- The user described needing a mentor, "Meister Yoda", "Sifu", and "Sensei".
- They have high expectations and may go full-time if the opportunity proves strong.
- They expect to invest at least 3-4 hours per day.
- A partner is expected to join, which changes the system into a two-operator workflow.
- The user prefers independent personas, not visible network branding.
- The user wants to avoid restarting from zero in future sessions.

## Open Questions

- What exact Instagram accounts exist today, if any?
- Which of the 20 personas already have strong visual consistency?
- What is the partner's actual weekly capacity?
- What are the first 30-day metric targets?
- Which affiliate networks/programs are realistic for the first month?
- Should the provisional Startwelle 1 stay David/Zara/Luna plus Alex/Sophie/Emma, or should scoring swap one of them before activation?
- Which concrete post exports should be produced first from the 6 launch-pack prompt slots?

## Sources Consulted During Office Hours

- Meta AI labeling:
  - https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/
- Meta AI disclosure context:
  - https://about.fb.com/news/2026/02/meta-prepares-for-2026-us-midterms/
- TIME on AI influencers:
  - https://time.com/7329699/ai-influencers-tiktok-granny-spills/
- WhoWhatWear skincare trends 2026:
  - https://www.whowhatwear.com/beauty/skin/skincare-trends-2026
- Apify top AI Instagram creators 2026:
  - https://blog.apify.com/top-ai-instagram-influencers/
