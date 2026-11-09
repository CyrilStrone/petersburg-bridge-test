import { env } from '@local/core/envs';
import { queryClient } from '@local/core/query';
import { LayoutErrorRouter } from '@local/layouts/layout-error';
import { LayoutPublic } from '@local/layouts/layout-public';
import { LayoutRoot } from '@local/layouts/layout-root';
import { PagePublicGame } from '@local/pages/public/game';

import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, createRoute, createRouter, Navigate } from '@tanstack/react-router';

import { validateILayoutRouteRootSearch } from './router.search';

export interface IContext {
  queryClient: QueryClient;
}

export const LayoutRouteRoot = createRootRouteWithContext<IContext>()({
  component: LayoutRoot,
  validateSearch: validateILayoutRouteRootSearch,
  errorComponent: LayoutErrorRouter,
  notFoundComponent: () => <Navigate to='/' />,
});

export const LayoutRoutePublic = createRoute({
  getParentRoute: () => LayoutRouteRoot,
  id: 'public',
  component: LayoutPublic,
});

export const PageRoutePublicGame = createRoute({
  getParentRoute: () => LayoutRoutePublic,
  component: PagePublicGame,
  path: '/',
});

const routeTree = LayoutRouteRoot.addChildren({
  LayoutRoutePublic: LayoutRoutePublic.addChildren({
    PageRoutePublicGame,
  }),
});

export const router = createRouter({
  basepath: env.basePath,
  routeTree: routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
