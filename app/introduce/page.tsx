import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { IntroduceComponent } from '@/components/pages/introduce/IntroduceComponent';
import { introduceOptions } from '@/constants/options';
import { getQueryClient } from '@/lib/get-query-client';

const IntroducePage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(introduceOptions);
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <IntroduceComponent />
      </HydrationBoundary>
    </div>
  );
};

export default IntroducePage;
