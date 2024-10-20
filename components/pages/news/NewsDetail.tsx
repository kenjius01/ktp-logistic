'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { AppBreadcrumb } from '@/components/container/breadcrumb/AppBreadcrumb';
import { StringToHtml } from '@/components/container/stringToHtml/StringToHtml';
import { Separator } from '@/components/ui/separator';
import { DEFAULT } from '@/constants/common';
import { OPERATION_FILTER } from '@/constants/filters';
import { SEARCH_NEWS_KEY } from '@/constants/keyQuery';
import { detailNewsOptions } from '@/constants/options';
import { ROUTES } from '@/constants/routes';
import { searchNewsApi } from '@/services/news.api';
import { getIdFromSeo } from '@/utils/function.utils';

import { NewsItem } from './NewsItem';
import { ShareNewsBtn } from './ShareNewsBtn';

export const NewsDetail = () => {
  const { seoId } = useParams();
  const newsId = getIdFromSeo(seoId.toString());
  const { data } = useSuspenseQuery(detailNewsOptions(newsId.toString()));
  const newsDetail = data?.result || {};
  const { data: otherNewsRes } = useQuery({
    queryKey: [SEARCH_NEWS_KEY, newsId],
    queryFn: () =>
      searchNewsApi({
        filters: [
          {
            name: 'category_new_id',
            value: newsId,
            operation: OPERATION_FILTER.NE,
          },
        ],
        keyword: '',
        pageable: { page: DEFAULT.PAGE, page_size: DEFAULT.PAGE_SIZE },
      }),
  });
  const listOtherNews = otherNewsRes?.result?.items || [];

  const listItems = [
    {
      name: 'Tin tức',
      link: ROUTES.NEWS,
      color: true,
    },
    {
      name: newsDetail?.category?.name,
    },
  ];

  return (
    <div>
      <AppBreadcrumb
        date={newsDetail?.created_at}
        listItems={listItems}
        className="pb-4 uppercase"
      />
      <h2 className="pb-4 text-4xl font-bold leading-10">{newsDetail?.title}</h2>
      <StringToHtml string={newsDetail?.content || ''} className="" />
      <br />
      <ShareNewsBtn />
      <Separator className="my-8" />
      <div className="mt-8">
        <h4 className="pb-4 text-lg font-bold uppercase">TIN TỨC KHÁC</h4>
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
          {listOtherNews.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
