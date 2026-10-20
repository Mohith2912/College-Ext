# Aetheria Study Companion — Antigravity Master Handoff

Last verified: 25 September 2026  
Repository: https://github.com/Mohith2912/College-Ext  
Production: https://college-ext-users.vercel.app  
Branch: `main`  
Current revision when this document was created: `9cc7ead`

## 1. Continuation brief for Antigravity

Continue developing **Aetheria**, an independent study companion. Work directly in this repository and preserve the existing product language, data model, responsive design, and security controls.

The application is a learner-facing study platform built with Next.js, React, TypeScript, Prisma, and MySQL. Production uses an Aiven MySQL database and Vercel. Docker is intentionally not used. The former admin application has been completely removed and must not be recreated unless the owner gives a new explicit instruction.

The product must always describe itself as an **independent study companion**, never as an official college or institutional platform. Academic notes must be original or properly authorized. Fictional teaching cases must be clearly identified as fictional. Do not copy protected material from reference websites.

Computer Networks Unit 1 and Unit 2 have special, full-page interactive experiences based on references supplied by the owner. Preserve their visual design and interactions as closely as possible. Make only changes needed for integration, accessibility, correctness, responsiveness, or performance.

Before changing code:

1. Read this document and `README.md`.
2. Check `git status` and the latest commits.
3. Never commit `.env`, Aiven credentials, API keys, SMTP passwords, or Vercel tokens.
4. Use MySQL through Prisma. Do not introduce Docker or silently switch databases.
5. Run the relevant validation commands before pushing.

## 2. Product overview

Aetheria provides:

- A responsive curriculum library organized by term, subject, course, and module.
- Twelve demonstration courses and forty-eight seeded modules.
- Markdown course notes with a table of contents and reading preferences.
- Original fictional case studies extracted from published course notes.
- Semester-based podcast-style lessons presented as a dialogue between two hosts, Mira and Arun.
- Interactive study sessions derived from each published module.
- Dedicated Computer Networks simulations for Unit 1 and Unit 2.
- Account registration, single-use email verification, sign-in, and a private study home.
- Grounded generative study responses with source links and validated structured output.
- PWA installation support and an offline fallback page.

The product is currently one learner application. There is no admin website.

## 3. Current deployment state

| Item                | Current value                          |
| ------------------- | -------------------------------------- |
| Production app      | `https://college-ext-users.vercel.app` |
| Vercel project      | `college-ext-users`                    |
| GitHub repository   | `Mohith2912/College-Ext`               |
| Production database | Aiven MySQL, database name `aetheria`  |
| Local user app      | `http://localhost:3000` by default     |
| Local mail inbox    | `http://localhost:8025`                |
| Local MySQL         | `127.0.0.1:3307`                       |
| Node.js             | 22 or newer                            |
| Package manager     | pnpm 11.19.0                           |

The deleted Vercel admin project was named `college-ext-admin`. Do not depend on it.

## 4. Repository architecture

```text
aetheria-user-application/
├─ apps/
│  └─ users/                    Next.js learner application
│     ├─ app/                   App Router pages and API routes
│     ├─ components/            UI and interactive learning components
│     ├─ lib/                   Server-side curriculum and learning queries
│     └─ public/                PWA icon and service worker
├─ packages/
│  ├─ ai/                       Grounded tutor request and response logic
│  ├─ auth/                     Auth.js, accounts, authorization, rate limits
│  ├─ database/                 Prisma client, seed logic, course source data
│  ├─ ui/                       Shared styles package
│  └─ validation/               Zod schemas and environment validation
├─ prisma/
│  ├─ schema.prisma             MySQL schema
│  ├─ migrations/               Production migrations
│  └─ seed.ts                   Main seed entry point
├─ tests/e2e/                   Playwright browser tests
├─ tooling/                     Local MySQL, development, mail, and CN scripts
├─ package.json                 Root commands
├─ turbo.json                  Workspace build pipeline
└─ README.md                    Short setup guide
```

High-level request flow:

```mermaid
flowchart LR
    B[Browser] --> N[Next.js users app]
    N --> A[Auth.js and API routes]
    N --> L[Server-side library queries]
    A --> P[Shared auth package]
    L --> D[Prisma client]
    P --> D
    D --> M[(MySQL / Aiven)]
    A --> G[OpenAI-compatible AI provider]
    A --> S[SMTP provider]
```

