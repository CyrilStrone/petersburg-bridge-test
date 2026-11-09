import { generateManifestIcons, pluginUpdateIcons, pluginWriteBuildInfo } from '@jenesei-software/jenesei-plugin-vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite';

import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const appDirectory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => {
  const env = loadEnv('', appDirectory);

  const require = createRequire(import.meta.url);
  const pkg = require('./package.json') as { version: string };

  const VITE_DEFAULT_NAME = env.VITE_DEFAULT_NAME ?? 'Petersburg Bridge Test';
  const VITE_DEFAULT_NAME_SHORT = env.VITE_DEFAULT_NAME_SHORT ?? 'Petersburg Bridge';
  const VITE_DEFAULT_THEME_COLOR = env.VITE_DEFAULT_THEME_COLOR ?? '#0b0f71';
  const VITE_DEFAULT_DESCRIPTION = env.VITE_DEFAULT_DESCRIPTION ?? 'Test task for Petersburg Bridge.';
  const VITE_API_URL = env.VITE_API_URL;
  const VITE_OUTPUT_DIR = env.VITE_OUTPUT_DIR || 'build';
  const VITE_BASE_PATH = env.VITE_BASE_PATH || '/';
  const publicBasePath = VITE_BASE_PATH.endsWith('/') ? VITE_BASE_PATH : `${VITE_BASE_PATH}/`;
  const htmlPublicBasePath = command === 'serve' ? '/' : publicBasePath;

  const environmentValue = env.VITE_NODE_ENV ?? (command === 'serve' ? 'dev' : 'prod');
  if (!['prod', 'dev', 'test'].includes(environmentValue)) {
    throw new Error(`VITE_NODE_ENV must be one of prod, dev, test. Got: ${environmentValue}`);
  }
  const environment = environmentValue as 'prod' | 'dev' | 'test';
  const robotsMeta = {
    prod: 'index, follow',
    dev: 'noindex, nofollow',
    test: 'noindex, nofollow',
  };
  const robotsMetaContent = robotsMeta[environment];

  const sizesBackgroundTransparent = [57, 64, 72, 76, 114, 120, 144, 152, 180, 192, 256, 384, 512];
  const sizesBackgroundWhite: never[] = [];
  const sizesFavicon = [64];

  const buildInfoPath = path.resolve(appDirectory, VITE_OUTPUT_DIR, 'build-info.txt');
  return {
    base: publicBasePath,
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    server: {
      host: true,
      port: env.VITE_PORT ? Number.parseInt(env.VITE_PORT, 10) : 3000,
    },
    build: {
      outDir: VITE_OUTPUT_DIR,
    },
    resolve: {
      alias: {
        '@local': path.resolve(appDirectory, './src'),
      },
    },
    plugins: [
      pluginUpdateIcons({
        pathInputFile: path.resolve(appDirectory, 'public/logos/logo-petersburg-bridge.png'),
        pathOutputDirectory: path.resolve(appDirectory, 'public/icons'),
        prefix: 'icon',
        sizesBackgroundTransparent: sizesBackgroundTransparent,
        sizesBackgroundWhite: sizesBackgroundWhite,
        sizesFavicon: sizesFavicon,
      }),
      createHtmlPlugin({
        minify: true,
        entry: 'src/main.tsx',
        template: 'index.html',
        inject: {
          data: {
            title: VITE_DEFAULT_NAME_SHORT,
            description: VITE_DEFAULT_DESCRIPTION,
            themeColor: VITE_DEFAULT_THEME_COLOR,
            robotsMeta: robotsMetaContent,
            icon57: `${htmlPublicBasePath}icons/icon-57x57.png`,
            icon72: `${htmlPublicBasePath}icons/icon-72x72.png`,
            icon76: `${htmlPublicBasePath}icons/icon-76x76.png`,
            icon114: `${htmlPublicBasePath}icons/icon-114x114.png`,
            icon120: `${htmlPublicBasePath}icons/icon-120x120.png`,
            icon144: `${htmlPublicBasePath}icons/icon-144x144.png`,
            icon152: `${htmlPublicBasePath}icons/icon-152x152.png`,
            icon180: `${htmlPublicBasePath}icons/icon-180x180.png`,
            icon64Fav: `${htmlPublicBasePath}icons/icon-64x64-favicon.ico`,
          },
        },
      }),
      react(),
      VitePWA({
        filename: 'vite-sw.js',
        strategies: 'generateSW',
        registerType: 'prompt',
        includeManifestIcons: false,
        injectRegister: null,
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,json,woff,woff2}'],
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            ...(VITE_API_URL
              ? [
                  {
                    urlPattern: new RegExp(`^${VITE_API_URL}/.*$`),
                    handler: 'NetworkOnly' as const,
                  },
                ]
              : []),
            {
              urlPattern: /build-info\.txt$/,
              handler: 'NetworkFirst' as const,
              options: {
                cacheName: 'version-cache',
                expiration: {
                  maxEntries: 1,
                  maxAgeSeconds: env.VITE_BUILD_INFO_EXPIRATION_TIME
                    ? Number.parseInt(env.VITE_BUILD_INFO_EXPIRATION_TIME, 10)
                    : 60 * 60 * 24,
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
        manifest: {
          display: 'standalone',
          orientation: 'portrait',
          lang: 'en-US',
          name: VITE_DEFAULT_NAME,
          short_name: VITE_DEFAULT_NAME_SHORT,
          theme_color: VITE_DEFAULT_THEME_COLOR,
          background_color: VITE_DEFAULT_THEME_COLOR,
          description: VITE_DEFAULT_DESCRIPTION,
          scope: publicBasePath,
          start_url: publicBasePath,
          icons: generateManifestIcons({
            path: 'icons',
            prefix: 'icon',
            sizesBackgroundWhite: [],
            sizesBackgroundTransparent: sizesBackgroundTransparent,
            sizesFavicon: sizesFavicon,
          }),
        },
      }),
      pluginWriteBuildInfo({
        pathBuildInfo: buildInfoPath,
        version: pkg.version,
        mode: environment,
      }),
    ],
  };
});
