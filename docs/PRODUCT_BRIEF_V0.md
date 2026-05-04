# Produktbrief v0: Attitude Factory Operator OS

Last updated: 2026-04-30

## Ein-Satz-These

Attitude Factory Operator OS ist ein privates Mission-Control-Dashboard, mit dem ein Portfolio unabhängiger KI-Influencer-Personas aufgebaut, betrieben, gemessen und skaliert wird: zuerst für Instagram-Reichweite, später für Affiliate-Umsatz, UGC, Branding und agenturähnliche Monetarisierung.

## Sprachentscheidung

Das Produkt wird Deutsch-first entwickelt, weil der Partner kein Englisch spricht und die Bedienung ohne Übersetzungsstress funktionieren muss.

Verbindlich:

- UI, Navigation, Buttons, Statuslabels, Tabellen, leere Zustände, Fehlermeldungen und Seed-Daten sind Deutsch.
- Fachbegriffe werden in `docs/SPRACHE_UND_BEGRIFFE.md` gepflegt.
- "Attitude Factory" und "Operator OS" bleiben als Marken-/Produktnamen erlaubt.
- Technische Framework-Begriffe dürfen Englisch bleiben, wenn das die Entwicklung klarer macht.
- In der Oberfläche wird "Command Center" zu "Kommandozentrale", "30-Day War Room" zu "30-Tage-Kommando", "Content Factory" zu "Content-Produktion", "Research Inbox" zu "Recherche-Eingang", "Metrics" zu "Kennzahlen" und "Compliance" zu "Regelcheck".

## Product Position

This is not a generic social media calendar and not a simple persona database.

It is an operator system for answering the daily question:

> Which persona, content idea, asset, experiment, or offer deserves the next unit of human and AI production time?

The first customer is Attitude Factory itself: the user plus one partner. The product should still be designed with product-quality information architecture, reusable data models, and clean UX, because it may later become usable by other AI creator operators, UGC teams, or micro-agencies.

CEO review decision:

- v1 will use the **Private MVP, Single-Workspace** approach.
- The app should feel product-quality, but v1 should not implement agency SaaS architecture, multi-tenancy, billing, or public onboarding.
- Future productization remains a strategic option, not a v1 requirement.

## Strategic Context

Attitude Factory owns a portfolio concept with 20 AI influencer personas. The first market is Instagram. The long-term ambition is to grow reach, monetize with affiliate and brand/UGC opportunities, scale to more personas, and eventually expand across platforms and countries.

Current available resources:

- Domain: `attitude-factory.com`
- Hosting: Hostinger VPS KVM2
- AI subscriptions: Google AI Pro, GPT Plus / Codex, Leonardo.ai
- Existing persona document: `C:/Users/yunus/Downloads/PERSONAS.docx`
- Existing embedded persona imagery extracted to `assets/personas_media/`
- Production capacity: image/carousel focused, plus about 2 short videos per day at up to about 10 seconds each

## Core Bet

The first 30 days should prove whether a small operator team can use structured AI-assisted production to grow independent persona accounts faster than manual improvisation.

The first phase is reach-first and affiliate-ready:

- Optimize for reach, followers, saves, shares, and profile visits.
- Prepare affiliate infrastructure without forcing every post into a sales pitch.
- Track manual metrics first.
- Avoid risky Instagram automation and unofficial posting flows at the start.

## Strategic Option Space

There are several plausible products hiding inside this idea. Keep them visible so the team does not accidentally build the wrong one.

### Option A: Internal Operator OS

Build only for Attitude Factory's own two-person team.

Pros:

- Fastest path to useful execution.
- Every feature can match the actual daily workflow.
- No need for billing, onboarding, workspace administration, public docs, or generalized settings.

Cons:

- Product decisions may become too personal to the team.
- Harder to sell later if the data model becomes too custom.
- External users will need cleanup before they can use it.

Best if:

- The first priority is proving the influencer portfolio can grow and monetize.

### Option B: Agency-Ready Operator OS

Build a private tool that is still structured like a future agency SaaS.

Pros:

