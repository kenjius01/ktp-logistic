'use client';
import { Suspense, useState } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { PaginationWithLinks } from '@/components/pagination/PaginationWithLinks';
import { SkeletonCard } from '@/components/skeleton/SkeletonCard';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT } from '@/constants/common';
import { OPERATION_FILTER } from '@/constants/filters';
import { KEY_QUERY } from '@/constants/keyQuery';
import { categoryNewsOptions } from '@/constants/options';
import { searchNewsApi } from '@/services/news.api';

import { CategoryNews } from './CategoryNews';
import { NewsItem } from './NewsItem';

export const ListNews = () => {
  const { data } = useSuspenseQuery(categoryNewsOptions);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const [categoryId, setCategoryId] = useState(0);
  const { data: newsRes, isLoading } = useQuery({
    queryKey: [KEY_QUERY.SEARCH_NEWS_BY_CATEGORY, categoryId],
    queryFn: () =>
      searchNewsApi({
        filters:
          categoryId === 0
            ? []
            : [
                {
                  name: 'category_new_id',
                  value: categoryId,
                  operation: OPERATION_FILTER.EQ,
                },
              ],
        keyword: '',
        pageable: { page, page_size: DEFAULT.NEWS_PAGE_SIZE },
      }),
  });
  const listCategory = data?.result?.items || [];
  const news = newsRes?.result?.items || [];
  const totalNews = newsRes?.result?.total || 0;
  const onChangeCategory = (id: number) => {
    setCategoryId(id);
  };
  const turnLoadingToArray = Array.from(Array(DEFAULT.NEWS_PAGE_SIZE).keys()).map((item) => {
    return <SkeletonCard className="w-full" lineClassName="w-full" key={item} times={2} />;
  });

  return (
    <Suspense fallback={<Skeleton />}>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <CategoryNews
          categories={listCategory}
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        {news.length === 0 && !isLoading && (
          <p className="pt-1 text-center md:col-span-2 lg:col-span-3">Không có dữ liệu</p>
        )}
        <div className="grid gap-4 md:col-span-2 lg:col-span-3 lg:grid-cols-3">
          {isLoading && turnLoadingToArray}
          {!isLoading &&
            news.length > 0 &&
            news.map((item) => <NewsItem key={item?.id} item={item} />)}
          {totalNews > 0 && (
            <div className="col-span-3 text-center">
              <PaginationWithLinks
                page={page}
                pageSize={DEFAULT.NEWS_PAGE_SIZE}
                totalCount={totalNews}
              />
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};
