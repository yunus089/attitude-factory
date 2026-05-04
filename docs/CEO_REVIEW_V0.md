# CEO Review v0: Attitude Factory Operator OS

Last updated: 2026-05-01

Update 2026-05-01:

- The original CEO review assumed a solo-style 3-persona operating test.
- This is superseded by `docs/PERSONA_PORTFOLIO_V0.md`.
- The active launch wave is now 6 personas because the team has 2 operators: 3 personas per operator.
- All 20 personas from `PERSONAS.docx` remain visible in the portfolio backlog.

## Review Setup

Input plan:

- `docs/PRODUCT_BRIEF_V0.md`

Chosen implementation approach:

- **A: Private MVP, Single-Workspace**

Chosen review mode:

- **Selective Expansion**

Accepted expansion items:

1. Manual Decision Engine v1
2. Persona Consistency Lab v1
3. Research Inbox v1
4. Offer Readiness instead of full Offer Ledger
5. 30-Day War Room
6. Lightweight Partner Accountability

## CEO Verdict

The plan is directionally right, but the MVP must become sharper.

The biggest correction is this:

> v1 is not an agency SaaS, not a public creator platform, and not a full monetization CRM. v1 is a private two-person operating system for proving whether six independent AI personas can create measurable Instagram reach momentum in 30 days.

The accepted expansions are not bloat. They are the parts that make the product actually deserve the name "Operator OS":

- Manual decisions
- Persona consistency
- Research input
- Offer readiness
- War-room pressure
- Partner accountability

The items to cut or downgrade are:

- Full Offer Ledger
- Multi-workspace architecture
- Billing / SaaS onboarding
- Automated platform posting
- Full revenue analytics
- Fully automated trend research

## Dream State Delta

```text
CURRENT STATE
  20 persona concepts in a DOCX
  10 embedded persona images
  no operating system
  no shipped dashboard
  no hard 30-day measurement loop

        |
        v

THIS PLAN
  private Operator OS for 2 users
  6 active personas
  daily production queue
  manual decision engine
  consistency lab
  research inbox
  war room
  manual metrics
  offer readiness

        |
        v

12-MONTH IDEAL
  proven AI creator portfolio engine
  20+ personas
  repeatable content and asset production
  cross-platform repurposing
  monetization playbooks per persona lane
  optional agency/SaaS productization only after proof
```

## What Already Exists

- `docs/ATTITUDE_FACTORY_CONTEXT.md`
  - Strategy memory and durable project context.
- `docs/PRODUCT_BRIEF_V0.md`
  - Product brief with strategy, modules, data model, and roadmap.
- `assets/personas_media/`
  - Extracted embedded persona images from `PERSONAS.docx`.
- `AGENTS.md` and `CLAUDE.md`
  - Agent memory and continuity instructions.

No application code exists yet. This is good: the review can still shape the product before architecture hardens.

## Not In Scope For v1

- Multi-tenant agency SaaS
  - Deferred until Attitude Factory proves its own operating workflow.
- Billing and public onboarding
  - No external customers yet.
- Automated Instagram posting
  - Too much account and platform risk for v1.
- Full Offer Ledger / revenue CRM
  - Replaced by lightweight Offer Readiness.
- Full trend automation
  - Replaced by manual Research Inbox v1.
- Full AI generation integrations
  - Existing external subscriptions are used manually first.
- All 20 personas active at the same time
  - Data model supports all 20 as visible portfolio records, but the 30-day test operates 6 active personas.

## Section 1: Architecture Review

### Required v1 Architecture

```text
Browser
  |
  v
Private Web App on attitude-factory.com
  |
  +-- Auth / Session
  |
  +-- Command Center
  |     +-- Today Queue
  |     +-- Decision Engine
  |     +-- 30-Day War Room
  |
  +-- Persona OS
  |     +-- Persona Profiles
  |     +-- Consistency Lab
  |
  +-- Content Factory
  |     +-- Content Items
  |     +-- Review Flow
  |     +-- Owner / Due Date / Blockers
  |
  +-- Research Inbox
  |
  +-- Metrics Entry
  |
  +-- Offer Readiness
  |
  +-- Compliance Checks
  |
  v
Database
  |
  +-- users
  +-- personas
  +-- platform_accounts
  +-- content_items
  +-- assets
  +-- metric_snapshots
  +-- experiments
  +-- research_items
  +-- offer_readiness_items
  +-- compliance_checks
  +-- tasks
  +-- video_slots
  +-- decision_logs
```

### Findings

1. The Product Brief still contains agency-ready artifacts after the user chose Private MVP.
   - Fix: make single-workspace the v1 architecture; move Workspace/multi-tenant to future.