- Clean data model from day one.
- Roles, workspaces, assets, metrics, and experiments can later support other teams.
- The product can become a second business line if Attitude Factory proves the workflow.

Cons:

- Slightly more design discipline needed upfront.
- Risk of overbuilding settings, roles, and abstractions before proof.

Best if:

- The user wants a serious product-like dashboard without losing speed.

CEO review decision:

- Choose Option A for v1: Private MVP, Single-Workspace.
- Preserve Option B/C as future paths only after the 30-day operating test creates proof.

### Option C: Public AI Creator Platform

Build a platform other people use to create and operate AI influencers.

Pros:

- Bigger SaaS upside.
- Could monetize with subscriptions or usage-based AI workflows.
- Could become a category product if the market matures.

Cons:

- Much slower.
- Requires onboarding, payments, support, reliability, AI integrations, moderation, and legal work.
- Distracts from the user's real money engine: building the portfolio first.

Best if:

- Attitude Factory already has proof that its workflow generates reach or revenue.

Current recommendation:

- Do not build this yet. Preserve the option, but do not pay its complexity cost in v1.

## First Active Personas

The system should support 20+ personas, and the first operating test now starts with 6 active lanes because there are 2 operators:

1. 3 active personas owned by the founder
2. 3 active personas owned by the partner
3. all remaining personas visible in the portfolio backlog

Zara Patel, Alex Moreno and David Chen remain anchor personas, but they are no longer the complete launch set.

Binding source for the 20-person portfolio and launch wave: `docs/PERSONA_PORTFOLIO_V0.md`.

## Audience Model

Primary internal users:

- Founder / Creative Director
  - Owns strategy, persona selection, content thesis, monetization direction, final approval, kill/double-down decisions.

- Partner / Operator
  - Owns production tasks, asset generation, scheduling preparation, metric entry, research support, and pipeline hygiene.

Future external users, if productized:

- AI influencer operators
- UGC studios
- Small creator agencies
- Affiliate content teams
- Brand-side experimental content teams

The MVP should not build billing, public onboarding, or full multi-tenant SaaS yet. It should use clean boundaries so these can be added later.

## Product Surface Options

### Surface 1: Pure Dashboard

A classic web app with tables, cards, filters, and detail pages.

Use for:

- Personas
- Content pipeline
- Metrics
- Offers
- Experiments

Risk:

- Can become a boring admin panel that stores data but does not create action.

### Surface 2: Command Center

A daily operating cockpit with priorities, blockers, winners, and decisions.

Use for:

- Daily production meetings
- Partner coordination
- Video slot allocation
- Kill/double-down decisions

Risk:

- Requires clear scoring logic. Without good data, it may feel theatrical.

### Surface 3: Studio Workflow

A production-oriented flow for turning one idea into assets, copy, review, and posting.

Use for:

- Content creation
- Prompt history
- Asset reviews
- Carousel planning
- Short video planning

Risk:

- Can become too slow if every post needs too many steps.

### Surface 4: Strategy Layer

A higher-level board for portfolio strategy, lanes, monetization, and growth bets.

Use for:

- Weekly review
- Persona selection
- Offer selection
- Content wedge refinement
- Portfolio expansion

Risk:

- Can become too abstract if not connected to actual post performance.

Current recommendation:

- v1 needs all four surfaces, but in simple form:
  - Command Center as home
  - Dashboard/detail pages for data
  - Studio workflow inside Content Factory
  - Strategy layer inside Persona and Experiment reviews

## Non-Negotiable Product Principles

1. Decision-first, not storage-first
   - Every screen should help decide what to make, publish, measure, kill, or double down on.

2. Independent creator illusion
   - Attitude Factory stays invisible to audiences at first. Each persona must have its own voice, world, handle, identity, and content logic.

3. Reach before monetization pressure
   - Affiliate offers are tracked early, but the system should not turn new accounts into obvious ad machines.

4. Manual before dangerous automation
   - Planning, production, and analytics can be internal. Posting should initially be manual or use official platform tools.

5. Compliance is part of the workflow
   - AI-generated content disclosure, affiliate disclosure, health/fitness claim safety, finance claim safety, and no fake product-use claims should be encoded into the system.

