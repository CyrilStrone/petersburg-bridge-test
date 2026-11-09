import { logger } from '@local/core/logger';

import { Typography } from '@jenesei-software/jenesei-kit-react/component-typography';
import React, { Component } from 'react';

import { ILayoutErrorBoundary, ILayoutErrorBoundaryState } from './layout.types';

export class LayoutErrorBoundary extends Component<ILayoutErrorBoundary, ILayoutErrorBoundaryState> {
  constructor(props: ILayoutErrorBoundary) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
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
              gap: '12px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
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
              An unknown error occurred.
              <br />
              Please try again later.
            </Typography>
            {this.state.error?.message && (
              <Typography
                sx={{
                  variant: 'sub-headline',
                  align: 'center',
                  weight: '700',
                  color: 'textPrimaryLight',
                }}
              >
                {this.state.error.message}
              </Typography>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
