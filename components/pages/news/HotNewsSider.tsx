'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { hotNewsOptions } from '@/constants/options';
import { ROUTES } from '@/constants/routes';

export const HotNewsSider = () => {
  const { data } = useSuspenseQuery(hotNewsOptions);
  const listHotNews = data?.result?.items || [];
  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-1">
      {listHotNews.map((item) => (
        <div key={item.id} className="relative aspect-video">
          <Image alt="hot news" src={item.cover_url} fill className="rounded object-cover" />
          <div className="absolute inset-0 flex flex-col bg-black bg-opacity-30"></div>
          <div className="absolute bottom-0 left-0 flex flex-col gap-2 p-4">
            <span className="rounded bg-black bg-opacity-45 p-1 text-xs font-bold text-white">
              {item?.category?.name}
            </span>
            <Link className="line-clamp-2 font-bold text-white" href={ROUTES.NEWS_DETAIL(item?.id)}>
              {item?.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
