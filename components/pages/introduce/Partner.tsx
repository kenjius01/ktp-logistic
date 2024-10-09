import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Container } from '@/components/Container';
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
        <Carousel className="mx-auto" opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]}>
          <CarouselContent className="justify-center">
            {listPartner.map((item) => (
              <CarouselItem className="sm:basis-1/2 md:basis-1/4 xl:basis-1/5" key={item?.id}>
                <div className="relative mb-2 aspect-video h-24">
                  <Image
                    className="object-cover"
                    src={item?.avatar_url || ''}
                    alt="partner"
                    fill
                    sizes="(max-width: 240px) 10vw, 33vw"
                  />
                </div>
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
