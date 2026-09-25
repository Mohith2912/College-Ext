# Aetheria Study Companion — User Application

Aetheria is an independent study companion for exploring original course notes, fictional case studies, and grounded AI-assisted explanations. It is not an official institutional platform.

This repository contains only the learner-facing application. The administration application is maintained separately and is not included here.

## Features

- Responsive course library with 12 demonstration courses and 48 modules
- Focused Markdown note reader with reading preferences
- Original fictional case studies connected to course modules
- Account registration, email verification, and private study workspace
- Generative study responses grounded in published notes with citations
- Installable PWA support and offline fallback
- MySQL persistence with Prisma

## Local setup

Requirements: Node.js 22 or later, pnpm 11, and MySQL Server 8.4. Docker is not used.

```powershell
pnpm install
Copy-Item .env.example .env
pnpm db:setup
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Open the application at `http://localhost:3000` and the development email inbox at `http://localhost:8025`.

## Generated study responses

Set `AI_API_KEY` and `AI_MODEL` in `.env`. `AI_BASE_URL` defaults to the OpenAI-compatible API endpoint. Keys remain server-side. Responses are grounded in published notes, cite their sources, and label generated cases as fictional practice scenarios.

## Verification

```powershell
pnpm db:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

The included curriculum and teaching scenarios are original demonstration material. Use original or authorized academic content when replacing it.
