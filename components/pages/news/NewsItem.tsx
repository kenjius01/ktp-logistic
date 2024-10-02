'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { NewsType } from '@/constants/types/news.type';
import { formatDateFn } from '@/utils/date.utils';

interface NewsItemProps {
  item: NewsType;
}
export const NewsItem = ({ item }: NewsItemProps) => {
  const router = useRouter();
  const onNavigateNews = (id: number) => {
    router.push(ROUTES.NEWS_DETAIL(id));
  };
  return (
    <div>
      <Card
        className="w-full max-w-sm cursor-pointer overflow-hidden rounded-lg shadow-lg"
        onClick={() => onNavigateNews(item.id)}
      >
        <div className="group relative aspect-[4/2]">
          <Image
            src={item?.cover_url}
            alt="news"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="space-y-3 p-6">
          <CardTitle className="text-lg font-semibold transition-colors hover:text-mainColor">
            {item?.title}
          </CardTitle>
          <div className="flex items-center justify-between gap-2 text-sm font-medium text-muted-foreground">
            <p className="font-semibold text-mainColor">{item.category_new_id}</p>
            <span>{formatDateFn(item?.created_at)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
