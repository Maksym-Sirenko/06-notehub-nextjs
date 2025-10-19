// components/TanStackProvider/TanStackProvider.tsx

'use client';

import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  HydrationBoundary,
  DehydratedState,
} from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
  dehydratedState?: DehydratedState | null;
};

export default function TanStackProvider({ children, dehydratedState }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 2,
          },
        },
      }),
  );

  const safeState: DehydratedState | undefined =
    dehydratedState && typeof dehydratedState === 'object'
      ? (dehydratedState as DehydratedState)
      : undefined;

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={safeState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
