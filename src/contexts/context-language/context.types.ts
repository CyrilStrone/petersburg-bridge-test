import { ILanguageKeys } from '@local/core/types';

import { PropsWithChildren } from 'react';

export type ILanguageProvider = PropsWithChildren;

export interface ILanguageContext {
  browserLng: string;

  changeLng: (lng: ILanguageKeys) => void;

  fallbackLng: ILanguageKeys;

  isError: boolean;

  isLoading: boolean;

  lng: ILanguageKeys;

  supportedLngs: ILanguageKeys[];
}
