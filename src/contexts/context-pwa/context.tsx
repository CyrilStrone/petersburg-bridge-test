import { swService } from '@local/classes/class-sw';

import { FC, useCallback, useEffect, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { IPWAContext, IPWAProvider } from './context.types';

const PWAContext = createContext<IPWAContext | null>(null);

export const usePWA = <K extends keyof IPWAContext>(props: K[]): Pick<IPWAContext, K> => {
  const context = useContextSelector(PWAContext, (v) => {
    if (!v) return null;
    return Object.fromEntries(props.map((prop) => [prop, v[prop]])) as Pick<IPWAContext, K>;
  });
  if (!context) {
    throw new Error('usePWA must be used within an ProviderPWA');
  }
  return context;
};

export const ProviderPWA: FC<IPWAProvider> = ({ children }) => {
  // ProviderPWA mirrors the external ClassSw store into React state for convenient UI access.
  const [status, setStatus] = useState<IPWAContext['status']>('idle');
  const [isEnabled, setIsEnabled] = useState(true);
  const [isSupported, setIsSupported] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOfflineReady, setIsOfflineReady] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isNeedRefresh, setIsNeedRefresh] = useState(false);
  const [newVersion, setNewVersion] = useState<string | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  const [registrationScope, setRegistrationScope] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncState = () => {
      // Pull the full snapshot from ClassSw so context consumers always read consistent values.
      setStatus(swService.status);
      setIsEnabled(swService.isEnabled);
      setIsSupported(swService.isSupported);
      setIsInitialized(swService.isInitialized);
      setIsRegistered(swService.isRegistered);
      setIsOfflineReady(swService.isOfflineReady);
      setIsUpdateAvailable(swService.isUpdateAvailable);
      setIsNeedRefresh(swService.isNeedRefresh);
      setNewVersion(swService.newVersion ?? null);
      setCurrentVersion(swService.currentVersion ?? null);
      setRegistrationScope(swService.registrationScope ?? null);
      setError(swService.error ?? null);
    };

    syncState();

    const unSubscribe = swService.subscribe(() => {
      // Any SW lifecycle event updates the provider through this subscription.
      syncState();
    });

    return () => unSubscribe();
  }, []);

  const updateApp = useCallback(() => {
    try {
      // If SW-driven update fails, fall back to a hard reload instead of leaving UI stuck.
      swService.updateApp().catch(() => window.location.reload());
    } catch {
      window.location.reload();
    }
  }, []);

  const resetAppCache = useCallback(() => {
    try {
      // A full cache reset should end with a clean bootstrap even if the SW helper throws midway.
      swService.resetAppCache().catch(() => window.location.reload());
    } catch {
      window.location.reload();
    }
  }, []);

  return (
    <PWAContext.Provider
      value={{
        status,
        isEnabled,
        isSupported,
        isInitialized,
        isRegistered,
        currentVersion,
        newVersion,
        registrationScope,
        error,
        updateApp,
        resetAppCache,
        isOfflineReady,
        isUpdateAvailable,
        isNeedRefresh,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
};
