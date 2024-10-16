'use client';

import { useRef } from 'react';
import { IconLeft, IconRight } from 'react-day-picker';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { StringToHtml } from '@/components/container/stringToHtml/StringToHtml';
import { Button } from '@/components/ui/button';
import { shippingRegulationOptions } from '@/constants/options';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

export const ShippingRegulation = () => {
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  const page = Number(searchParams.get('page') || 1);
  const { data } = useSuspenseQuery(shippingRegulationOptions(Number(page)));
  const shippingRegulations = data?.result?.items || [];
  const total = data?.result?.total || 0;
  const isFirstPage = Number(page) === 1;
  const isLastPage = Number(page) >= total;

  const scrollToView = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={ref} id="shipping-regulation" className="">
      <div className="">
        {shippingRegulations.map((item) => (
          <div key={item.id}>
            <h2 className="mb-5 text-2xl font-bold">{item.title}</h2>
            <div className="relative aspect-[7/4] w-full">
              <Image
                alt="shipping regulation"
                src={item.image_url}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <StringToHtml string={item.content} />
          </div>
        ))}
        <div className="paginate mt-2 flex w-full items-center justify-between gap-2">
          <Link
            href={{
              pathname: ROUTES.ORDER_REQUEST,
              query: {
                page: Number(page) - 1 > 0 ? Number(page) - 1 : 1,
              },
            }}
            scroll={false}
            className={cn(isFirstPage ? 'pointer-events-none' : '')}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : 0}
          >
            <Button onClick={scrollToView} disabled={isFirstPage} className="min-w-[80px]">
              <IconLeft className="mr-1 h-3 w-3" />
              Trước
            </Button>
          </Link>
          <Link
            href={{
              pathname: ROUTES.ORDER_REQUEST,
              query: {
                page: Number(page) + 1,
              },
            }}
            scroll={false}
            className={cn(isLastPage ? 'pointer-events-none' : '')}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : 0}
          >
            <Button onClick={scrollToView} disabled={isLastPage} className="min-w-[80px]">
              Tiếp theo
              <IconRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
