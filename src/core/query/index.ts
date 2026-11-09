import { env } from '@local/core/envs';

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Number(env.queryStaleTime) || 0,
    },
  },
});
