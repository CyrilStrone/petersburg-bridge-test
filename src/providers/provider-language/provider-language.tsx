import { LanguageContextProps, ProviderLanguageProps } from '.'
import { i18n } from '@assets/library-i18n'
import { createContext, useContext } from 'react'
import { I18nextProvider } from 'react-i18next'

const LanguageContext = createContext<LanguageContextProps | null>(null)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within an AuthProvider')
  }
  return context
}

export const ProviderLanguage: React.FC<ProviderLanguageProps> = (props) => {
  const changeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang)
  }

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider
        value={{
          lang: i18n.language,
          changeLanguage,
        }}
      >
        {props.children}
      </LanguageContext.Provider>
    </I18nextProvider>
  )
}
