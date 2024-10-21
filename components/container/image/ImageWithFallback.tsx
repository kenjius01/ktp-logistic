'use client';
import { SyntheticEvent, useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
  fallback?: string;
  alt: string;
  src: string;
  [x: string]: unknown;
}
const fallbackImage = '/images/placeholder.png';
export const ImageWithFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<SyntheticEvent<HTMLImageElement, Event> | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={(error) => {
        console.log(error, 'anh');
        setError(error);
      }}
      src={error ? fallback : src}
      {...props}
    />
  );
};
