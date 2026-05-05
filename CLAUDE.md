# {{PROJECT_NAME}} — Project Rules

This file is read by Claude Code at the start of every session. Follow these rules without exception unless explicitly overridden in a brief.

## Project context

{{PROJECT_DESCRIPTION}}

> **Replace this block with your project's brand voice.** Be specific. Examples:
>
> - "Quiet, confident, sensory, restrained. Wabi-sabi luxe — never bright clinical."
> - "Warm, technical, irreverent. Talk to the reader like a friend who codes."
> - "Plain, precise, no marketing fluff."
>
> State explicit rules: emoji policy, exclamation marks, banned phrases, preferred terminology.

## Stack — firm

- **Framework:** Next.js 16 with App Router (no Pages Router)
- **CMS:** Sanity v5 — schemas in `sanity/schemas/`, studio mounted at `/studio`
- **Styling:** Tailwind 4 with CSS-based `@theme` config in `app/globals.css`. **Never create `tailwind.config.js`.** Never use Tailwind 3 patterns.
- **UI primitives:** shadcn/ui with Base UI primitives (`@base-ui/react`). Existing primitives in `components/ui/`.
- **Icons:** `lucide-react` only. Never inline SVG unless a custom illustration.
- **Language:** TypeScript only. No `.js` or `.jsx` files.
- **Package manager:** npm. Use `npm run` for scripts, `npx tsc --noEmit` for type checking.

## Design system

The project uses a custom design system. **Always use tokens defined in `app/globals.css`.** Never inline colors, never use arbitrary Tailwind values like `bg-[#CA9B5C]`. If a token doesn't exist for something you need, stop and ask — do not invent.

> Document your design system in `docs/DESIGN_SYSTEM.md` (create when ready) and reference it here.

## Working with Sanity

- Schemas live in `sanity/schemas/`. Import via `import { schemaTypes } from "./schemas"` in `sanity/sanity.config.ts`.
- Use `defineType` and `defineField` from `sanity` package — never raw object literals.
- Singleton: `siteSettings` is the only singleton document type. Pages (including the homepage) use the `page` document with `slug.current === "home"` — see Architecture pattern below.
- All image fields require alt text via a custom field — never use `options: { hotspot: true }` alone.
- GROQ queries go in `sanity/lib/queries.ts` as named exports.

## Architecture pattern — page-builder (Pattern A)

This monorepo uses a **page-builder pattern**: every page is a `page` document with a `slug` and a `sections` array. There are no per-page singleton schemas (no `homepage`, no `aboutPage`, no `contactPage` schemas).

This is deliberate. The pattern was chosen to:

- Maximize reusability of section components across client projects
- Allow content editors to compose pages flexibly without developer intervention
- Keep schema surface area small as new pages are added
- Enable cloning the monorepo as a starting template for new client sites

**Routing:**

- `app/(site)/page.tsx` — homepage; queries `*[_type == "page" && slug.current == "home"][0]`
- `app/(site)/[slug]/page.tsx` — all other pages; queries `*[_type == "page" && slug.current == $slug][0]`

**Singletons are reserved for *truly* singular content:**

- `siteSettings` — the only singleton document type
- Anything site-wide and global (footer copy, default SEO, social links)

**Do not create new singleton document types for individual pages.** If you find yourself reaching for a singleton, ask first.

**Editorial guardrails come from validation, not schema structure:**

- Specific pages may have validation rules in the `page` schema that constrain which sections are allowed and in what order (see homepage validation in `sanity/schemas/documents/page.ts`)
- Section schemas can have field-level validation (min/max counts, required fields)
- Sanity Studio desk structure can present specific pages prominently (see `sanity/structure.ts`)

This is the canonical pattern. New pages mean new `page` documents, not new schemas.

## Sanity types

TypeScript types for all Sanity schemas are generated automatically and committed at `sanity.types.ts` at the project root.

**Regenerate types whenever schemas change:**

```bash
npm run typegen
```

This runs `sanity schema extract` followed by `sanity typegen generate`. Configuration lives in `sanity-typegen.json`.

**Always import types from the generated file**, never define them inline:

```ts
// ✓ Correct
import type { Page, SectionHero } from "@/sanity.types";

// ✗ Avoid — inline types drift from schema
interface PageProps {
  title: string;
  slug: { current: string };
  sections: any[];
}
```

If you change a schema and types feel out of sync, run `npm run typegen` before continuing.

## Working with components

- Section components live in `components/sections/`. They consume Sanity-shaped props.
- Atomic primitives go in `components/ui/`.
- Reusable composite components go in `components/`.

**File naming conventions** (firm — match existing code):

- `components/*.tsx` (top-level composite, e.g. `Header.tsx`, `Footer.tsx`) → **PascalCase**
- `components/sections/*.tsx` (e.g. `HeroSection.tsx`) → **PascalCase**
- `components/ui/*.tsx` (shadcn primitives, e.g. `button.tsx`) → **kebab-case** (preserves shadcn convention)
- `lib/**/*.ts(x)` (e.g. `lib/utils.ts`) → **kebab-case**
- `sanity/**/*.ts` (e.g. `page.ts`, `siteSettings.ts`) → **camelCase** for filenames matching the schema name

- Never hardcode content in section components. All copy comes from Sanity props.
- Use `cn()` helper from `lib/utils` for conditional classes.
- Use `class-variance-authority` (`cva`) for component variants — already installed.

**Token compliance is mandatory.** Never use raw Tailwind color/spacing/shadow classes (`bg-white`, `text-neutral-*`, `shadow-md`, etc.) once your design system is defined. Always use design tokens. If a token doesn't exist for what you need, stop and ask — do not invent.

## Quality gates — run before reporting done

```bash
npx tsc --noEmit    # type check
npm run lint        # eslint
npm run build       # for full briefs only — skip for small ones if not material
```

If any of these fail, fix or report as a blocker. Do not declare a brief complete with failing checks.

## When to stop and ask

Stop and ask the human (do not assume) when:

- Adding any new npm package — **except** shadcn primitives installed via `npx shadcn@latest add <name>`, which do not need pre-approval
- A brief instruction conflicts with existing code that wasn't anticipated
- A design decision isn't covered by the design system
- An ambiguity could be resolved two reasonable ways
- An acceptance check requires a value (price, name, content) that isn't in the brief

Do not ask for permission for routine work clearly within scope.
