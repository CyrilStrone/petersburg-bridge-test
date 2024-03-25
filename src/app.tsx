import { i18n } from '@assets/library-i18n'
import { LayoutApp } from '@layouts/layout-app'
import { ProviderLanguage } from '@providers/provider-language'
import { themeProject } from '@styles/global/theme.project'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={themeProject}>
        <BrowserRouter>
          <ProviderLanguage>
            <LayoutApp />
          </ProviderLanguage>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  )
}

export default App
