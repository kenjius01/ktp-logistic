'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface TextImageProps {
  className?: string;
  image_url: string;
  aosImage?: 'ltr' | 'rtl';
  aos?: 'ltr' | 'rtl';
  classImage?: string;
  classText?: string;
  mainTitle: string;
  iconImage?: string;
  rightText?: boolean;
  title: string;
}
export const TextImage = ({
  image_url,
  mainTitle,
  title,
  aos,
  aosImage,
  classImage,
  className,
  classText,
  iconImage,
  rightText,
}: TextImageProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getImageVariant = (direction?: string) => {
    switch (direction) {
      case 'rtl':
        return {
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        };
      case 'ltr':
        return {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        };
      default:
        return {
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        };
    }
  };

  const getTextVariant = (direction?: string) => {
    switch (direction) {
      case 'ltr':
        return {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.25 } },
        };
      case 'rtl':
        return {
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.25 } },
        };
      default:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } },
        };
    }
  };

  return (
    <div className={cn(className, 'relative items-center')} ref={ref}>
      <motion.div
        variants={getImageVariant(aosImage)}
        className={cn('relative', classImage)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Image
          src={image_url}
          alt={''}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover"
        />
      </motion.div>
      {/* Animated Text Section */}
      <motion.div
        className={cn(
          'w-full p-6 md:absolute md:w-[480px] md:bg-slate-100/80 md:text-lg md:shadow-lg lg:w-[630px]',
          'md:wavy-box rounded-lg',
          classText,
          rightText ? 'left-auto right-0' : 'left-0',
        )}
        variants={getTextVariant(aos)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h5 className="text-center text-2xl font-bold uppercase md:text-start">{mainTitle}</h5>
        <div className="mt-2 flex gap-2 md:mt-4">
          {iconImage && (
            <div className="relative hidden aspect-square h-8 md:block">
              <Image src={iconImage} alt="Icon" fill sizes="(max-width: 640px) 100vw, 33vw" />
            </div>
          )}
          <p className="text-justify font-medium text-primary/80">{title}</p>
        </div>
      </motion.div>
    </div>
  );
};
