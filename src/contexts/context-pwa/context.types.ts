import { PropsWithChildren } from 'react';

export type IPWAProvider = PropsWithChildren;
export type TPWAStatus =
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

export interface IPWAContext {
  status: TPWAStatus;
  isEnabled: boolean;
  isSupported: boolean;
  isInitialized: boolean;
  isRegistered: boolean;
  isOfflineReady: boolean;
  isUpdateAvailable: boolean;
  isNeedRefresh: boolean;
  newVersion: string | null;
  currentVersion: string | null;
  registrationScope: string | null;
  error: string | null;
  updateApp: () => void;
  resetAppCache: () => void;
}