## 5. Important routes

| Route                              | Purpose                                                  | Access         |
| ---------------------------------- | -------------------------------------------------------- | -------------- |
| `/`                                | Redirects signed-in users to `/home`, others to `/notes` | Public         |
| `/notes`                           | Searchable course library                                | Public         |
| `/notes/[courseSlug]`              | Course syllabus and module list                          | Public         |
| `/notes/[courseSlug]/[moduleSlug]` | Note reader or dedicated CN simulator                    | Public         |
| `/case-studies`                    | Cases extracted from published module Markdown           | Public         |
| `/podcasts`                        | Two-host course conversations by semester                | Public         |
| `/interactive`                     | Module-aware interactive learning session                | Public         |
| `/ai`                              | Grounded study tutor                                     | Signed-in user |
| `/home`                            | Personal study landing page                              | Signed-in user |
| `/register`                        | Account creation                                         | Public         |
| `/verify-email`                    | Email verification completion                            | Public         |
| `/login`                           | Credentials sign-in                                      | Public         |
| `/offline`                         | PWA offline fallback                                     | Public         |
| `/content-policy`                  | Independent-project and content policy                   | Public         |

API routes:

- `POST /api/auth/register`
- `POST /api/auth/verify-email`
- `GET /api/auth/me`
- `GET|POST /api/auth/[...nextauth]`
- `POST /api/ai/chat`

## 6. Computer Networks implementation

The Computer Networks course data lives in:

- `packages/database/src/computer-networks.ts`

The two dedicated full-page experiences live in:

- `apps/users/components/computer-networks-unit-one-simulator.tsx`
- `apps/users/components/computer-networks-unit-two-simulator.tsx`

Routing is selected in:

- `apps/users/app/notes/[courseSlug]/[moduleSlug]/page.tsx`

Special route behavior:

```text
computer-networks/computer-networks-unit-1 -> Unit 1 simulator
computer-networks/computer-networks-unit-2 -> Unit 2 simulator
all other module slugs                       -> database-backed Markdown reader
```

This distinction matters: updating the Unit 1 or Unit 2 note Markdown changes the syllabus, podcasts, generic interactive session, AI grounding, and case-study extraction, but it does **not** automatically change the hard-coded simulator UI. Update the corresponding simulator component when its visible simulation content must change.

Reference projects supplied by the owner:

- Unit 1: https://github.com/mrithulavj/CN-Unit
- Unit 2: https://github.com/mrithulavj/CN-Unit-two

The original Unit 1 ZIP was also supplied locally during development. Treat reference content as owner-supplied material, preserve attribution/provenance where needed, and do not pull unrelated copyrighted notes into the database.

Two earlier adapted components remain in the codebase but are no longer routed:

- `apps/users/components/computer-networks-module.tsx`
- `apps/users/components/computer-networks-unit-two-module.tsx`

Do not accidentally reconnect them. They may be removed later after checking that no desired behavior exists only in those files.

## 7. Curriculum and syllabus data flow

The canonical seed sources are TypeScript data files:

- General course content: `packages/database/src/content.ts`
- Computer Networks content: `packages/database/src/computer-networks.ts`

The public pages query only records that are:

- in the configured organization,
- `PUBLISHED`, and
- not soft-deleted.

The principal query layer is `apps/users/lib/library.ts`:

- `getLibrary()` loads terms, subjects, courses, and module counts.
- `getCourse(slug)` loads a course and its ordered syllabus.
- `getModule(courseSlug, moduleSlug)` loads one published note and adjacent modules.

Next.js cache behavior:

- Library list: 60-second revalidation.
- Course and module detail: 120-second revalidation.
- Podcasts, interactive sessions, and case studies: 300-second revalidation.
- Curriculum cache tag: `aetheria-curriculum`.

### Updating general seeded content

Edit `packages/database/src/content.ts`, then run:

```powershell
pnpm db:seed
```

The current general seeder uses stable IDs and is designed primarily for initial population. Several `upsert` operations intentionally use an empty update. If existing production content must be changed, add an explicit, reviewed update path or migration rather than assuming `pnpm db:seed` will overwrite every record.

