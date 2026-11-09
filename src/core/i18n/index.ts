import { env } from '@local/core/envs';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import translation from '../../../public/locales/en-US/translation.json';
import { OBJECT_LANGUAGE } from '../consts';
import { ILanguageKeys, normalizeLanguage } from '../types';

export const defaultNS: INameSpace = 'translation';
export const fallbackLng = OBJECT_LANGUAGE['en-US'].value as ILanguageKeys;
export const supportedLngs = Object.values(OBJECT_LANGUAGE).map((lang) => lang.value) as ILanguageKeys[];
export const browserLng = normalizeLanguage(navigator.language);

export type INameSpace = 'translation';

export type IResources = typeof translation;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: 'currentOnly',
    defaultNS,
    detection: {
      convertDetectedLanguage: (lng) => normalizeLanguage(lng),
    },
    backend: {
      backends: [HttpApi],
      backendOptions: [
        {
          loadPath: `${env.basePath}locales/{{lng}}/{{ns}}.json`,
        },
      ],
    },
    supportedLngs: supportedLngs,
    fallbackLng: fallbackLng,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export { i18n };
