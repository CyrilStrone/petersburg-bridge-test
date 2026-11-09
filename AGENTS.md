# AGENTS.md

Guidance for AI coding agents working in this repository.

This repository is a React SPA: a small "test your strength" game rendered in the
browser and shipped as static files.

## Project overview

Expected work includes:

- game features
- routing
- state management
- localization
- PWA behavior
- environment configuration

Core stack:

- React 19
- TypeScript 6
- Vite 8
- TanStack Router
- TanStack Query
- i18next
- styled-components
- Biome
- vite-plugin-pwa
- Jenesei UI kit (`@jenesei-software/jenesei-kit-react`)

---

## Commands

Use npm.

Development:

```bash
npm run start
```

Build:

```bash
npm run build
```

Validation:

```bash
npm run biome:lint
npm run biome:format
```

Minimum validation before completing work:

```bash
npm run check
npm run build
```

---

## Project structure expectations

Important paths:

- `src/` — application source
- `src/main.tsx` — application entrypoint
- `vite.config.ts` — build/runtime configuration
- `public/` — static assets
- `public/icons/` — generated icons
- `public/locales/` — translations
- `build/` — generated output

---

## TypeScript rules

- Keep strict typing.
- Do not weaken compiler settings to suppress errors.
- Avoid `any` unless clearly justified.
- Prefer explicit types and DTOs.

---

## Imports

Use:

```ts
@local/*
```

for internal source imports.

Respect Biome import ordering:

1. `@local/**`
2. package imports
3. relative imports

Rules:

- avoid circular imports
- do not import a component through its own barrel from inside that barrel
- keep module boundaries clean

Public files are served from a URL that depends on `VITE_BASE_PATH`. Never hardcode
`/public-file.png` in components: build the path with `publicAsset()` from
`src/core/functions`, which prefixes `import.meta.env.BASE_URL`.

---

## Routing

This template uses TanStack Router.

Rules:

- keep route ownership explicit
- colocate route logic where practical
- avoid hidden navigation side effects

---

## Data fetching

TanStack Query is configured in `src/core/query`.

Rules:

- centralize API logic
- type request/response contracts
- use stable query keys
- handle loading/error states intentionally

---

## Internationalization

This template includes i18next.

Rules:

- avoid hardcoded UI strings
- preserve translation readiness
- keep translation keys aligned across locale files
- translations live in `public/locales/<lng>/translation.json`

---

## Environment configuration

Build/runtime behavior depends on environment variables.

Examples:

- app name
- theme color
- description
- base URL
- output directory
- cache timing
- port

Rules:

- prefer env-driven configuration
- avoid hardcoded environment-specific values
- preserve compatibility across dev, stage and prod

---

## PWA rules

This template includes service worker + manifest generation.

Important constraints:

- do not rename `vite-sw.js` unless intentionally redesigning PWA behavior
- preserve manifest generation
- preserve runtime caching behavior unless intentionally changing it
- validate PWA after config changes

---

## UI rules

Shared UI primitives come from `@jenesei-software/jenesei-kit-react`.
The game's own artwork and layout are styled with styled-components.

Rules:

- prefer kit primitives for generic controls
- keep game-specific visuals in `src/components`
- maintain visual consistency

---

## State management

State should remain intentional.

Prefer:

- local state when enough
- query cache for server state
- scoped shared state when justified

Avoid:

- unnecessary global state
- duplicated state ownership
- hidden mutation flows

---

## Generated artifacts

Never manually edit:

- `build/`
- generated icons in `public/icons/`
- generated manifest/service worker artifacts

These are generated outputs.

---

## Safe completion checklist

Before finishing:

- lint passes
- build passes
- imports remain clean
- no circular dependencies introduced
- env behavior preserved
- routing remains valid
- i18n compatibility preserved
- PWA config intact
- generated artifacts not manually edited
