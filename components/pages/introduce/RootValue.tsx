'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Container } from '@/components/Container';
import { IntroduceItemType } from '@/constants/types';

interface RootValueProps {
  data: IntroduceItemType[];
}

export const RootValue = ({ data }: RootValueProps) => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } },
  };
  return (
    <div className="bg-muted p-16 text-center">
      <Container>
        <motion.h4
          className="text-center text-2xl font-bold uppercase"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
        >
          {data[0]?.title}
        </motion.h4>
        <motion.p className="p-6" variants={fadeUpVariants} initial="hidden" whileInView="visible">
          {data[0]?.content}
        </motion.p>
        <motion.div
          className="relative mx-auto mt-4 aspect-square w-full md:w-[500px]"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
        >
          <Image
            src={'/images/coreValue.png'}
            alt="rootValue"
            fill
            className={'object-contain'}
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </motion.div>
      </Container>
    </div>
  );
};
