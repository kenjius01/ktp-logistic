'use client';
import { useCallback, useState } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { PaginationWithLinks } from '@/components/pagination/PaginationWithLinks';
import { SkeletonCard } from '@/components/skeleton/SkeletonCard';
import { DEFAULT } from '@/constants/common';
import { OPERATION_FILTER } from '@/constants/filters';
import { KEY_QUERY } from '@/constants/keyQuery';
import { categoryNewsOptions } from '@/constants/options';
import { searchNewsApi } from '@/services/news.api';

import { CategoryNews } from './CategoryNews';
import { NewsItem } from './NewsItem';

export const ListNews = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSuspenseQuery(categoryNewsOptions);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || DEFAULT.PAGE;
  const [categoryId, setCategoryId] = useState(0);
  const { data: newsRes, isLoading } = useQuery({
    queryKey: [KEY_QUERY.SEARCH_NEWS_BY_CATEGORY, categoryId, page],
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

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const onChangeCategory = (id: number) => {
    setCategoryId(id);
    router.push(pathname + '?' + createQueryString('page', DEFAULT.PAGE.toString()));
  };
  const turnLoadingToArray = Array.from(Array(DEFAULT.NEWS_PAGE_SIZE).keys()).map((item) => {
    return <SkeletonCard className="w-full" lineClassName="w-full" key={item} times={2} />;
  });

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <CategoryNews
          categories={listCategory}
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        {news.length === 0 && !isLoading && (
          <p className="pt-1 text-center md:col-span-2 lg:col-span-3">Không có dữ liệu</p>
        )}
        <div className="mx-auto w-full gap-4 md:col-span-2 lg:col-span-3">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading && turnLoadingToArray}
            {!isLoading &&
              news.length > 0 &&
              news.map((item) => <NewsItem key={item?.id} item={item} />)}
          </div>
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
    </div>
  );
};
