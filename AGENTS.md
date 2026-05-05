# AGENTS.md — Skill-chain coordination

This file is read by every stage in the workflow chain (`task` → `implement` → `simplify` → `test` → `document` → `ship` → `release`). It carries shared context that the skills assume.

For human-facing rules — code conventions, design tokens, brief discipline, brand voice — read `CLAUDE.md`. AGENTS.md does not duplicate those; it points to them.

## Project at a glance

- **App:** Next.js 16 + Sanity v5 + Tailwind 4 marketing site
- **Routing:** App Router, all pages render through the page-builder pattern (Pattern A) — see `CLAUDE.md`
- **Studio:** mounted at `/studio`
- **Package manager:** `npm` (not pnpm/yarn). All scripts run via `npm run …`

## Workflow chain and artifacts

| Stage | Reads | Writes |
|---|---|---|
| `task` | this file, `LEARNINGS.md`, brief docs in `docs/` | `docs/task/{ID}-{slug}.md`, updates `TASKS.md` |
| `implement` | task doc, files listed in File Changes | code, `Implementation Notes` appended to task doc, `TASKS.md` move |
| `simplify` | task doc, `git diff --name-only` | quality-gate findings appended to task doc |
| `test` | task doc, `docs/templates/test-report.md` | `docs/testing/{ID}-{slug}.md` |
| `document` | task doc, test report, diff | `docs/features/`, `docs/guides/`, `docs/learnings/{ID}-{slug}.md`, `LEARNINGS.md` |
| `ship` | task doc, `TASKS.md` | branch + PR, `TASKS.md` move |
| `release` | shipped tasks | changelog, tag, `TASKS.md` move |

Task IDs are 4-digit zero-padded, monotonically increasing (`0001`, `0002`, …). Slugs are kebab-case.

## Tracking board (`TASKS.md`) columns

`Planned` → `In Progress` → `Testing` → `Approved` → `Shipped`. Each row: `| ID | Task | Priority | Type | Path | Date |`.

## Standard verification commands

These are the project's quality gates. Tasks default to using them in their `Verification Approach`:

```bash
npx tsc --noEmit       # TypeScript type check
npm run lint           # ESLint
npm run build          # Next.js production build (use for substantive changes)
npm run typegen        # Regenerate Sanity types after schema changes
npm run dev            # Local dev server (manual UI verification)
```

If a task changes Sanity schemas, `npm run typegen` is mandatory before `npx tsc --noEmit`.

## Touchpoints worth flagging in tasks

When a task affects any of the following, call it out in `Compatibility Touchpoints`:

- **Sanity schemas** — requires `npm run typegen` and may break consumer types in `sanity/lib/queries.ts` or component prop usage
- **Design tokens in `app/globals.css`** — every component compiled against the old token set may need re-render verification
- **`app/layout.tsx` or `app/(site)/layout.tsx`** — affects every route
- **`SectionRenderer.tsx`** — the dispatcher for all section types; missing a case silently skips a section
- **`CLAUDE.md` or `AGENTS.md`** — durable project instructions; treat updates as part of the task scope, not aside-edits
- **Adding npm packages** — except shadcn primitives via `npx shadcn@latest add <name>` (those are free)

## Brief discipline

Phase briefs live in `docs/`. Tasks within a brief should reference the brief in their Overview and respect the brief's `Out of scope` section.
