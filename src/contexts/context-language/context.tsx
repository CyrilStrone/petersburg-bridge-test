import { browserLng, fallbackLng, supportedLngs } from '@local/core/i18n';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { createContext, useContextSelector } from 'use-context-selector';

import { ILanguageContext, ILanguageProvider } from './context.types';

const LanguageContext = createContext<ILanguageContext | null>(null);

export const useLanguage = <K extends keyof ILanguageContext>(props: K[]): Pick<ILanguageContext, K> => {
  const context = useContextSelector(LanguageContext, (v) => {
    if (!v) return null;
    return Object.fromEntries(props.map((prop) => [prop, v[prop]])) as Pick<ILanguageContext, K>;
  });
  if (!context) {
    throw new Error('useLanguage must be used within an ProviderLanguage');
  }
  return context;
};

export const ProviderLanguage: FC<ILanguageProvider> = (props) => {
  const { i18n } = useTranslation();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const changeLng: ILanguageContext['changeLng'] = useCallback(
    (lng) => {
      setIsLoading(true);
      i18n
        .changeLanguage(lng)
        .then(() => {
          setIsError(false);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [i18n],
  );

  const lng = useMemo(() => i18n.language as ILanguageContext['lng'], [i18n.language]);
  const localFallbackLng = useMemo(() => fallbackLng, []);
  const localSupportedLngs = useMemo(() => supportedLngs, []);
  const localBrowserLng = useMemo(() => browserLng, []);

  useEffect(() => {
    document.documentElement.lang = lng;
  }, [lng]);

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider
        value={{
          fallbackLng: localFallbackLng,
          supportedLngs: localSupportedLngs,
          browserLng: localBrowserLng,
          lng,
          isError,
          isLoading,
          changeLng,
        }}
      >
        {props.children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
};
