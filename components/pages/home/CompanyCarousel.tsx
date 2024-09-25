'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_FILTER } from '@/constants/common';
import { SEARCH_COMPANY_PHOTO_KEY } from '@/constants/keyQuery';
import { searchCompanyPhotoApi } from '@/services/common.services';

export const CompanyCarousel = () => {
  const { data, isLoading } = useQuery({
    queryKey: [SEARCH_COMPANY_PHOTO_KEY],
    queryFn: () => searchCompanyPhotoApi(DEFAULT_FILTER),
  });
  const listPhoto = data?.result?.items || [];
  return (
    <div className="p-6">
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
          className="mt-8 w-auto"
        >
          <CarouselContent>
            {listPhoto.map((item) => (
              <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3">
                <div className="relative mb-2 aspect-[3/4] h-auto">
                  <Image
                    src={item.link}
                    alt="order"
                    style={{ objectFit: 'cover' }}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};
