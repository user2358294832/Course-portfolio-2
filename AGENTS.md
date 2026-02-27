# AGENTS.md

Agent guidance for `/home/isot/Code/Course-portfolio-2`.
This is a Next.js 16 + React 19 + TypeScript App Router project that renders MDX content from `content/uploads`.

## Scope and Priority

- Follow this file for build/test/style conventions in this package.
- If explicit user instructions conflict with this file, follow user instructions.
- Keep edits minimal and targeted; avoid unrelated refactors.

## Cursor/Copilot Rules

- No Cursor rules were found: `.cursor/rules/` and `.cursorrules` do not exist.
- No Copilot rules were found: `.github/copilot-instructions.md` does not exist.

## Repository Shape

- `app/`: Next.js App Router pages and layout.
- `components/`: reusable UI and MDX bridge components.
- `lib/`: server-side helpers (`dates`, `uploads`).
- `content/uploads/`: `.md` / `.mdx` source files with frontmatter.
- `app/globals.css`: global design tokens and all styling.

## Install and Run

- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Production start: `npm run start`
- Lint: `npm run lint`

## Build/Lint/Test Commands

Use these commands from `/home/isot/Code/Course-portfolio-2`.

```bash
# full build validation
npm run lint
npm run build

# typecheck only (no emit)
npx tsc --noEmit

# lint a single file
npx eslint app/uploads/[slug]/page.tsx
```

## Test Status and Single-Test Guidance

- There is currently no test runner configured (`test` script absent; no Jest/Vitest/Playwright config).
- "Single test" execution is therefore not available yet.
- Closest targeted checks today:
  - Single-file lint: `npx eslint <path-to-file>`
  - Type safety check: `npx tsc --noEmit`
- If a test framework is introduced, add the exact single-test command here immediately.

## Tech and Architectural Conventions

- Framework: Next.js App Router (`app/`), server components by default.
- Client components explicitly use `"use client"` (see `components/SidePanel.tsx`).
- Data loading is filesystem-based via `node:fs` in `lib/uploads.ts`.
- Content is MD/MDX + frontmatter parsed by `gray-matter`.
- MDX rendering uses `next-mdx-remote/rsc` and custom component mapping.
- Icons are rendered with Boxicons (via `boxicons/css/boxicons.min.css`).

## TypeScript Guidelines

- `strict` mode is enabled; preserve strict typing.
- Prefer explicit exported types for shared data (`UploadMeta`, `UploadEntry`).
- Use `type` aliases (current style) rather than introducing interfaces without reason.
- Use narrow literal unions where applicable (example: `attachment: "yes" | "no"`).
- Avoid `any`; use `unknown` + refinement when needed.
- Keep return types explicit on exported functions when it improves clarity.

## Imports and Module Boundaries

- Use ESM imports with double quotes and trailing semicolons.
- Use `import type` for type-only imports.
- Ordering pattern used in codebase:
  1) framework/external packages (`next/*`, `react`, npm deps)
  2) internal aliases (`@/components/*`, `@/lib/*`)
  3) relative style imports (e.g. `./globals.css`)
- Prefer `@/*` alias for internal modules (configured in `tsconfig.json`).

## Naming Conventions

- Components: PascalCase (`UploadCard`, `SidePanel`).
- Component prop types: `ComponentNameProps`.
- Utility functions/locals: camelCase (`formatDate`, `getAllUploads`, `normalizeMeta`).
- Route segments: lowercase; dynamic params in brackets (`app/uploads/[slug]`).
- Content slugs: kebab-case and file name == slug (`odev-1.mdx`).

## Formatting and Style

- Match existing Prettier-like formatting (2-space indent, semicolons, trailing commas in multiline literals).
- Use concise early returns for guard branches.
- Prefer small pure helpers in `lib/` for data normalization/sorting.
- Do not add comments unless logic is non-obvious.
- Keep user-facing text consistent with current Turkish content style.

## React/Next Patterns

- Default to server components; add `"use client"` only when hooks/browser APIs are required.
- Keep page components async when performing server data reads.
- Use Next primitives (`Link`, `Metadata`, `notFound`) instead of manual equivalents.
- For static generation, follow `generateStaticParams` + `generateMetadata` patterns already in use.

## Error Handling Expectations

- Prefer fail-soft behavior for content loading issues.
- In list fetches, return safe fallbacks on read/parse failure (current pattern: `[]`).
- In detail fetches, return `null` and trigger `notFound()` at route level.
- Treat optional frontmatter defensively; provide defaults (`icon`, `description`, `tags`).
- Avoid throwing for recoverable content issues unless user asks for stricter behavior.

## MDX and Content Rules

- Allowed sources are `.md` and `.mdx` under `content/uploads`.
- Frontmatter fields currently used:
  - `title: string`
  - `date: string` (ISO-like date expected for sorting/formatting)
  - `tags: string[]`
  - `icon?: string`
  - `description?: string`
  - `attachment: "yes" | "no"`
- Keep frontmatter complete and consistent; avoid schema drift.
- For attachment-aware content, use `AttachmentLink`/`PdfEmbed` components.
- Files ending with `.mdx.example` are intentionally ignored by listing logic.

## Static Assets and Attachments

- Store downloadable files under `public/uploads/<slug>/`.
- Use root-relative URLs in MDX, for example:
  - `/uploads/odev-1/rapor.pdf`
  - `/uploads/odev-1/odev.docx`
- Do not read attachments from `content/uploads`; that directory is content-source only.

## CSS/UI Guidelines

- Reuse existing tokens in `:root` (`--cream`, `--accent`, `--glass-border`, etc.).
- Preserve the established visual system (warm dark glassmorphism, Syne + DM Sans).
- Prefer extending existing utility classes before adding new one-off styles.
- Keep responsive behavior intact; verify at mobile widths (notably panel behavior at `max-width: 860px`).

## Validation Checklist for Changes

- Run `npm run lint`.
- Run `npx tsc --noEmit` for type safety when touching TS-heavy code.
- Run `npm run build` for route/content integration validation.
- Run `npm run dev` for manual UI verification when changing styles/components.
- For content changes, open:
  - `/`
  - `/uploads`
  - `/uploads/<slug>` for modified entry

## Safe Change Practices for Agents

- Do not introduce new dependencies unless necessary and requested.
- Do not migrate architecture (for example, replacing MDX pipeline) without explicit request.
- Keep public behavior stable unless task asks for UX/content changes.
- When adding scripts/tests/tools, update this AGENTS.md in the same change.
