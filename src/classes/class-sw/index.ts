import { env } from '@local/core/envs';
import { logger } from '@local/core/logger';

import { registerSW } from 'virtual:pwa-register';

type IClassSwUpdateFn = (reloadPage?: boolean) => Promise<void>;
type IClassSwChangeListener = () => void;
type IClassSwStatus =
  | 'disabled'
  | 'disabling'
  | 'idle'
  | 'registering'
  | 'resetting'
  | 'registered'
  | 'unregistered'
  | 'offline-ready'
  | 'update-available'
  | 'error';

export interface IClassSwInitOptions {
  /** Enables or disables service worker registration for the app. */
  enabled?: boolean;
  /** Registers the service worker immediately after initialization. */
  immediate?: boolean;
}

export interface IClassSwResetCacheOptions {
  /** Reloads the page after the cache is cleared so SW registration restarts from a clean slate. */
  reloadPage?: boolean;
  /** Re-registers the service worker in-place when a full page reload is not desired. */
  reRegister?: boolean;
}

export interface IClassSwSnapshot {
  /** Current lifecycle status of the service worker manager. */
  status: IClassSwStatus;
  /** Whether service worker support is enabled in app configuration. */
  isEnabled: boolean;
  /** Whether the current browser supports service workers. */
  isSupported: boolean;
  /** Whether the service worker manager has already been initialized. */
  isInitialized: boolean;
  /** Whether a service worker registration is currently active. */
  isRegistered: boolean;
  /** Whether the app is ready to work offline. */
  isOfflineReady: boolean;
  /** Whether a newer service worker version is available. */
  isUpdateAvailable: boolean;
  /** Whether the UI should prompt the user to refresh the page. */
  isNeedRefresh: boolean;
  /** Current application version reported by the active build. */
  currentVersion: string | null;
  /** Version detected for the newly available service worker build. */
  newVersion: string | null;
  /** Scope returned by the browser for the current service worker registration. */
  registrationScope: string | null;
  /** Last known service worker error message, if any. */
  error: string | null;
}

export class ClassSw {
  private updateSW: IClassSwUpdateFn | null = null;
  private initOptions: IClassSwInitOptions = {};

  // These fields are the single source of truth for SW/PWA state inside the app.
  private valueStatus: IClassSwStatus = 'idle';
  private valueIsEnabled = true;
  private valueIsSupported = typeof window !== 'undefined' && 'serviceWorker' in navigator;
  private valueIsInitialized = false;
  private valueIsRegistered = false;
  private valueIsUpdateAvailable = false;
  private valueIsOfflineReady = false;
  private valueIsNeedRefresh = false;
  private valueCurrentVersion: string | null = null;
  private valueNewVersion: string | null = null;
  private valueRegistrationScope: string | null = null;
  private valueError: string | null = null;

  private listeners: IClassSwChangeListener[] = [];

  init(options?: IClassSwInitOptions) {
    if (this.valueIsInitialized) return;

    this.valueIsInitialized = true;
    this.initOptions = options ?? {};
    this.valueIsEnabled = options?.enabled ?? true;

    if (!this.valueIsEnabled) {
      if (!this.valueIsSupported) {
        this.valueStatus = 'disabled';
        this.notify();
        return;
      }

      // When PWA is disabled we still need to clean up a previously installed SW.
      this.valueStatus = 'disabling';
      this.notify();
      void this.disableServiceWorker();
      return;
    }

    if (!this.valueIsSupported) {
      this.valueStatus = 'error';
      this.valueError = 'Service workers are not supported in this browser.';
      this.notify();
      return;
    }

    this.registerServiceWorker();
  }

  setCurrentVersion(version: string | null) {
    this.valueCurrentVersion = version;
    this.notify();
  }

  async updateApp(reloadPage = true) {
    try {
      if (typeof this.updateSW === 'function') {
        await this.updateSW(reloadPage);
      }
    } catch {
      logger.warn('updateSW() called before SW initialized');
    }
  }

  async resetAppCache(options?: IClassSwResetCacheOptions) {
    if (!this.valueIsSupported) {
      this.valueStatus = 'error';
      this.valueError = 'Service workers are not supported in this browser.';
      this.notify();
      return;
    }

    const reloadPage = options?.reloadPage ?? true;
    const reRegister = options?.reRegister ?? !reloadPage;

    this.valueStatus = 'resetting';
    this.valueError = null;
    this.notify();

    try {
      const hasStorageToCleanup = await this.clearServiceWorkerStorage();

      if (!this.valueIsEnabled) {
        this.valueStatus = hasStorageToCleanup ? 'unregistered' : 'disabled';
        this.notify();
        return;
      }

      if (reloadPage) {
        window.location.reload();
        return;
      }

      if (reRegister) {
        this.registerServiceWorker();
        return;
      }

      this.valueStatus = hasStorageToCleanup ? 'unregistered' : 'idle';
      this.notify();
    } catch (error) {
      this.valueStatus = 'error';
      this.valueError = error instanceof Error ? error.message : 'Service worker reset failed.';
      this.notify();
      throw error;
    }
  }

