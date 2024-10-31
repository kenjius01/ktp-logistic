'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircleIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
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
import { SERVICE_COMPANY } from '@/constants/common';
import { DATE_FORMAT } from '@/constants/date';
import { KEY_QUERY } from '@/constants/keyQuery';
import { searchElevenTrackingOrderApi } from '@/services/trackingOrder.api';
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
export const ElevenTracking = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });
  const [searchValue, setSearchValue] = useState<SearchValueType>();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [KEY_QUERY.ELEVEN_TRACKING_ORDER, searchValue],
    queryFn: () => searchElevenTrackingOrderApi(searchValue as SearchValueType),
    enabled: !!searchValue,
  });
  const onSearch = (values: z.infer<typeof formSchema>) => {
    setSearchValue({ code: values.code, refetchId: generateUniqueID() });
  };
  const listCheck = data?.result?.items || [];
  return (
    <div className="mt-6 p-6 shadow-2xl">
      <h3 className="text-center text-2xl font-bold">{SERVICE_COMPANY.ELEVEN}</h3>
      <div className="flex flex-col gap-2 md:flex-row">
        <Form {...form}>
          <form
            className="flex-1"
            onSubmit={form.handleSubmit(onSearch, (e) => console.log('error elv form', e))}
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
      {isLoading && (
        <div className="rs mt-8 rounded-md border p-6 shadow-md">
          <div className="">
            <p className="text-center">
              Vì chúng tôi phải tra cứu dữ liệu đơn hàng của bạn từ nước ngoài nên quá trình tra cứu
              sẽ mất khoảng 20s, vui lòng chờ đợi nhé...
            </p>
            <LoaderCircleIcon className="mx-auto h-10 w-10 animate-spin text-mainColor" />
          </div>
        </div>
      )}
      {listCheck && listCheck.length > 0 ? (
        <div className="rs mt-8 rounded-md border p-6 shadow-md">
          <Timeline>
            {listCheck.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineHeading className="text-mainColor">{item.info}</TimelineHeading>
                <TimelineDot />
                <TimelineLine />
                <TimelineContent>
                  <span className="text-sm text-primary">
                    {formatDateFn(item.checkpoint_date, DATE_FORMAT.DATE_TIME)}{' '}
                    {item.location ? `: ${item.location}` : ''}
                  </span>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ) : (
        isFetched && (
          <div className="rs mt-8 rounded-md border p-6 shadow-md">
            <p className="text-center font-bold text-destructive">
              {data?.message || 'Không có kết quả hiển thị nào!'}
            </p>
          </div>
        )
      )}
    </div>
  );
};
