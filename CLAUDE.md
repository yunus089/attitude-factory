# Claude / Agent Context

This project is Attitude Factory Mission Control.

Read these files before continuing any strategic, design, or implementation work:

1. `AGENTS.md`
2. `docs/ATTITUDE_FACTORY_CONTEXT.md`
3. `docs/SPRACHE_UND_BEGRIFFE.md`
4. `docs/ENGINEERING_PLAN_V0.md`

The user wants persistent continuity. Do not restart from generic AI influencer advice. Continue from the saved context and update `docs/ATTITUDE_FACTORY_CONTEXT.md` whenever important strategic decisions change.

## Language

The product is German-first. All user-facing UI, copy, status labels, demo data, validation text, and workflow language must be written in German from the beginning. Use `docs/SPRACHE_UND_BEGRIFFE.md` as the canonical glossary.

## Design System

Always read `DESIGN.md` before making any visual or UI decisions.
All font choices, colors, spacing, density, motion, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that does not match `DESIGN.md`.

## Engineering Plan

The approved stack is Next.js App Router + TypeScript + PostgreSQL + Prisma + Better Auth + Docker Compose + Caddy.
Implement from `docs/ENGINEERING_PLAN_V0.md` in milestone order unless the user explicitly changes direction.

## Final CEO Readiness Decision

The user chose **C: Dual-Track**.

Build Operator OS now, but prepare the 30-Tage-Launch-Pack in parallel so the app is filled with real operating data. The operating model is now 2 operators x 3 active personas, while all 20 personas remain visible in the portfolio backlog. Use `docs/DUAL_TRACK_LAUNCH_PLAN_V0.md` and `docs/PERSONA_PORTFOLIO_V0.md` as binding sources.

## Current Implementation Status

Milestone 0, Milestone 1, and Milestone 2 are in place:

- Next.js 16 + TypeScript
- Tailwind CSS 4 via PostCSS
- Prisma 7 schema and config
- Local Docker Desktop + Docker Compose Postgres on port `5437`
- Prisma migration `20260430212915_init_operator_os_auth` applied
- Prisma migration `20260501005148_persona_portfolio_core` applied
- Better Auth with E-Mail/Passwort, DB sessions, no public sign-up
- Protected app shell with `AUTH_ENFORCED=true`
- Seed users for `gruender` and `operator`
- Docker Compose and Caddy drafts
- Static `/kommandozentrale` screen with German-first UI
- `/anmelden` screen with private Kontrollraum-Schleuse design and real login
- EmptyState component and mobile Heute-Queue cards
- Typed `src/domain/persona-portfolio.ts` source for all 20 personas
- Idempotent `scripts/seed-personas.ts` for all 20 personas and Instagram PlatformAccount rows
- Seeded local DB state: 20 personas, 6 launch-wave personas, 14 backlog personas, 3 Gründer lanes and 3 Partner lanes
- DB-backed `/personas`, `/content-produktion`, and `/medien`
- Playwright desktop/mobile tests for auth, Kommandozentrale, Personas, Content-Produktion, and Medien

Verification after Milestone 3 launch-pack wiring:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run test` passes.
- `npm run test:e2e` passes on desktop and mobile.
- `npm run build` passes.

Milestone 3 launch-pack seed is now in place:

- Typed source: `src/domain/launch-pack.ts`
- Idempotent seed: `scripts/seed-launch-pack.ts`
- Local DB contains 6 first ContentItems, 6 production tasks, ComplianceCheck rows, 4 verified Setcards, 6 Prompt-Spuren, 2 VideoSlots, and `30-Tage-Startwelle 1`
- `/content-produktion` shows real launch-pack rows and counts real VideoSlot rows in the summary
- Prompt-only assets correctly remain `Material fehlt`; they are not treated as final post material
- `/medien` shows 4 safe Setcards and 6 Prompt-Historie records; Sophie Larue and Emma Winters intentionally remain without fake-finished Setcards

Milestone 3 Postmaterial-Workflow V1 is now in place:

- `src/domain/post-material-upload.ts` validates material type, status, MIME type, size limit, safe extension, and content-status transition.
- `src/lib/upload-storage.ts` resolves guarded upload paths and prevents path traversal.
- `/api/uploads/[...path]` serves local uploaded files only through the app/auth boundary.
- `/content-produktion` has a German-first Postmaterial-Schleuse for Postbild, Carousel-Slide, and Kurzvideo uploads.
- Uploaded candidate or approved material links to ContentItem and Persona, appears in `/medien`, and moves the content item to `Material bereit`.
- Unit and Playwright coverage exists for validation, storage path safety, and the desktop/mobile upload flow.

Strategy documents extracted from `chat.md`:

- `docs/LAUNCH_DOCTRINE_V1.md` is the active 30-day operating doctrine: 6 active personas, image/carousel baseline, 2 video slots, originality, trigger taxonomy, KPI logic, compliance, and kill/scale decisions.
- `docs/FEATURE_BACKLOG_FROM_CHAT.md` is the feature translation layer: Postmaterial-Workflow is implemented; remaining P0 focus is Kennzahlen-Eingabe, live 30-Tage-Kommando, Trigger-Tags, and Originalitäts-Check.

Next focus: continue Milestone 3 in this order: Kennzahlen-Eingabe V1, live 30-Tage-Kommando/Kommandozentrale wiring, then Trigger-Tags and Originalitäts-Check.

## Latest Design Review

`/plan-design-review` completed on 2026-04-30.

Design completeness moved from 7.5/10 to 9/10. Important rules now in `DESIGN.md`:

- Kommandozentrale is Arbeitsboard first, not campaign hero.
- Empty/Error/Partial states use operative state plus short mentor explanation.
- One shared Kommandozentrale with role-focused priority.
- Same shell, unique module work logic.
- Mobile is a full app, so tables need card/list variants.
- `/anmelden` is a private Kontrollraum-Schleuse, not a public SaaS page.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