6. Built for 6 active lanes, modeled for 20+
   - The first execution should stay focused at 3 personas per operator. The database and UI should not collapse when the portfolio expands.

7. Video is a scarce resource
   - With about 2 short videos per day, video slots must be assigned intentionally to the highest-learning opportunity.

## MVP Scope

The first useful version should include:

- Authentication for 2 users
- Command Center
- 30-Day War Room
- Manual Decision Engine v1
- Persona OS
- Persona Consistency Lab v1
- Content Factory
- Asset Library
- Video Slot System
- Manual Metrics Dashboard
- Experiment Board
- Offer Readiness
- Research Inbox v1
- Compliance Checklist
- Lightweight Partner Accountability

The first version should not include:

- Automated Instagram posting
- Unofficial scraping or bot workflows
- Full multi-tenant agency billing
- Multi-workspace agency architecture
- Public landing page for selling the tool
- Complex AI generation integrations
- Fully automated trend research
- TikTok/YouTube/Facebook-specific pipelines beyond basic future-platform fields
- Full Offer Ledger / affiliate revenue CRM

## Information Architecture

Primary navigation:

- Kommandozentrale
- 30-Tage-Kommando
- Personas
- Content-Produktion
- Medien
- Experiments
- Kennzahlen
- Angebots-Check
- Recherche
- Regelcheck
- Einstellungen

### Command Center

The home screen should answer:

- What must be done today?
- Which personas are active?
- Which content pieces are blocked?
- Which experiments are running?
- Which post is winning?
- Which persona deserves the next video slot?
- Which decisions are waiting for founder approval?

Suggested cards:

- 30-Day War Room status
- Today's production queue
- Active persona health
- Video slots remaining
- Posts waiting for metrics
- Top winner this week
- Biggest underperformer
- Pending approvals
- Compliance warnings

Command Center should not be a decorative analytics overview. It should be a decision surface.

Suggested priority logic:

- Show blocked items first.
- Show today/tomorrow production queue.
- Show items waiting for founder approval.
- Show posts missing metrics.
- Show experiments near decision threshold.
- Show the strongest recent winner.
- Show the weakest active lane.
- Show available video slots.

Possible "Next Best Action" categories:

- Produce asset
- Review content
- Enter metrics
- Assign video slot
- Pick winning hook
- Kill underperforming format
- Create affiliate-ready variant
- Reuse winning concept for another persona
- Pause persona lane

### 30-Day War Room

The War Room is the campaign view for the first operating test. It should be visible from the Command Center and answer:

- What day of the 30-day test is this?
- Which 6 personas are active?
- How much content has shipped?
- How many short video slots have been used?
- Which metrics are missing?
- Who is winning right now?
- Which lane is weakest?
- What did we learn this week?
- What decision is due on day 14 or day 30?

War Room fields:

- Test name
- Start date
- Current day
- Active personas
- Daily output target
- Posts shipped
- Videos used
- Missing metrics count
- Current winner
- Weakest lane
- Next decision date
- Notes / learnings
- Linked DecisionLog entries

### Personas

Each persona should have:

- Name
- Archetype
- Platform handles
- Status: draft, active, paused, killed, archived
- Lane / niche
- Target audience
- Feed enemies
- Differentiation thesis
- Visual identity
- Voice and tone
- Content pillars
- Banned claims
- Disclosure rules
- Offer fit
- Asset consistency notes
- Active experiments
- Recent performance summary

Persona detail should have tabs:

- Overview
- Identity
- Visual System
- Voice
- Content Pillars
- Feed Enemies
- Assets
- Posts
- Experiments
- Offers
- Compliance
- Metrics

Possible persona scores:

- Identity clarity score
- Visual consistency score
- Content repeatability score
- Reach signal score
- Monetization fit score
- Compliance risk score
- Operator confidence score

These scores can start manual. Automation can come later.

### Persona Consistency Lab

The Consistency Lab is part of each persona profile. It exists because AI creator trust depends on identity stability.

Track:

- Approved reference images
- Setcard images
- Rejected examples
- Prompt notes
- "Do not use" visual traits
- Face consistency rating: 1-5
- Style consistency rating: 1-5
- Crop suitability notes
- Approved look description

