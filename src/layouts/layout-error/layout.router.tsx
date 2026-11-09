import { logger } from '@local/core/logger';

import { Button } from '@jenesei-software/jenesei-kit-react/component-button';
import { Typography } from '@jenesei-software/jenesei-kit-react/component-typography';
import { CatchBoundary, useRouter } from '@tanstack/react-router';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { ILayoutErrorRouter } from './layout.types';

export function LayoutErrorRouter(): ReactElement<ILayoutErrorRouter> {
  const router = useRouter();
  const { t: tBoundary } = useTranslation('translation', { keyPrefix: 'boundary' });

  return (
    <CatchBoundary getResetKey={() => 'reset'} onCatch={(error) => logger.error(error)}>
      <div
        style={{
          backgroundColor: 'white',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Typography
            sx={{
              variant: 'sub-headline',
              align: 'center',
              weight: '700',
              color: 'textPrimaryLight',
            }}
          >
            {tBoundary('title-1')}
            <br />
            {tBoundary('title-2')}
          </Typography>
          <Button genre={'primary'} size={'small'} onClick={() => router.invalidate()}>
            {tBoundary('title-button')}
          </Button>
        </div>
      </div>
    </CatchBoundary>
  );
}
