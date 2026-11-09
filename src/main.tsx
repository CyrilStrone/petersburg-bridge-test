import { swService } from '@local/classes/class-sw';
import { env } from '@local/core/envs';
import { logger } from '@local/core/logger';
import '@local/core/i18n/index';
import '@local/styles/global/index.css';
import App from '@local/app';

import '@jenesei-software/jenesei-kit-react/styles.css';
import '@fontsource/inter/cyrillic-400.css';
import '@fontsource/inter/cyrillic-500.css';
import '@fontsource/inter/cyrillic-700.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/roboto/cyrillic-400.css';
import '@fontsource/roboto/cyrillic-500.css';
import '@fontsource/roboto/cyrillic-700.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

try {
  swService.init({
    enabled: env.mode === 'prod',
  });
  swService.setCurrentVersion(env.version ?? null);
} catch (e) {
  logger.warn('SW init failed', e);
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>,
);