  get isUpdateAvailable() {
    return this.valueIsUpdateAvailable;
  }

  get isEnabled() {
    return this.valueIsEnabled;
  }

  get isSupported() {
    return this.valueIsSupported;
  }

  get isInitialized() {
    return this.valueIsInitialized;
  }

  get isRegistered() {
    return this.valueIsRegistered;
  }

  get isOfflineReady() {
    return this.valueIsOfflineReady;
  }

  get isNeedRefresh() {
    return this.valueIsNeedRefresh;
  }

  get status() {
    return this.valueStatus;
  }

  get currentVersion() {
    return this.valueCurrentVersion;
  }

  get newVersion() {
    return this.valueNewVersion;
  }

  get registrationScope() {
    return this.valueRegistrationScope;
  }

  get error() {
    return this.valueError;
  }

  get snapshot(): IClassSwSnapshot {
    return {
      status: this.valueStatus,
      isEnabled: this.valueIsEnabled,
      isSupported: this.valueIsSupported,
      isInitialized: this.valueIsInitialized,
      isRegistered: this.valueIsRegistered,
      isOfflineReady: this.valueIsOfflineReady,
      isUpdateAvailable: this.valueIsUpdateAvailable,
      isNeedRefresh: this.valueIsNeedRefresh,
      currentVersion: this.valueCurrentVersion,
      newVersion: this.valueNewVersion,
      registrationScope: this.valueRegistrationScope,
      error: this.valueError,
    };
  }

  subscribe(cb: IClassSwChangeListener) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    // ClassSw is consumed as a small external store, so every mutation fan-outs here.
    this.listeners.forEach((cb) => {
      try {
        cb();
      } catch {
        /* ignore listener errors */
      }
    });
  }

  private async readBuildInfoVersion() {
    const url = new URL(`${env.basePath}build-info.txt`, window.location.origin);
    url.searchParams.set('sw-update', Date.now().toString());

    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!res.ok) return null;

    const text = await res.text();
    const versionLine = text
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line.startsWith('version:'));
    const version = versionLine?.slice('version:'.length).trim() ?? null;

    return version && version !== this.valueCurrentVersion ? version : null;
  }

  private async handleNeedRefresh() {
    this.valueIsUpdateAvailable = true;
    this.valueStatus = 'update-available';
    this.notify();

    try {
      this.valueNewVersion = await this.readBuildInfoVersion();
      this.valueIsNeedRefresh = true;
    } catch {
      this.valueNewVersion = null;
      this.valueIsNeedRefresh = true;
    }

    this.notify();
  }

  private handleOfflineReady() {
    this.valueIsOfflineReady = true;
    this.valueIsNeedRefresh = false;
    this.valueStatus = 'offline-ready';
    this.notify();
  }

  private registerServiceWorker() {
    this.valueIsRegistered = false;
    this.valueRegistrationScope = null;
    this.valueIsOfflineReady = false;
    this.valueIsUpdateAvailable = false;
    this.valueIsNeedRefresh = false;
    this.valueNewVersion = null;
    this.valueError = null;
    this.valueStatus = 'registering';
    this.notify();

    this.updateSW = registerSW({
      immediate: this.initOptions.immediate,
      onNeedRefresh: () => void this.handleNeedRefresh(),
      onOfflineReady: () => void this.handleOfflineReady(),
      onRegistered: (registration) => {
        this.valueIsRegistered = Boolean(registration);
        this.valueRegistrationScope = registration?.scope ?? null;
        this.valueStatus = registration ? 'registered' : 'idle';
        this.valueError = null;
        this.notify();
      },
      onRegisterError: (error) => {
        this.valueStatus = 'error';
        this.valueError = error instanceof Error ? error.message : 'Service worker registration failed.';
        this.notify();
      },
    });
  }

  private async disableServiceWorker() {
    try {
      const hasStorageToCleanup = await this.clearServiceWorkerStorage();
      this.valueStatus = hasStorageToCleanup ? 'unregistered' : 'disabled';
    } catch (error) {
      this.valueStatus = 'error';
      this.valueError = error instanceof Error ? error.message : 'Service worker cleanup failed.';
    }

    this.notify();
  }

  private async clearServiceWorkerStorage() {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));

    let cacheKeys: string[] = [];
    if (typeof caches !== 'undefined') {
      // We clear caches together with unregister so stale offline data does not survive between installs.
      cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((cacheKey) => caches.delete(cacheKey)));
    }

    this.updateSW = null;
    this.valueIsRegistered = false;
    this.valueRegistrationScope = null;
    this.valueIsOfflineReady = false;
    this.valueIsUpdateAvailable = false;
    this.valueIsNeedRefresh = false;
    this.valueNewVersion = null;
    this.valueError = null;

    return registrations.length > 0 || cacheKeys.length > 0;
  }
}

export const swService = new ClassSw();
