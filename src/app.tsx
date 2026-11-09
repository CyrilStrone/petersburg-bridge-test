import { ProviderLanguage } from '@local/contexts/context-language';
import { ProviderPWA } from '@local/contexts/context-pwa';
import { queryClient } from '@local/core/query';
import { LayoutErrorBoundary } from '@local/layouts/layout-error';
import { LayoutRouter } from '@local/layouts/layout-router';
import { themeProject } from '@local/styles/global/theme.project';

import { ProviderDialog } from '@jenesei-software/jenesei-kit-react/context-dialog';
import { ProviderScreenWidth } from '@jenesei-software/jenesei-kit-react/context-screen-width';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ProviderScreenWidth>
      <ProviderLanguage>
        <LayoutErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={themeProject}>
              <ProviderDialog zIndex={1000}>
                <ProviderPWA>
                  <LayoutRouter />
                </ProviderPWA>
              </ProviderDialog>
            </ThemeProvider>
          </QueryClientProvider>
        </LayoutErrorBoundary>
      </ProviderLanguage>
    </ProviderScreenWidth>
  );
}

export default App;
