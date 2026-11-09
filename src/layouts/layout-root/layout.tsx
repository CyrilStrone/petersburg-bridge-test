import { usePWA } from '@local/contexts/context-pwa';
import { env } from '@local/core/envs';
import { tableString } from '@local/core/functions';
import { logger } from '@local/core/logger';

import { Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { RubyUpdateApp } from './layout.styles';

export function LayoutRoot() {
  const { isUpdateAvailable, updateApp } = usePWA(['isUpdateAvailable', 'updateApp']);
  const { t } = useTranslation('translation');

  useEffect(() => {
    logger.info(tableString(env));
  }, []);

  return (
    <>
      <Outlet />
      {isUpdateAvailable && (
        <RubyUpdateApp type='button' onClick={updateApp}>
          {t('pwa.update')}
        </RubyUpdateApp>
      )}
    </>
  );
}
