import React, { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { formatDateFn } from '@/utils/date.utils';
import Link from 'next/link';

type Item = {
  name: string;
  link?: string;
  color?:boolean
};

interface AppBreadcrumbProps {
  date: string;
  listItems: Array<Item>;
  className?: string;
}

export const AppBreadcrumb = ({ date, listItems = [], className }: AppBreadcrumbProps) => {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb className={cn('', className)}>
        <BreadcrumbList>
          {listItems.map((item, index) => (
            <Fragment key={index}>
              <BreadcrumbItem className={cn('font-bold text-primary',item.color && 'text-mainColor')}>
                <BreadcrumbLink asChild className='hover:text-mainColor' >
               <Link className={cn(item.link ? 'hover:text-mainColor': 'hover:text-primary cursor-default')} href={{pathname:item?.link}}>
                {item?.name}
               </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== listItems.length - 1 && (
                <BreadcrumbSeparator className='text-primary mt-0.5'>
                </BreadcrumbSeparator>
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {date && (
        <div className={`flex items-center text-muted-foreground`}>
          <span>{formatDateFn(date)}</span>
        </div>
      )}
    </div>
  );
};