No automatic face recognition is required in v1. Manual review is enough.

### Content Factory

The production pipeline should manage:

- Content idea
- Persona
- Format: single image, carousel, short video, story, future platform variant
- Content pillar
- Hook
- Slide outline or shot idea
- Asset prompt
- Caption
- CTA
- Disclosure text
- Owner
- Status
- Planned date
- Posted URL
- Linked experiment
- Linked offer

Recommended status flow:

Idea -> Briefed -> Copy Drafted -> Assets Needed -> Assets Ready -> Review -> Scheduled/Ready To Post -> Posted -> Metrics Needed -> Analyzed -> Repurpose / Kill / Double Down

Alternative status flow for faster operations:

Idea -> Ready To Produce -> Review -> Ready To Post -> Posted -> Measured -> Decision

Recommendation:

- Use the full status model in the database.
- Let the UI show a simplified mode by default so daily work does not feel bureaucratic.

Content types:

- Single image
- Carousel
- Short video
- Story
- Bio/profile update
- Pinned post
- Future: TikTok short
- Future: YouTube Short
- Future: Facebook reel/post
- Future: newsletter or landing page content

Content intent:

- Reach
- Saves
- Shares
- Follows
- Trust-building
- Affiliate soft-test
- Affiliate hard-sell
- Persona world-building
- Trend participation
- Proof/authority building

Each content item should have one primary intent. Multiple intents create weak posts.

### Manual Decision Engine v1

The Decision Engine starts as deterministic labels based on manual status and metric data. It does not need AI in v1.

Decision labels:

- Needs Metrics
- Needs Review
- Winner Candidate
- Weak Signal
- Video Slot Candidate
- Double Down
- Kill / Pause
- Repurpose

Rules should be explainable. Every label must answer "why am I seeing this?"

Example:

- A post with no metric snapshot after being marked posted becomes `Needs Metrics`.
- A post above portfolio median on saves per 1,000 reach can become `Winner Candidate`.
- A post below median with no strategic reason can become `Weak Signal`.

### Assets

The asset library should track:

- Persona
- Asset type: reference, setcard, post image, carousel slide, short video, prompt, style guide
- Source tool: Leonardo.ai, Google AI, GPT/Codex, manual, other
- Prompt used
- Quality rating
- Consistency rating
- Usage rights / notes
- Linked content item
- File path or URL

Asset quality gates:

- Face consistency
- Hand/body artifact check
- Text artifact check
- Brand safety
- Crop suitability
- Persona fit
- Feed differentiation
- Reuse potential

Possible asset review statuses:

- Raw
- Candidate
- Approved reference
- Approved post asset
- Needs edit
- Rejected
- Archived

### Video Slot System

Because video capacity is limited, each video slot should have:

- Date
- Persona
- Content item
- Reason for slot assignment
- Expected learning
- Production status
- Published URL
- Result

The system should make it obvious if video slots are being wasted evenly instead of allocated by expected learning value.

Video slot allocation strategies:

1. Equal Rotation
   - Each active persona gets comparable access.
   - Good for early fairness.
   - Bad if one lane clearly deserves more learning.

2. Winner-Weighted
   - Stronger performing persona gets more video slots.
   - Good for accelerating signal.
   - Bad if it kills exploration too early.

3. Hypothesis-Driven
   - Slots go to the test with the best expected learning.
   - Good for disciplined experimentation.
   - Requires sharper decisions.

Recommendation:

- First 14 days: equal rotation with explicit exceptions.
- After day 14: hypothesis-driven with winner-weighting.

### Experiments

Experiments should be explicit, not hidden in random posts.

Each experiment should define:

- Hypothesis
- Persona
- Variable tested: hook, format, visual style, CTA, posting time, topic, offer
- Success metric
- Minimum sample size or time window
- Linked content pieces
- Result
- Decision: kill, iterate, double down, inconclusive

Experiment examples:

- Zara: ingredient education carousel vs aspirational beauty moodboard
- Zara: calm luxury cover vs bold myth-busting cover
- Alex: discipline quote image vs practical routine carousel
- Alex: gym anxiety content vs high-energy challenge content
- David: AI tool list vs workflow transformation
- David: screenshot-heavy tutorial vs clean conceptual carousel