### Updating Computer Networks content

Edit `packages/database/src/computer-networks.ts`, then publish it with:

```powershell
node --env-file=.env --import tsx tooling/seed-cn.ts
```

The CN publisher:

- updates existing seeded CN modules in place,
- updates note Markdown and checksums,
- keeps non-seeded/custom modules,
- preserves custom outline entries,
- safely reorders module positions to avoid MySQL unique-key collisions,
- publishes the course and notes.

After publication, wait for cache revalidation or deliberately add a controlled `revalidateTag('aetheria-curriculum')` mechanism if immediate refresh becomes a product requirement.

### Case study convention

`apps/users/lib/case-studies.ts` extracts the first Markdown section whose heading begins with one of:

- `## Case study`
- `## Practice case`
- `## Case exercise`

Use one of those headings for a module to appear on `/case-studies`. Label generated or invented organizations as fictional.

### Podcast and interactive-session generation

`apps/users/lib/learning-studio.ts` derives both experiences from the latest published note Markdown:

- Podcast episodes are course-level Mira/Arun dialogues built from all published modules in a term.
- Interactive sessions split module Markdown on level-two headings, create up to eight steps, and generate a question for each step.

These are deterministic server-generated learning aids, not audio generated by an AI provider. Browser speech synthesis may read the dialogue aloud in the client experience.

## 8. Database design

Prisma uses the MySQL provider. The schema is in `prisma/schema.prisma`.

Main domains:

| Domain             | Principal models                                                               |
| ------------------ | ------------------------------------------------------------------------------ |
| Identity           | `User`, `Account`, `Session`, `VerificationToken`, `RateLimitBucket`           |
| Organization       | `Organization`, `OrganizationMembership`, `AcademicTerm`                       |
| Curriculum         | `Course`, `CourseOffering`, `Module`, `ModuleSection`, `Topic`                 |
| Notes              | `NoteDocument`, `NoteVersion`, `ContentChunk`                                  |
| Learning resources | `GlossaryEntry`, `LearningResource`, `ConceptNode`, `ConceptEdge`              |
| Media              | `Transcript`, `TranscriptChunk`                                                |
| Student activity   | `Bookmark`, `ReadingProgress`, `StudyActivity`                                 |
| Search and AI      | `SearchDocument`, `Embedding`, `AiConversation`, `AiMessage`, `AiCitation`     |
| Assessment         | `Quiz`, `QuizQuestion`, `QuizAttempt`, `QuizResponse`                          |
| Governance         | `ContentReview`, `ContentIssue`, `ConsentRecord`, `FeatureSetting`, `AuditLog` |

Many models use soft deletion through `deletedAt`. Preserve organization scoping in every query. Do not expose drafts through public routes.

The Prisma client is reused through `globalThis` in `packages/database/src/index.ts` to reduce connection-pool creation in warm serverless instances.

The database schema still contains editorial roles and governance models. Those are domain capabilities, not evidence that an admin portal still exists.

## 9. Authentication and security

Authentication is implemented with Auth.js credentials sessions in `packages/auth`.

Account flow:

1. User registers with name, email, password, and policy consent.
2. Password is hashed with Argon2.
3. A single-use verification token is stored as a hash.
4. SMTP sends a 24-hour verification link.
5. Verified users with an active organization membership may sign in.

Security behavior to preserve:

- Minimum password length is 12 characters.
- Sessions use JWTs with an eight-hour maximum age.
- Cookies are HTTP-only, same-site lax, and secure in HTTPS production.
- Roles and permissions are read from MySQL; they are not trusted from cached JWT claims.
- `sessionVersion` can invalidate all sessions for a user.
- Mutation routes validate the request origin.
- Registration, login, verification, and AI requests are rate-limited in MySQL.
- JSON content type and payload sizes are validated.
- Redirects are limited to the configured user-app origin.
- AI source text is treated as untrusted input.

There is no shared or default administrator login. Do not place credentials in documentation.

## 10. Generative tutor

The AI provider integration is in `packages/ai/src/index.ts`. The HTTP endpoint is `apps/users/app/api/ai/chat/route.ts`.

