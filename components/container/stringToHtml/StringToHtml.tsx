import React from 'react';

import { cn } from '@/lib/utils';

interface StringToHtmlProps {
  string: string;
  className?: string;
}
export const StringToHtml = ({ string, className }: StringToHtmlProps) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: string }} className={cn('stringToHtml', className)} />
  );
};