Minimum viable experiment rule:

- One clear variable.
- One primary success metric.
- At least 3 linked posts or a clear time window.
- A written decision after measurement.

### Metrics

Manual metrics are enough for v1.

Track per post:

- Impressions
- Reach
- Likes
- Comments
- Saves
- Shares
- Profile visits
- Follows
- Link clicks
- Sales or commissions, if available
- Notes

Derived metrics:

- Follows per 1,000 reach
- Saves per 1,000 reach
- Shares per 1,000 reach
- Profile visit rate
- Link click rate
- Sales per 1,000 reach, later

Decision thresholds should start simple and be revised after real data exists.

Possible early labels:

- Winner: meaningfully above portfolio median on the primary intent metric
- Promising: above median but needs more sample
- Weak: below median and no qualitative reason to continue
- Inconclusive: too little reach or bad production quality
- Strategic: underperformed but supports identity, authority, or future monetization

Metric danger:

- Likes can mislead.
- Views without follows may be empty reach.
- Link clicks too early may hurt trust if the account has no audience foundation.
- Saves and shares are stronger early signs for carousel value.

### Offer Readiness

v1 should not build a full affiliate CRM. Use Offer Readiness instead: enough structure to keep monetization close without turning the first month into a sales dashboard.

Offer Readiness records should include:

- Persona
- Content item, optional
- Offer category
- Specific offer, optional
- Claim-safe angle
- Soft CTA idea
- Disclosure text
- Status
- Notes

Offer readiness levels:

- Level 0: no offer connected
- Level 1: category fit identified
- Level 2: specific affiliate program identified
- Level 3: compliant claim set prepared
- Level 4: soft CTA tested
- Level 5: conversion content tested
- Level 6: revenue validated

Offer strategy options:

1. Affiliate First
   - Push links early.
   - Fastest monetization test.
   - Risk: makes accounts feel transactional before trust exists.

2. Reach First, Affiliate Ready
   - Build audience and save/share behavior first.
   - Softly prepare offers.
   - Risk: revenue proof comes later.

3. Lead Magnet First
   - Collect emails or link-in-bio traffic with free guides/templates.
   - Strong for David, maybe later for Zara/Alex.
   - Risk: requires landing pages and more funnel work.

Recommendation:

- Use reach-first, affiliate-ready for all 3 lanes.
- Let David test lead magnets earlier than Zara or Alex.
- Defer full commission tracking, revenue dashboards, and affiliate CRM behavior to the monetization phase.

### Research Inbox

The Research Inbox is the input funnel for trends, competitors, hooks, visual references, and offer ideas.

Each research item should include:

- Source URL or note
- Optional screenshot / asset reference
- Persona fit
- Category: trend, competitor, hook, format, offer, visual style
- Why it matters
- Suggested content idea
- Owner
- Status: captured, reviewed, turned into idea, ignored

No automated trend discovery is required in v1. The goal is to prevent valuable inputs from being scattered across browser tabs, chats, and memory.

### Lightweight Partner Accountability

The partner workflow should stay simple but explicit.

Every actionable item should support:

- Owner
- Due date
- Review state
- Blocked reason
- "Waiting on me" / "Waiting on partner"
- Simple activity log

This applies to content items, assets, research items, video slots, and decision follow-ups.

### Compliance

Compliance should be embedded into content review.

Checks:

- AI-generated/synthetic disclosure considered
- Affiliate disclosure present when needed
- No fake personal product usage
- No fake transformation claim
- No medical claim
- No financial advice claim
- No deceptive scarcity or fake testimonial

Claim risk by persona:

- Zara: avoid medical skincare claims, fake product-use claims, and impossible before/after claims.
- Alex: avoid body transformation claims, supplement result claims, and medical/health promises.
- David: avoid guaranteed income/productivity claims and undisclosed affiliate incentives.
- Blake/Crypto, if activated later: high finance/compliance risk; do not start here.