2. Decision Engine must be first-class.
   - Fix: add explicit `DecisionSignal` or `DecisionLog` behavior to the MVP, even if implemented as computed labels first.

3. War Room should not be buried inside Metrics.
   - Fix: make it a top-level Command Center mode or primary home card group.

4. Offer Ledger is too heavy for v1.
   - Fix: replace with Offer Readiness.

## Section 2: Error And Rescue Map

| Codepath | What Can Go Wrong | Rescue Action | User Sees |
|---|---|---|---|
| Login | wrong credentials | reject and rate-limit | "Invalid email or password" |
| Session | expired session | redirect to login | "Please sign in again" |
| Content save | missing persona/status | validation error | field-level error |
| Content save | double submit | idempotent save or disabled button | no duplicate item |
| Asset upload | file too large | reject before storing | "File is too large" |
| Asset upload | unsupported type | reject | "Use JPG, PNG, WEBP, or MP4" |
| Asset upload | disk full | fail loudly, log critical | "Upload failed, storage issue" |
| Metrics entry | negative numbers | validation error | field-level error |
| Metrics entry | duplicate snapshot | update existing or ask confirmation | "Metrics already exist for this time" |
| URL save | malformed URL | validation error | "Enter a valid URL" |
| Decision Engine | missing metrics | label as insufficient data | "Needs metrics" |
| Decision Engine | zero reach | avoid divide-by-zero | "No reach yet" |

Critical gap if not added:

- Upload and metric-entry failures cannot silently fail. If an asset or metric disappears, the system destroys operator trust.

## Section 3: Security And Threat Model

Key threats:

- Unauthorized access to private personas and strategy.
- Weak login on a public domain.
- Asset upload abuse.
- Path traversal through file names.
- Script injection through captions, hooks, notes, URLs, or research items.
- Accidental exposure of persona assets.
- No backups on VPS.

Required v1 security posture:

- HTTPS only.
- Passwords hashed, never stored plain.
- Session expiration.
- Role checks for founder/operator actions.
- Upload file type and size validation.
- Store uploads outside executable paths or serve through controlled public asset paths.
- Sanitize rendered user text.
- Environment variables for secrets.
- Daily database backup.
- Manual recovery instructions.

## Section 4: Data Flow And Interaction Edge Cases

### Content Creation Flow

```text
Idea -> Validate -> Save ContentItem -> Assign Owner -> Review -> Ready To Post
  |       |             |                  |           |
  |       |             |                  |           +-- rejected -> back to draft
  |       |             |                  +-- missing owner -> founder queue
  |       |             +-- db error -> visible failure + log
  |       +-- empty hook/title -> field error
  +-- no persona -> field error
```

Edge cases:

- Empty persona list: show onboarding state.
- No active 30-day test: show start-war-room CTA.
- Post has metrics but no content item: allow manual standalone record or reject.
- User navigates away mid-edit: warn if unsaved changes.
- Two users edit same content: last-write warning or updated timestamp check.
- Content marked posted without URL: allow, but mark URL missing.

## Section 5: Code Quality Review

No code exists yet, so the plan must define boundaries before implementation.

Recommended module boundaries:

- Auth
- Personas
- Content
- Assets
- Metrics
- Decisions
- War Room
- Research
- Offer Readiness
- Compliance
- Tasks / Accountability

Avoid:

- One giant dashboard component.
- One generic `items` table for everything.
- Mixing captions, metrics, assets, and decisions into one unstructured JSON blob.
- Building SaaS abstractions before there is SaaS proof.

## Section 6: Test Review

Minimum test plan for v1:

- Auth
  - login succeeds
  - login fails
  - protected pages redirect when not authenticated
- Personas
  - create/update persona
  - inactive persona does not appear in active queue
- Content Factory
  - create content item
  - status transition works
  - invalid transition is blocked
  - owner/due date/blocker display correctly
- Assets
  - valid upload accepted
  - invalid upload rejected
  - asset can be attached to persona/content
- Metrics
  - metrics can be entered
  - derived rates handle zero reach
  - duplicate snapshot behavior is defined
- Decision Engine
  - missing metrics -> Needs Metrics
  - strong save/follow signal -> Winner Candidate
  - weak signal -> Weak Signal
- War Room
  - day counter works
  - day 14/day 30 decisions appear
- Compliance
  - required checklist blocks Ready To Post when incomplete, if configured

## Section 7: Performance Review

Likely bottlenecks:

- Large image/video uploads on VPS storage.
- Unpaginated asset library.
- Dashboard queries across many metrics snapshots.
- Thumbnail generation if added later.

Required v1 constraints:

