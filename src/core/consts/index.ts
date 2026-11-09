import { transformObjectToArray } from '@local/core/functions';
import { ILanguage } from '@local/core/types';

export const OBJECT_LANGUAGE: ILanguage = {
  'en-US': {
    value: 'en-US',
    label: 'English',
    placeholder: 'English',
    search: 'English, en-US',
  },
  'ru-RU': {
    value: 'ru-RU',
    label: 'Русский',
    placeholder: 'Русский',
    search: 'Русский, ru-RU',
  },
};

export const LIST_LANGUAGE = transformObjectToArray(OBJECT_LANGUAGE);
