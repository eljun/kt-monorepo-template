# {{PROJECT_NAME}}

A Next.js 16 + Sanity v5 + Tailwind 4 + shadcn/ui website following the page-builder pattern.

> This project was scaffolded from [`kt-monorepo-template`](https://github.com/eljun/kt-monorepo-template) via the [`bootstrap-project`](https://github.com/eljun/kt-skills) skill.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **CMS:** Sanity v5 — Studio mounted at `/studio`
- **Styling:** Tailwind 4 (CSS-based `@theme` config in `app/globals.css`)
- **UI:** shadcn/ui with Base UI primitives (`@base-ui/react`)
- **Icons:** lucide-react
- **Language:** TypeScript

## Architecture: page-builder pattern

Every page is a `page` document in Sanity with a `slug` and a `sections` array. Section components live in `components/sections/` and are rendered by `SectionRenderer`. The only singleton document type is `siteSettings`.

See `CLAUDE.md` for the full pattern documentation.

## Local development

```bash
npm install
cp .env.example .env.local  # fill in your Sanity project ID + dataset
npm run typegen             # generate sanity.types.ts from your schemas
npm run dev
```

The site runs at `http://localhost:3000` and the Sanity Studio at `http://localhost:3000/studio`.

If no `home` page exists yet, you'll see an empty-state pointing you to the Studio. Create a `page` document with `slug.current` set to `home` and add a hero section.

## Adding sections

1. Add a schema in `sanity/schemas/sections/{name}.ts` using `defineType` with `name: "section.{name}"`
2. Register the section in `sanity/schemas/index.ts`
3. Add it to the `sections` array `of` list in `sanity/schemas/documents/page.ts`
4. Add the section type to GROQ in `sanity/lib/queries.ts` if it needs reference resolution
5. Build the React component in `components/sections/{Name}Section.tsx`
6. Wire it into `components/sections/SectionRenderer.tsx`
7. Run `npm run typegen` to regenerate `sanity.types.ts`

## Replacing the design system

The `@theme` block in `app/globals.css` ships with shadcn defaults plus a placeholder block for project-specific tokens. Replace the placeholder block with your project's tokens — see `CLAUDE.md` for naming conventions.

## Quality gates

```bash
npx tsc --noEmit    # TypeScript type check
npm run lint        # ESLint
npm run build       # Next.js production build
npm run typegen     # Regenerate Sanity types after schema changes
```