Compliance should be a production accelerator, not a legal essay. The UI should show short checkboxes and warnings at the exact review moment.

## v1 Security And Deployment Requirements

The app will live on `attitude-factory.com` behind login. Even as a private MVP, it must be treated as sensitive because it contains persona strategy, unpublished assets, content plans, and monetization ideas.

Required v1 security posture:

- HTTPS only.
- Passwords hashed, never stored plain.
- Session expiration.
- Founder/operator role checks.
- Upload file type validation.
- Upload size limits.
- Store uploaded files in a controlled asset directory.
- Prevent path traversal through uploaded file names.
- Sanitize rendered user text in captions, notes, research items, and hooks.
- Keep secrets in environment variables.
- Do not expose persona assets publicly unless intentionally published elsewhere.

Required v1 deployment posture:

- Documented deploy sequence for the Hostinger VPS.
- Database backup before migrations or major deploys.
- Upload/asset directory backup.
- Basic authenticated smoke test after deploy.
- Rollback instructions.
- Visible failure state if uploads, metric saves, or login fail.

## Data Model Draft

Core entities:

- User
- Persona
- PlatformAccount
- ContentItem
- ContentAsset
- AssetFile
- Experiment
- MetricSnapshot
- Offer
- ComplianceCheck
- Task
- VideoSlot
- ResearchItem
- OfferReadinessItem
- DecisionLog

Future-only entities:

- Workspace
- TeamInvite
- BillingAccount
- ClientViewer

### User

Fields:

- id
- name
- email
- role
- status
- created_at

Initial roles:

- Founder
- Operator

Future roles:

- Admin
- Strategist
- Producer
- Analyst
- Reviewer
- Client Viewer

### Workspace (future only)

The user selected Private MVP, Single-Workspace for v1. Do not build multi-workspace behavior yet.

Future fields, when productization becomes real:

- id
- name
- domain
- plan_type
- settings

### Persona

Fields:

- id
- name
- public_name
- archetype
- lane
- niche
- status
- origin_story
- target_audience
- audience_pain
- audience_desire
- feed_enemies
- differentiation_thesis
- content_wedge
- visual_identity
- voice_rules
- banned_claims
- disclosure_rules
- monetization_notes
- priority_score
- created_at
- updated_at

### PlatformAccount

Fields:

- id
- persona_id
- platform
- handle
- profile_url
- status
- follower_count
- notes

### ContentItem

Fields:

- id
- persona_id
- owner_user_id
- format
- intent
- pillar
- hook
- brief
- outline
- caption
- cta
- disclosure
- status
- planned_date
- posted_at
- post_url
- experiment_id
- offer_id
- compliance_status
- decision

### ContentAsset / AssetFile

Fields:

- id
- content_item_id
- persona_id
- asset_type
- source_tool
- prompt
- file_path
- quality_rating
- consistency_rating
- status
- notes

### Experiment

Fields:

- id
- persona_id
- name
- hypothesis
- variable
- primary_metric
- start_date
- end_date
- status
- result
- decision

### MetricSnapshot

Fields:

- id
- content_item_id
- captured_at
- impressions
- reach
- likes
- comments
- saves
- shares
- profile_visits
- follows
- link_clicks
- sales
- revenue
- notes

### OfferReadinessItem

Fields:

- id
- persona_id
- content_item_id, optional
- category
- specific_offer_name, optional
- claim_safe_angle
- soft_cta
- disclosure_text
- status
- notes

### Task

Fields:

- id
- assignee_user_id
- related_entity_type
- related_entity_id
- title
- status
- due_date
- priority

### DecisionLog

Fields:

- id
- related_entity_type
- related_entity_id
- decision
- reason
- decided_by
- decided_at

## Workflow Details

### Daily Founder Workflow

1. Open Command Center.
2. Review blockers and pending approvals.
3. Check yesterday's metrics needing decisions.
4. Assign or confirm today's video slots.
5. Approve content ready for posting.
6. Decide one kill / iterate / double-down action if data supports it.

### Daily Partner Workflow

1. Open production queue.
2. Pick assigned content items.
3. Generate or collect assets.
4. Draft captions and CTAs.
5. Mark items ready for founder review.
6. Enter metrics for recently posted content.

