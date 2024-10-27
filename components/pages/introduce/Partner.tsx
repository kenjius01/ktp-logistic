import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

import { Container } from '@/components/Container';
import { ImageWithFallback } from '@/components/container/image/ImageWithFallback';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { DEFAULT_FILTER } from '@/constants/common';
import { KEY_QUERY } from '@/constants/keyQuery';
import { searchPartnersApi } from '@/services/common.services';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } },
};
export const Partner = () => {
  const { data } = useQuery({
    queryKey: [KEY_QUERY.SEARCH_PARTNER],
    queryFn: () => searchPartnersApi(DEFAULT_FILTER),
  });
  const listPartner = data?.result?.items || [];

  return (
    <Container>
      <motion.h4
        className="pb-10 text-center text-2xl font-bold uppercase"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
      >
        đối tác
      </motion.h4>
      <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible">
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]}>
          <CarouselContent>
            {listPartner.map((item) => (
              <CarouselItem className="sm:basis-1/2 md:basis-1/4 xl:basis-1/5" key={item?.id}>
                <Card className="w-ful mx-auto max-w-xs cursor-pointer overflow-hidden rounded">
                  <div className="group relative m-auto flex aspect-video rounded-lg">
                    <ImageWithFallback
                      src={item?.avatar_url || ''}
                      alt="partner"
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      </motion.div>
    </Container>
  );
};
