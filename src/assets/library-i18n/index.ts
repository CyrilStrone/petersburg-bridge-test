import eng from './eng.json'
import ru from './ru.json'
import i18n from 'i18next'

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'ru',
  fallbackLng: 'ru',
  resources: {
    ru,
    eng,
  },
})

export type availableLanguages = (typeof i18n.languages)[number]

export { i18n }
