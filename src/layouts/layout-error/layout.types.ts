import { ReactNode } from 'react';

export type ILayoutErrorRouter = object;

export interface ILayoutErrorBoundary {
  children: ReactNode;
}

export interface ILayoutErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
