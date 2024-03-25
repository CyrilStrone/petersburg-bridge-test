import eng from './eng.json'
import ru from './ru.json'
import i18n from 'i18next'

export const languageList = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
]

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'eng',
  fallbackLng: 'eng',
  resources: {
    ru,
    eng,
  },
})

export type availableLanguages = (typeof i18n.languages)[number]

export { i18n }
