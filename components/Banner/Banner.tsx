'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { bannerOptions } from '@/constants/options';
import { BannerType } from '@/constants/types/common.type';

import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { Skeleton } from '../ui/skeleton';
export const Banner = () => {
  const { data, isLoading } = useSuspenseQuery(bannerOptions);
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