### Weekly Review Workflow

1. Compare active personas.
2. Review winning and weak posts.
3. Review experiments reaching decision threshold.
4. Adjust video allocation.
5. Decide next week's content pillars.
6. Add or remove offers.
7. Write decisions into DecisionLog.

## Roadmap Options

### Phase 0: Brief And Design

- Product Brief
- CEO review
- Design system / UX direction
- Engineering plan

### Phase 1: Private MVP

- Login
- Command Center
- 30-Day War Room
- Manual Decision Engine v1
- Personas
- Persona Consistency Lab v1
- Content Factory
- Manual metrics
- Asset records
- Offer Readiness
- Research Inbox v1
- Compliance checklist
- Lightweight two-user accountability

### Phase 2: Operating Power

- Better dashboards
- Experiment scoring
- Content calendar view
- Bulk metric entry
- Saved prompt templates
- Automated persona consistency scoring
- Expanded research inbox

### Phase 3: Monetization Layer

- Full Offer Ledger
- Affiliate link tracking
- Offer performance
- Landing page ideas
- Lead magnets
- Revenue dashboard
- Deal pipeline for UGC/brand work

### Phase 4: Platform Expansion

- TikTok fields and workflows
- YouTube Shorts fields and workflows
- Facebook fields and workflows
- Cross-platform repurposing
- Platform-specific content rules

### Phase 5: Productization

- Multi-workspace support
- Team invitations
- Role-based permissions
- Public onboarding
- Billing
- Templates for other agencies
- Exportable reports

## Build Possibilities To Evaluate Later

These are not v1 commitments, but they should remain visible:

- AI prompt generator for each persona
- Hook generator tied to content pillar and feed enemy
- Persona consistency checker
- Trend inbox with manual curation
- Swipe-file library of competitor formats
- Auto-generated weekly review report
- Content calendar
- Link-in-bio mini-site builder per persona
- Affiliate offer scoring
- Brand deal CRM
- UGC package builder
- Multi-language persona expansion
- Landing pages for lead magnets
- Official platform API integrations where allowed
- Browser extension for saving inspiration posts
- Mobile-friendly production queue
- Approval notifications by email or Telegram/Discord

## Explicit Anti-Goals For v1

- Do not build a public creator marketplace.
- Do not build a full agency CRM.
- Do not automate risky platform actions.
- Do not require perfect AI integrations before the team can work.
- Do not activate all 20 personas operationally at the same time.
- Do keep all 20 personas visible as portfolio/backlog records.
- Do not optimize early dashboards around vanity metrics only.
- Do not let affiliate revenue pressure destroy trust before accounts have identity.

## First 30-Day Operating Plan

The first 30 days should test the machine, not the full platform vision.

Baseline:

- 6 active personas: 3 per operator
- Instagram first
- Daily image or carousel per active persona if production quality holds
- About 2 short videos per day, allocated intentionally
- Manual metric entry
- War Room used as the daily operating surface
- Decision Engine labels reviewed daily
- Weekly decision review

Review cadence:

- Daily: production queue and blocking issues
- Every 3 days: early post signal scan
- Day 14: first allocation decision
- Day 30: kill / pause / double-down decision per persona lane

Day 30 questions:

- Which persona has the strongest follow rate?
- Which persona has the strongest save/share behavior?
- Which content pillar should receive more output?
- Which visual style is most repeatable?
- Which lane is closest to monetization?
- Which persona should get more video slots?
- Should any persona be paused or replaced?

## Success Criteria For MVP

Product success:

- The user and partner can run a daily production meeting from the Command Center.
- The 30-Day War Room makes the current test status obvious within 10 seconds.
- Decision Engine labels make the next best actions visible without digging through tables.
- Every content piece has a visible owner, status, persona, format, and next action.
- The system makes it clear what should be produced today.
- The system makes it clear what performed well and what to do next.
- Manual metrics can be entered in under 2 minutes per post.
- The first 6 personas can operate without mixing their identities.
- Persona Consistency Lab prevents obviously inconsistent AI assets from reaching Ready To Post.
- Research Inbox can turn captured inputs into content ideas without losing source context.

