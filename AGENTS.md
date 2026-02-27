# AGENTS.md

This repository is a small static site (no framework, no build tool):
- `index.html` (home)
- `uploads.html` (all uploads)
- `uploads.json` (data source)
- `uploads/` (uploaded pages/files, currently HTML)

There are currently no Cursor rules (`.cursor/rules/`, `.cursorrules`) and no Copilot rules (`.github/copilot-instructions.md`) in this repo.

## Quickstart (Run Locally)

Static pages can be opened directly, but `fetch('uploads.json')` works best when served over HTTP.

### Serve

Python (recommended, no deps):

```bash
python3 -m http.server 5173
```

Then open:
- `http://localhost:5173/index.html`
- `http://localhost:5173/uploads.html`

Alternative (Node, if available): `npx serve .`

### “Lint” / Validation

There is no lint configuration in the repo. The most valuable automated check is validating `uploads.json`.

Validate JSON with Python:

```bash
python3 -m json.tool uploads.json > /dev/null
```

Validate JSON with Node:

```bash
node -e "JSON.parse(require('fs').readFileSync('uploads.json','utf8')); console.log('OK')"
```

### Checks (No Test Runner)

There is no test runner configured. Practical checks:
- Manual smoke: serve locally, load `index.html` + `uploads.html`, watch DevTools console, click latest upload card.
- Single automated check: ensure `uploads.json` parses.

```bash
# single check: JSON parses
python3 -m json.tool uploads.json > /dev/null

# single check: pages served and reachable
python3 -m http.server 5173
```

## Data Model (`uploads.json`)

`uploads.json` is the only “source of truth” for what appears in the UI.

Expected shape:

```json
{
  "uploads": [
    {
      "id": "odev-1",
      "title": "...",
      "date": "22 Şubat 2026",
      "file": "uploads/example.html",
      "description": "...",
      "tags": ["tablo"],
      "tag": "Yükleme",
      "icon": "📄"
    }
  ]
}
```

Notes:
- Keep `uploads` newest-first; `index.html` uses `uploads[0]` as “latest”.
- `id` kebab-case; `file` repo-relative (prefer `uploads/`); `tags` is an array; `index.html` uses `tag` but `uploads.html` uses `tags[0]`.
- Strict JSON only (double quotes, commas, no comments).

### Page Behavior

- `index.html`: renders the latest upload + last 2 in the side panel; on fetch failure it stays quiet.
- `uploads.html`: fetches with cache-buster (`?v=...`); on fetch failure it shows an error state.

When changing behavior, preserve these UX expectations unless you also update the copy/states accordingly.

## Code Style Guidelines

This project is intentionally “single-file” per page (inline CSS + inline JS). Keep changes consistent with that.

### General

- Preserve the existing visual language (fonts: Syne + DM Sans; warm dark background; glassy cards).
- Prefer small, local edits; avoid refactors that add tooling unless requested.
- Keep indentation consistent with current files (2 spaces) and avoid minifying.
- Keep content UTF-8; the pages are Turkish (`<html lang="tr">`).

### HTML

- Keep `<script>` at the end of `<body>` (current pattern).
- Use semantic elements where already present (`<main>`, `<header>`, `<nav>`, `<footer>`).
- Avoid introducing new global IDs/classes unless needed; names should be descriptive and kebab-case.

### CSS

- Use `:root` CSS variables for shared colors (`--cream`, `--glass-border`, `--shadow`).
- Prefer editing existing classes over adding parallel variants.
- Keep responsive behavior via `clamp()` and flexible layouts (already used).
- Avoid adding heavy animations; keep transitions subtle and consistent.

### JavaScript

- Vanilla JS only; no frameworks.
- Prefer `const`/`let`; no `var`.
- Keep DOM lookups close to use; cache elements when used repeatedly.
- Use template literals carefully: escape user-provided text if you ever start accepting untrusted input.
- Error handling:
  - If a failure is non-critical, fail gracefully (existing behavior is either silent or an inline error message).
  - Do not throw on missing optional fields (`description`, `icon`, `file`).

### Imports / Types / Dependencies

- There is no bundler: do not add `import` statements.
- No TypeScript.
- Avoid new external deps/assets; prefer local files under `uploads/` (fonts already use Google Fonts).
- If you add new fields to `uploads.json`, document them here and update both pages to handle them.

### Naming

- Files: lowercase, use kebab-case; keep related artifacts under `uploads/`.
- JSON keys: lower camelCase (`description`, `createdAt`), avoid spaces/special chars.
- DOM IDs/classes: kebab-case.

### Formatting

- HTML/CSS/JS: match current formatting style; keep lines reasonably short when editing.
- JSON: 2-space indentation; one key per line.

## Common Tasks

Add a new upload:
1. Add the artifact under `uploads/` (e.g. `uploads/sunum-2.html`).
2. Add a new entry at the top of `uploads.json`.
3. Validate JSON parses and smoke in a local server.

Debug:
- Missing cards usually means `uploads.json` failed to parse.
- Clicks do nothing if `file` is missing/empty or the path is wrong.
