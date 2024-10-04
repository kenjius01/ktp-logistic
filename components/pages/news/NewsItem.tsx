'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { NewsType } from '@/constants/types/news.type';
import { formatDateFn } from '@/utils/date.utils';

interface NewsItemProps {
  item: NewsType;
}
export const NewsItem = ({ item }: NewsItemProps) => {
  return (
    <Link href={ROUTES.NEWS_DETAIL(item.id)} prefetch={true} className="">
      <Card className="w-full max-w-sm cursor-pointer overflow-hidden rounded-lg shadow-lg">
        <div className="group relative aspect-[5/3]">
          <Image
            src={item?.cover_url}
            alt="news"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="space-y-3 p-4">
          <CardTitle className="line-clamp-2 text-lg font-semibold transition-colors hover:text-mainColor">
            {item?.title}
          </CardTitle>
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
            <span>{formatDateFn(item?.created_at)}</span>
            <p className="font-semibold uppercase text-mainColor">{item?.category?.name}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
