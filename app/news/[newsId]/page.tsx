import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Container } from '@/components/Container';
import { HotNewsSider } from '@/components/pages/news/HotNewsSider';
import { NewsDetail } from '@/components/pages/news/NewsDetail';
import { detailNewsOptions, hotNewsOptions } from '@/constants/options';
import { getQueryClient } from '@/lib/get-query-client';

interface NewsDetailPageProps {
  params: {
    newsId: string;
  };
}

const NewsDetailPage = ({ params: { newsId } }: NewsDetailPageProps) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(detailNewsOptions(newsId));
  void queryClient.prefetchQuery(hotNewsOptions);

  return (
    <Container>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="mb-16 mt-10 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <NewsDetail />
          </div>
          <div className="h-fit rounded bg-gray-100 p-8 md:col-span-1">
            <h4 className="pb-4 font-bold uppercase">TIN TỨC NỔI BẬT</h4>
            <HotNewsSider />
          </div>
        </div>
      </HydrationBoundary>
    </Container>
  );
};

export default NewsDetailPage;