Supported actions:

- Explain simply
- Worked example
- Fictional case study
- Recall questions

The API:

1. Requires an authenticated organization member.
2. Limits each user to 20 AI requests per hour.
3. Loads published modules from the selected course.
4. Sends at most 10,000 characters from each note as authorized source material.
5. Uses an OpenAI-compatible `/chat/completions` endpoint.
6. Requires JSON output matching a Zod schema.
7. Validates citation indexes.
8. Stores the conversation, messages, token counts, model, latency metadata, and citations.

The prompt explicitly tells the model to ignore instructions found inside source notes, avoid invented facts, and label generated cases as fictional.

If `AI_API_KEY` or `AI_MODEL` is absent, the UI remains available but generated responses return a clear configuration error.

## 11. Environment variables

Create `.env` from `.env.example`. Never commit actual values.

```dotenv
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/aetheria"
AUTH_SECRET="at-least-32-random-characters"
USERS_URL="http://localhost:3000"
ORGANIZATION_SLUG="aetheria"

SMTP_HOST="127.0.0.1"
SMTP_PORT="1025"
SMTP_FROM="Aetheria <noreply@aetheria.local>"
SMTP_USER=""
SMTP_PASSWORD=""

AI_BASE_URL="https://api.openai.com/v1"
AI_API_KEY=""
AI_MODEL=""
```

Production values are configured in Vercel, not in Git. `DATABASE_URL` points to Aiven MySQL. Keep the Aiven TLS configuration required by the service. If the provider issues a new CA or changes connection requirements, update the secure connection setup instead of disabling verification without review.

## 12. Local development without Docker

### Option A: native local MySQL 8.4 on Windows

```powershell
pnpm install
Copy-Item .env.example .env
pnpm db:setup
pnpm db:migrate
pnpm db:seed
pnpm dev
```

`pnpm db:setup` creates isolated development and test databases under `.local`, starts MySQL on port 3307, creates random local credentials, and preserves an existing `.env` by writing generated settings to `.local/generated.env`.

Useful database commands:

```powershell
pnpm db:start
pnpm db:stop
pnpm db:validate
pnpm db:migrate
pnpm db:seed
```

### Option B: Aiven MySQL

Set `DATABASE_URL` to the Aiven connection URL in the untracked `.env`, then run:

```powershell
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Do not run a destructive reset against production. Use versioned Prisma migrations.

Development services:

- Next.js user application: `http://localhost:3000`
- Local SMTP server: port `1025`
- Development mail viewer: `http://localhost:8025`

## 13. Build, testing, and quality gates

Use these commands from the repository root:

```powershell
pnpm db:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

The current test layers are:

- Vitest unit and integration tests for validation, authentication, authorization, rate limiting, and AI response validation.
- Playwright end-to-end tests for the public library, responsive layout, case studies, podcasts, generic interactive sessions, and both Computer Networks simulations.
- Axe accessibility checks in the public smoke test.

At the last verification:

- lint passed,
- type checking passed,
- 21 Vitest tests passed,
- the production build passed,
- four targeted CN desktop/mobile Playwright tests passed,
- both live CN pages returned HTTP 200 at a 390-pixel viewport with no horizontal overflow.

The Next.js build currently emits a non-blocking warning that the Next.js ESLint plugin is not detected in the flat ESLint configuration.

## 14. Deployment

The production project is hosted by Vercel. The effective configuration is:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "installCommand": "pnpm install",
  "buildCommand": "pnpm db:migrate && pnpm --filter @aetheria/users build",
  "outputDirectory": "apps/users/.next"
}
```

Deployment order:

1. Confirm the Aiven database is reachable.
2. Ensure required Vercel environment variables exist for Production.
3. Run local validation.
4. Commit and push `main`.
5. Deploy the `college-ext-users` project.
6. Verify `/notes`, CN Unit 1, CN Unit 2, registration, and sign-in behavior.

The build applies pending Prisma migrations before compiling the user app. Migration files must therefore be backward-safe for the currently deployed code whenever possible.

Live verification targets:

