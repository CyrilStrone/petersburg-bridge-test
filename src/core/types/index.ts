export type ILanguageKeys = 'en-US' | 'ru-RU';
export type ILanguage = Record<
  ILanguageKeys,
  { value: ILanguageKeys; label: string; placeholder: string; search: string }
>;

export const normalizeLanguage = (lng: string): ILanguageKeys => {
  return lng.toLowerCase().startsWith('ru') ? 'ru-RU' : 'en-US';
};
