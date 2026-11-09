/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEFAULT_NAME: string;
  readonly VITE_DEFAULT_NAME_SHORT: string;
  readonly VITE_DEFAULT_DESCRIPTION: string;
  readonly VITE_DEFAULT_THEME_COLOR: string;
  readonly VITE_BASE_PATH: string;
  readonly VITE_NODE_ENV: 'dev' | 'prod' | 'test';
  readonly VITE_QUERY_STALE_TIME: string;
  readonly VITE_BUILD_INFO_EXPIRATION_TIME: string;
  readonly VITE_PORT: string;
  readonly VITE_OUTPUT_DIR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Replaced at build time from package.json by vite.config.ts. */
declare const __APP_VERSION__: string;

declare module 'virtual:pwa-register' {
  export type RegisterSWOptions = {
    immediate?: boolean;
    onNeedRefresh?: () => void | Promise<void>;
    onOfflineReady?: () => void | Promise<void>;
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void | Promise<void>;
    onRegisterError?: (error: unknown) => void | Promise<void>;
  };

  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>;
}
