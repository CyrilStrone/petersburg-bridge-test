# Petersburg Bridge Test

[![wakatime](https://wakatime.com/badge/user/7f9aaba0-b5dd-4e0d-9f70-cd2b6ba680d1/project/018e7682-bcfd-4d67-a99f-3b7add243103.svg)](https://wakatime.com/badge/user/7f9aaba0-b5dd-4e0d-9f70-cd2b6ba680d1/project/018e7682-bcfd-4d67-a99f-3b7add243103)

![GIF](https://github.com/CyrilStrone/petersburg-bridge-test/blob/main/docs/petersburg-bridge-test.gif)

A small "test your strength" game built as a React SPA and published as static files.

## Stack

- React 19
- Vite 8
- TypeScript 6
- TanStack Router
- TanStack Query
- i18next and react-i18next
- styled-components
- Jenesei Kit React
- Vite PWA
- Biome

## Requirements

- Node.js `24.8.0`
- npm

Use the Node version from `.nvmrc`:

```bash
nvm use
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run start
```

By default, Vite starts on port `3000`. The port can be changed with `VITE_PORT`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run start` | Start the Vite dev server. |
| `npm run build` | Type-check, then build into `VITE_OUTPUT_DIR`. |
| `npm run check` | Run the same checks as the release pipeline: Biome then `tsc`. |
| `npm run typecheck` | Type-check only. |
| `npm run biome:lint` | Run Biome lint. |
| `npm run biome:format` | Format source files with Biome. |
| `npm run bundle-visualizer` | Open the Vite bundle visualizer. |

There are no per-environment scripts. The environment comes from `VITE_NODE_ENV`,
not from a `--mode` flag, so one build script serves every environment.

## Environment

The project uses `VITE_*` variables. Values live in the deployment platform, not in
the repository, so the same commit produces a different bundle per environment.

Required keys are listed in `.env.template`. No other env file is committed. Copy the
template to `.env.local` for local work.

| Variable | Purpose |
| --- | --- |
| `VITE_DEFAULT_DESCRIPTION` | Default application description for metadata and PWA manifest. |
| `VITE_DEFAULT_NAME` | Full application name. |
| `VITE_DEFAULT_NAME_SHORT` | Short application name. |
| `VITE_DEFAULT_THEME_COLOR` | Theme and background color used by the PWA manifest. |
| `VITE_BASE_PATH` | Public base path for Vite assets, HTML icons, TanStack Router, PWA scope, and start URL. |
| `VITE_NODE_ENV` | One of `prod`, `dev`, `test`. Controls the robots meta and service worker registration. |
| `VITE_QUERY_STALE_TIME` | Default TanStack Query stale time in milliseconds. |
| `VITE_BUILD_INFO_EXPIRATION_TIME` | Build info cache expiration in seconds. |
| `VITE_PORT` | Local Vite dev server port. |
| `VITE_OUTPUT_DIR` | Build output directory. |

`VITE_NODE_ENV` must be one of the three values above. Anything else fails the build
on purpose.

The application version is not an env variable. Vite reads `version` from
`package.json` and exposes it to the bundle as `__APP_VERSION__`, so it always matches
the released version.

## Project Structure

```text
src/
  app.tsx                     Application provider tree
  main.tsx                    React entry point and service worker bootstrap
  assets/                     Game artwork imported by components
  classes/
    class-sw/                 Service worker lifecycle helper
  components/                 Shared game components
  contexts/                   React context providers and hooks
  core/
    consts/                   Shared constants
    envs/                     Environment variable mapping
    functions/                Shared utility functions
    i18n/                     i18next setup
    logger/                   Logging helper
    query/                    TanStack Query client
    router/                   TanStack Router setup
    types/                    Shared TypeScript types
  layouts/                    Root, router, public, and error layouts
  pages/                      Route pages
  styles/                     Fonts, theme, and global styles
```

Public assets are stored in `public/`.

Localization files are stored in:

```text
public/locales/en-US/translation.json
public/locales/ru-RU/translation.json
```

Robots is a single file at `public/robots.txt`.

## Routing

Routing is configured with TanStack Router in `src/core/router/router.tsx`.

The application has a single public route:

- `/` for the game page

The root route renders unknown paths back to the game.

## Providers

The app-level provider tree is defined in `src/app.tsx`.

It includes:

- screen width provider
- language provider
- error boundary layout
- TanStack Query provider
- theme provider
- dialog provider
- PWA provider
- router layout

## Localization

i18next is initialized in `src/core/i18n/index.ts`.

The app loads translations from:

```text
/locales/{{lng}}/{{ns}}.json
```

Supported languages are configured in `src/core/consts/index.ts`. English (`en-US`) is the
fallback language.

When adding a language:

1. Add the language metadata to `OBJECT_LANGUAGE`.
2. Add a new translation file under `public/locales/<lng>/translation.json`.3. Keep translation keys aligned across all locale files.

## Styling

Game layout, artwork and animation are styled with styled-components.
Generic UI primitives (buttons, typography, dialogs) come from
`@jenesei-software/jenesei-kit-react`.

The theme is defined in `src/styles/global/theme.project.ts` and typed in
`src/styles/global/styled.d.ts`.

Game artwork lives in `public/library-*`. Because those files are served from a
public URL, components build their paths with `publicAsset()` from
`src/core/functions`, which prefixes them with `import.meta.env.BASE_URL`. Always use
`publicAsset('library-picture/<file>.png')` instead of a hardcoded `/library-...`
path so the app keeps working under a non-root base path.

## PWA

PWA support is configured in `vite.config.ts` through `vite-plugin-pwa`.

The service worker helper is implemented in `src/classes/class-sw/index.ts` and exposed
to React through `ProviderPWA`.

Important behavior:

- Service worker registration is enabled only when `env.mode === 'prod'`.
- The app can detect offline readiness.
- The app can detect available updates and show an update button.
- New app versions are read from `build-info.txt` under the configured public base path
  with a cache-busting request when an update is available.

## Icons and Manifest

Application icons are generated by `@jenesei-software/jenesei-plugin-vite`.

Source logo:

```text
public/logos/logo-petersburg-bridge.png
```

Generated icons are written to:

```text
public/icons/
```

The generated icons are used in both `index.html` and the PWA manifest.

## Robots

`public/robots.txt` is a single static file and is copied as is. It allows
everything:

```text
User-agent: *
Allow: /
```

Indexing is controlled per environment by the `<meta name="robots">` tag that Vite
injects from `VITE_NODE_ENV`:

| `VITE_NODE_ENV` | Meta robots |
| --- | --- |
| `prod` | `index, follow` |
| `dev` | `noindex, nofollow` |
| `test` | `noindex, nofollow` |

Keep the meta robots in sync with the environment you deploy, otherwise a `dev` build
can end up indexable.

## Code Style

Formatting and linting are handled by Biome.

Key conventions:

- TypeScript strict mode is enabled.
- Imports are organized by Biome.
- Use the `@local/*` alias for imports from `src`.
- Keep code comments and in-code instructions in English.
- Keep shared logic in `src/core`.
- Keep route-level UI in `src/pages`.
- Keep layout concerns in `src/layouts`.

Before opening a pull request, run:

```bash
npm run biome:format
npm run check
```

## Build

Create a build:

```bash
npm run build
```

The output directory is controlled by `VITE_OUTPUT_DIR` and defaults to `build`.

## Deployment

GitHub Pages deployment is configured in `.github/workflows/deploy-pages.yml`.

On every push to `main` (or a manual run), the workflow:

1. installs dependencies with `npm ci`
2. builds the app with `VITE_NODE_ENV=prod` and
   `VITE_BASE_PATH=/<repository-name>/`
3. copies `index.html` to `404.html` for client-side routing
4. publishes `build/` to the `gh-pages` branch

One-time repository setup:

1. Open **Settings → Pages**.
2. Set **Source** to **Deploy from a branch**.
3. Select the `gh-pages` branch and the `/ (root)` folder.
4. Save.

The site is served from `https://<owner>.github.io/<repository-name>/`.

Serve the built app as a single page application with fallback to `index.html` when
using any other hosting.

## Troubleshooting

If the app starts on an unexpected port, check `VITE_PORT`.

If the app is indexable but should not be, check that `VITE_NODE_ENV` is one of the
three allowed values and that the injected robots meta matches it.

If assets or translations 404 on GitHub Pages, check that `VITE_BASE_PATH` matches the
repository subpath.

If PWA updates do not appear locally, remember that service worker registration is
enabled only for `prod` mode.
