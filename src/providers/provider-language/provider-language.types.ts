export interface ProviderLanguageProps {
  children: React.ReactNode
}

export interface LanguageContextProps {
  lang: string
  changeLanguage: (newLang: string) => void
}
