import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number;
  height?: number;
  [x: string]: unknown;
}
export const Logo = ({ width = 80, height = 80, ...rest }: LogoProps) => {
  return (
    <div>
      <Link href="/">
        <Image src={'/images/logo.png'} alt="logo" width={width} height={height} {...rest} />
      </Link>
    </div>
  );
};