Business learning success:

- After 30 days, the team can identify the strongest persona/content lane using data.
- The team can decide where to allocate scarce video capacity.
- The team has enough content and metrics to choose between kill, iterate, and double down.
- Affiliate readiness exists without damaging reach-first account growth.

## Product Risks

1. Overbuilding before audience proof
   - Mitigation: keep v1 focused on workflow, manual metrics, and decision loops.

2. Looking like an avatar farm
   - Mitigation: independent persona worlds, no visible umbrella brand, strict voice and visual separation.

3. Generic AI content
   - Mitigation: each persona needs feed enemies, content wedge, and banned generic formats.

4. False claims / compliance problems
   - Mitigation: mandatory claim and disclosure checks before content is marked ready.

5. Data entry burden
   - Mitigation: manual metrics form must be fast and focused; no vanity dashboards without decisions.

6. Video slots wasted
   - Mitigation: every video slot must have a reason and expected learning.

7. Partner workflow confusion
   - Mitigation: every item needs an owner, status, due date, and review state.

8. Product accidentally drifts back toward SaaS before proof
   - Mitigation: v1 is explicitly single-workspace; productization stays in roadmap, not implementation.

9. Dashboard shows data but does not drive action
   - Mitigation: Manual Decision Engine and War Room are first-class MVP scope.

## CEO Review Questions

CEO review completed in `docs/CEO_REVIEW_V0.md`.

Review decisions:

- Approach: Private MVP, Single-Workspace.
- Mode: Selective Expansion.
- Accepted expansions:
  - Manual Decision Engine v1
  - Persona Consistency Lab v1
  - Research Inbox v1
  - Offer Readiness instead of full Offer Ledger
  - 30-Day War Room
  - Lightweight Partner Accountability

Remaining follow-up reviews should pressure-test:

- Is "Operator OS" the right product framing, or should the first product be narrower?
- Is the first 30-day test aggressive enough?
- Are the provisional 6 launch-wave personas correct?
- Does product-like architecture create useful leverage, or does it slow the first proof?
- What is the 10-star version of this if it works?
- What should be explicitly cut from v1?
- What would make Attitude Factory defensible if AI influencer creation becomes commoditized?

## Design Review Questions

The later design phase should answer:

- What should an operator dashboard for AI creator portfolios feel like?
- How do we make it serious and high-leverage without looking like a generic SaaS admin panel?
- How do we show persona worlds without making the internal tool visually chaotic?
- What density is right for daily operations?
- How should risk/compliance warnings appear without slowing production?

## Engineering Review Questions

Engineering review completed in `docs/ENGINEERING_PLAN_V0.md`.

Review decisions:

- Stack: Next.js App Router + TypeScript + PostgreSQL + Prisma + Better Auth + Docker Compose + Caddy.
- Auth: E-Mail/Passwort, Datenbank-Sessions, Rollen, kein öffentlicher Sign-up.
- Medien: VPS-Dateisystem plus Datenbank-Metadaten.
- Datenmodell: V1-Kernmodell ohne Workspace/Billing/Client-Viewer.
- Build-Umfang: Phase 1 vollständig, aber in Milestones.
- Deployment: Hostinger VPS KVM2 mit Docker Compose, Caddy HTTPS und Backup-Scripts.

## Current Decision

CEO review, design direction, language decision, and engineering plan are complete enough to proceed to implementation.

Final CEO readiness decision:

- **C: Dual-Track - Operator OS + 30-Tage-Launch-Pack**

Meaning:

- Build the app now.
- Prepare the first 30-day launch operation in parallel.
- Use the 6 launch-wave personas plus the first 7-day content raster as real seed and working data.
- Do not let app-building delay content-market learning.

Next recommended steps:

1. Start Milestone 0 from `docs/ENGINEERING_PLAN_V0.md`.
2. Use `docs/DUAL_TRACK_LAUNCH_PLAN_V0.md` as the parallel launch-operation source.
3. Build in milestone order: foundation, auth/app shell, data core, operations, decisions/control modules, deployment.
4. Keep German-first product language as a hard engineering requirement.
