'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IntroduceItemType } from '@/constants/types';

interface CompetitiveProps {
  data: IntroduceItemType[];
}

const iconImage = ['/icon/project.svg', '/icon/missile.svg', '/icon/team.svg'];

export const Competitive = ({ data }: CompetitiveProps) => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } },
  };
  return (
    <div>
      <motion.h4
        className="pb-8 text-center text-2xl font-bold uppercase"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
      >
        Thế mạnh cạnh tranh
      </motion.h4>
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        className="grid gap-6 md:grid-cols-3"
      >
        {(data || []).map((item, index) => (
          <Card
            key={index}
            className="w-full cursor-pointer transition hover:scale-105 hover:border-primary hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-center justify-center">
                <Image
                  src={item?.image_url || iconImage[index % (iconImage.length || 0)]}
                  alt="icon"
                  width={64}
                  height={64}
                  className="rounded-full bg-[#e7f1ff] p-3"
                />
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="text-center text-lg font-bold uppercase">{item?.title}</h4>
              <Separator className="mx-auto my-8 w-36 bg-[#888888]" />
              <p className="text-justify">{item?.content}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};