- https://college-ext-users.vercel.app/notes
- https://college-ext-users.vercel.app/notes/computer-networks/computer-networks-unit-1
- https://college-ext-users.vercel.app/notes/computer-networks/computer-networks-unit-2
- https://college-ext-users.vercel.app/podcasts
- https://college-ext-users.vercel.app/interactive?course=computer-networks&module=computer-networks-unit-2

## 15. Performance guidance

The project has already been adjusted to avoid opening a new Prisma client for every warm request. Preserve that singleton behavior.

When improving response time:

- Measure server response time separately from client rendering.
- Keep public curriculum queries scoped, selected, ordered, and bounded.
- Avoid `include` trees that fetch unused fields.
- Use the existing Next.js cache for public published content.
- Do not cache private sessions, account responses, or AI conversations publicly.
- Keep `Cache-Control: no-store` on authentication and AI endpoints.
- Watch Aiven connection limits and serverless concurrency.
- Prefer one database transaction for related writes.
- Keep the CN simulators client-side, but avoid adding large dependencies to their route bundle.
- Test both 390-pixel mobile and desktop widths after changing either simulator.

If immediate syllabus publication is introduced later, add targeted cache invalidation rather than disabling all caching.

## 16. Design and content requirements

- Preserve the quiet editorial visual language of the main Aetheria application.
- Preserve the supplied CN reference UI inside the two special modules.
- Maintain keyboard access, visible focus, reduced-motion handling, semantic headings, and sufficient contrast.
- Use Lucide icons where the existing interface uses iconography.
- Keep the application responsive from approximately 390 pixels upward.
- Do not describe Aetheria as affiliated with a college.
- Do not add institutional logos or claims of official status.
- Use original or authorized course material.
- Clearly label fictional companies, figures, and cases.
- Keep user-facing implementation details out of normal product copy.

## 17. Known limitations and deliberate decisions

1. The admin portal was removed at the owner's request. Curriculum changes currently happen through version-controlled seed data or carefully written maintenance scripts.
2. CN Unit 1 and Unit 2 use code-based simulators, while the rest of the curriculum uses database Markdown.
3. The generic seed command does not overwrite every existing database row because several upserts have empty update branches.
4. Podcasts are scripted two-speaker learning conversations; they are not pre-generated audio files.
5. The tutor requires a configured external AI provider and a verified signed-in user.
6. Production email verification requires a real SMTP provider.
7. Search and embedding models exist in the schema, but a complete semantic-indexing pipeline is not currently exposed as a product feature.
8. Bookmark, reading-progress, quiz, transcript, and review models provide room for future work; not every model has a complete learner UI.

## 18. Safe continuation checklist

Before each change:

- Confirm the requested scope and preserve the latest owner instruction.
- Inspect the current Git diff before editing.
- Keep credentials only in ignored environment files or provider dashboards.
- Make schema changes through Prisma migrations.
- Preserve organization, publication-status, and soft-delete filters.
- Check whether a CN change belongs in database Markdown, a simulator component, or both.

Before each push or deployment:

- Run lint, type checks, and relevant tests.
- Run a production build.
- Test changed pages at desktop and mobile widths.
- Confirm the repository contains no secret files.
- Confirm no admin application or admin deployment configuration was reintroduced accidentally.
- Verify the live deployment after promotion.

## 19. Recent repository history

The three commits that established the current state are:

```text
6b36ad1 Add exact CN reference learning modules
c7c2b9d Remove the admin portal application
9cc7ead Simplify the workspace for the user application
```

Use `git log --oneline` for newer work. Treat this document as a handoff snapshot and update it whenever architecture, deployment, or canonical content workflows change.

## 20. Suggested next improvements

Work on these only when requested or clearly useful to the current task:

1. Add authenticated learner progress and bookmarks to the existing reading UI.
2. Add targeted cache invalidation after controlled content publication.
3. Replace the development SMTP inbox with a production email service and verify delivery.
4. Add observability for slow Aiven queries and AI-provider latency.
5. Remove the two unused legacy CN components after a final behavior comparison.
6. Expand module-specific labs while keeping each lab grounded in its published course material.
7. Add a safe, non-admin content import command if frequent syllabus updates are needed.

When implementing future work, keep changes reviewable, update tests that protect real behavior, and update this handoff when the operational model changes.
