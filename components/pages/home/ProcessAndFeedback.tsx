import React from 'react';
import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { listFeedback, processList } from '@/constants/common';

export const ProcessAndFeedback = () => {
  return (
    <div className="rounded-sm bg-sky-200">
      <div className="pt-6">
        <h2 className="text-center text-2xl font-bold">QUY TRÌNH GỬI HÀNG ĐI NƯỚC NGOÀI</h2>
      </div>
      <div className="p-4 text-base">
        <Accordion type="single" collapsible className="w-full border border-gray-900">
          {processList.map((item) => (
            <AccordionItem key={item.id} value={item.title} className="border border-gray-900 p-1">
              <AccordionTrigger className="font-bold">{item.title}</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-end gap-2">
                  <div className="relative h-20 w-full max-w-20">
                    <Image
                      src={item.image}
                      alt="icon"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <p className="">{item.desc}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {/*  */}
      <div className="pt-6">
        <h2 className="text-center text-2xl font-bold">PHẢN HỒI TỪ KHÁCH HÀNG</h2>
      </div>
      <div className="p-6">
        <Carousel className="w-auto" opts={{ loop: true }}>
          <CarouselContent>
            {listFeedback.map((item) => (
              <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="relative mb-2 aspect-[2/3]">
                  <Image
                    className="overflow-hidden rounded-[30px] border-[5px] border-black"
                    alt="feedback"
                    src={item.image}
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
      </div>
    </div>
  );
};
