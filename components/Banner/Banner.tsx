'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { DEFAULT_FILTER } from '@/constants/common';
import { SEARCH_BANNERS_KEY } from '@/constants/keyQuery';
import { BannerType } from '@/constants/types/common.type';
import { searchBannersApi } from '@/services/common.services';

import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { Skeleton } from '../ui/skeleton';
export const Banner = () => {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: [SEARCH_BANNERS_KEY],
    queryFn: () => searchBannersApi(DEFAULT_FILTER),
  });
  const listBanners: BannerType[] = data?.result?.items || [];
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-[400px] w-full" />
      ) : (
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {listBanners.map((item) => (
              <CarouselItem key={item.id} className="relative h-[400px] w-full">
                <Image style={{ objectFit: 'cover' }} alt="banner" src={item?.link} fill priority />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
        <CarouselNext /> */}
        </Carousel>
      )}
    </div>
  );
};
