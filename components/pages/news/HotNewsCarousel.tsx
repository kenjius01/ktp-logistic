'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { hotNewsOptions } from '@/constants/options';
import { ROUTES } from '@/constants/routes';

export const HotNewsCarousel = () => {
  const { data } = useSuspenseQuery(hotNewsOptions);
  const router = useRouter();

  const listHotNews = data?.result?.items || [];
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {listHotNews.map((item) => (
            <CarouselItem key={item?.id}>
              <div className="relative h-[400px] w-full">
                <Image
                  src={item?.cover_url}
                  alt="hot news"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black bg-opacity-50 p-6">
                  <h2 className="text-4xl font-bold text-white">{item?.title}</h2>
                  <Button
                    size={'lg'}
                    variant={'secondary'}
                    onClick={() => router.push(ROUTES.NEWS_DETAIL(item?.id))}
                    className="font-bold uppercase hover:bg-mainColor hover:text-white"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};
