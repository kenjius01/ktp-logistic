import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  [x: string]: unknown;
}
export const Logo = ({ className, ...rest }: LogoProps) => {
  return (
    <Link href={ROUTES.HOME} className={cn('relative h-20 w-20', className)}>
      <Image
        src={'/images/logo.png'}
        alt="logo"
        fill
        sizes="(max-width: 467px) 100vw, 50vw"
        {...rest}
      />
    </Link>
  );
};