- Pagination for assets/content.
- Maximum upload size.
- Index content by persona, status, planned date, owner, and posted date.
- Index metric snapshots by content item and captured date.
- Use thumbnails later if full-size images make the dashboard slow.

## Section 8: Observability And Debuggability Review

v1 needs basic operational visibility:

- Login failures logged.
- Upload failures logged.
- Metric save failures logged.
- Decision Engine labels explain why they appear.
- DecisionLog records kill/iterate/double-down decisions.
- Backup success/failure visible somewhere.

The most important debug feature is not a technical log. It is a human-readable DecisionLog:

> We doubled down on David's workflow carousel format because it beat portfolio median saves per 1,000 reach for 3 posts.

## Section 9: Deployment And Rollout Review

VPS rollout risks:

- No staging environment.
- Database migration mistakes.
- Upload directory permissions.
- Domain/SSL misconfiguration.
- No rollback plan.

Required v1 deployment plan:

- Use environment variables for secrets.
- One command or documented sequence for deploy.
- Database backup before migrations.
- Upload directory backed up.
- Health check page or simple authenticated smoke test.
- Rollback: previous release + database backup restore instructions.

## Section 10: Long-Term Trajectory Review

Private MVP is the right immediate cut, but must not block future productization.

Reversibility:

- Single workspace is reversible if data models avoid hardcoding user-specific logic everywhere.
- Offer Readiness can grow into Offer Ledger later.
- Manual Research Inbox can grow into Trend Radar later.
- Manual Decision Engine can grow into scoring/AI recommendations later.

Future-proof without overbuilding:

- Use explicit tables/entities.
- Keep `workspace_id` out of v1 if speed matters, but keep naming clean enough to add it later.
- Keep roles simple: founder/operator.
- Keep future SaaS in docs, not v1 code.

## Section 11: Design And UX Review

The UX must feel like a serious operating cockpit, not a social media toy.

### Primary User Flow

```text
Login
  |
  v
Command Center
  |
  +-- 30-Day War Room
  |     +-- today output
  |     +-- current winner
  |     +-- weakest lane
  |
  +-- Today Queue
  |     +-- my tasks
  |     +-- partner tasks
  |
  +-- Decisions
        +-- needs metrics
        +-- winner candidate
        +-- weak signal
        +-- video slot candidate
```

Design risks:

- Too many top-level tabs will make v1 feel bigger than the actual operation.
- Persona pages can become visually chaotic if each creator has a different aesthetic inside the same app.
- Metrics can become vanity theater unless decisions are attached.

Design recommendations:

- Home = Command Center / War Room.
- Use dense operational layout, not marketing-style cards.
- Keep persona aesthetics visible in controlled swatches/reference areas, not across the whole app shell.
- Every chart/card should answer "what should we do next?"

## CEO Review Summary

Status:

- **DONE_WITH_CONCERNS**

## Follow-up CEO Decision: Dual-Track Launch

Date: 2026-04-30

After design and engineering review, the implementation posture was challenged again.

Decision:

- **C: Dual-Track - Operator OS + 30-Tage-Launch-Pack**

Reason:

- Social scheduling, analytics, media libraries, and approval workflows are commodity.
- The product only becomes valuable if it drives daily production, measurement, and kill/iterate/double-down decisions.
- Building the app without a parallel launch pack risks becoming sophisticated procrastination.

Operational consequence:

- Milestone 0 and Milestone 1 begin immediately.
- In parallel, the first 30-day operating test is prepared around a 6-persona launch wave, with Zara Patel, Alex Moreno, and David Chen as anchor personas rather than the complete launch set.
- The first 7 days of content, seed data, content pillars, metrics rhythm, and decision gates must feed the app from the start.

Reference:

- `docs/DUAL_TRACK_LAUNCH_PLAN_V0.md`

Resolved by Product Brief update after review:

- Product Brief now reflects Approach A: Private MVP, Single-Workspace.
- Accepted expansions are now in MVP scope.
- Offer Ledger is downgraded to Offer Readiness for v1.
- Multi-workspace SaaS architecture is deferred to future productization.
- v1 security and deployment requirements were added.

Remaining unresolved decisions:

- Tech stack is not chosen yet.
- Exact auth model is not chosen yet.
- Asset storage path/backups need engineering review.
- Visual design direction needs design consultation.

Critical gaps before implementation:

1. Tech stack, database, auth, asset storage, backup, and deployment choices must be decided in `/plan-eng-review`.
2. UI information architecture and visual direction must be decided in `/design-consultation`.
3. The 30-day operating metrics and decision thresholds should be finalized before implementation or during seed-data design.

Recommended next reviews:

1. `/design-consultation` for design system and UI direction.
2. `/plan-eng-review` for stack, database, auth, deployment, tests, and VPS rollout.
