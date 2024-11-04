'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';

import { FormInput } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from '@/components/ui/timeline';
import { DATE_FORMAT } from '@/constants/date';
import { KEY_QUERY } from '@/constants/keyQuery';
import { hctTrackingOrderApi } from '@/services/trackingOrder.api';
import { formatDateFn } from '@/utils/date.utils';
import { generateUniqueID } from '@/utils/function.utils';

const formSchema = z.object({
  code: z.string().min(1, {
    message: 'Vui lòng nhập mã tra cứu',
  }),
});

type SearchValueType = {
  code: string;
  refetchId?: string;
};
export const HctTrackingOrder = () => {
  const searchParams = useSearchParams();
  const code = searchParams?.get('code') || '';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code,
    },
  });
  const [searchValue, setSearchValue] = useState<SearchValueType | undefined>(
    code ? { code } : undefined,
  );
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [KEY_QUERY.HCT_TRACKING_ORDER, searchValue],
    queryFn: () => hctTrackingOrderApi(searchValue as SearchValueType),
    enabled: !!searchValue,
  });
  const onSearch = (values: z.infer<typeof formSchema>) => {
    setSearchValue({ code: values.code, refetchId: generateUniqueID() });
  };
  const trackingRes = data?.result?.data.direct_trackings || [];
  const listCheck = trackingRes?.[0]?.tracking?.checkpoints || [];
  return (
    <div className="mt-6 p-6 shadow-2xl">
      <h3 className="text-center text-2xl font-bold">HCT Logistics</h3>
      <div className="flex flex-col gap-2 md:flex-row">
        <Form {...form}>
          <form
            className="flex-1"
            onSubmit={form.handleSubmit(onSearch, (e) => console.log('error hct form', e))}
          >
            <FormInput
              className="h-12 w-full"
              control={form.control}
              name="code"
              label="Mã đơn hàng"
              required
            />
            <Button disabled={isLoading} type="submit" className="mt-2 font-bold">
              {isLoading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SearchIcon className="mr-2 h-4 w-4" />
              )}
              Tra cứu
            </Button>
          </form>
        </Form>
        <div className="relative aspect-auto w-full flex-1">
          <Image
            src={'/svg/tracking-img.svg'}
            fill
            alt="trackingImg"
            className="object-contain"
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </div>
      {listCheck && listCheck.length > 0 ? (
        <div className="rs mt-8 rounded-md border p-6 shadow-md">
          <Timeline>
            {listCheck.map((item, index) => (
              <TimelineItem key={index} status={index === 0 ? 'done' : 'default'}>
                <TimelineHeading className="text-mainColor">{item.status}</TimelineHeading>
                <TimelineDot />
                <TimelineLine />
                <TimelineContent>
                  <span className="text-sm text-primary">
                    {formatDateFn(item.date_time, DATE_FORMAT.DATE_TIME)}: {item.message}
                  </span>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ) : (
        isFetched && (
          <p className="text-center font-bold text-destructive">Không có kết quả hiển thị nào!</p>
        )
      )}
    </div>
  );
};
