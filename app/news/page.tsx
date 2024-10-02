import React, { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Container } from '@/components/Container';
import { HotNewsCarousel } from '@/components/pages/news/HotNewsCarousel';
import { ListNews } from '@/components/pages/news/ListNews';
import { Skeleton } from '@/components/ui/skeleton';
import { categoryNewsOptions, hotNewsOptions } from '@/constants/options';
import { getQueryClient } from '@/lib/get-query-client';

const NewsPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(hotNewsOptions);
  void queryClient.prefetchQuery(categoryNewsOptions);
  return (
    <div>
      <Container>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="slide">
            <HotNewsCarousel />
          </div>
          <div className="mb-16 mt-12">
            <Suspense fallback={<Skeleton />}>
              <ListNews />
            </Suspense>
          </div>
        </HydrationBoundary>
      </Container>
    </div>
  );
};

export default NewsPage;
