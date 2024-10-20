'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { z } from 'zod';

import { FormInput } from '@/components/Form';
import { DataTable } from '@/components/Table/DataTable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from '@/components/ui/timeline';
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { SERVICE_COMPANY } from '@/constants/common';
import { DATE_FORMAT } from '@/constants/date';
import { KEY_QUERY } from '@/constants/keyQuery';
import { IFmTrackingItem } from '@/constants/types/trackingOrder.type';
import {
  getDetailFmTrackingOrderApi,
  searchFmTrackingOrderApi,
} from '@/services/trackingOrder.api';
import { formatDateFn } from '@/utils/date.utils';

const formSchema = z.object({
  code1: z.string(),
  code2: z.string(),
  code3: z.string(),
  code4: z.string(),
  code5: z.string(),
});
type FormValues = z.infer<typeof formSchema>;

export const FMTrackingOrder = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
    },
  });

  type SearchValueType = {
    codes: Array<string>;
  };

  const [searchValue, setSearchValue] = useState<SearchValueType>();

  const { data, isLoading } = useQuery({
    queryKey: [KEY_QUERY.FM_TRACKING_ORDER, searchValue],
    queryFn: () => searchFmTrackingOrderApi(searchValue as SearchValueType),
    enabled: !!searchValue,
  });

  const listTracking = data?.result.list || [];
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const { data: detailTrackingRes, isLoading: isLoadingDetail } = useQuery({
    queryKey: [KEY_QUERY.FM_DETAIL_TRACKING, orderCode],
    queryFn: () => getDetailFmTrackingOrderApi({ code: orderCode }),
    enabled: !!orderCode,
  });

  const detailTrackings = detailTrackingRes?.result.list || [];
  const onOpenModal = (orderCode: string) => {
    setIsOpenModal(true);
    setOrderCode(orderCode);
  };

  const columns: ColumnDef<IFmTrackingItem>[] = [
    {
      accessorKey: 'order_no',
      header: 'Mã đơn hàng',
      size: 80,
    },
    {
      accessorKey: 'order_message',
      header: 'Thông tin đơn hàng',
    },
    {
      accessorKey: '',
      header: 'Thao tác',
      size: 40,
      cell: ({ row }) => {
        const orderCode = row.original.order_no;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={'icon'} onClick={() => onOpenModal(orderCode)}>
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xem chi tiết</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];
  const onSearch = (values: FormValues) => {
    const codes = [values.code1, values.code2, values.code3, values.code4, values.code5];
    setSearchValue({ codes });
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
    setOrderCode('');
  };

  return (
    <div className="mt-6 p-10 shadow-2xl">
      <h3 className="text-center text-2xl font-bold">{SERVICE_COMPANY.FAMILY_MART}</h3>
      <div className="flex flex-col gap-2 md:flex-row">
        <Form {...form}>
          <form
            className="flex-1"
            onSubmit={form.handleSubmit(onSearch, (e) => console.log('error hct form', e))}
          >
            <FormInput control={form.control} name={'code1'} label={`Mã tra cứu 1`} />
            <FormInput control={form.control} name={'code2'} label={`Mã tra cứu 2`} />
            <FormInput control={form.control} name={'code3'} label={`Mã tra cứu 3`} />
            <FormInput control={form.control} name={'code4'} label={`Mã tra cứu 4`} />
            <FormInput control={form.control} name={'code5'} label={`Mã tra cứu 5`} />
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
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      <div className="mt-6">
        <DataTable isLoading={isLoading} data={listTracking} columns={columns} />
      </div>
      <Dialog open={isOpenModal} onOpenChange={onCloseModal}>
        <DialogContent className="md:min-w-[680px] lg:min-w-[981px]">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="rs">
            <div className="flex gap-4">
              {isLoadingDetail ? (
                <>
                  <Skeleton className="h-[400px] flex-1" />
                  <Skeleton className="h-[400px] flex-1" />
                </>
              ) : (
                <>
                  <div className="flex-1 rounded-md bg-muted p-6">
                    <h4 className="">Theo dõi vận chuyển</h4>
                    <div className="mt-2 max-h-[400px] overflow-y-scroll rounded-md border bg-white p-6 shadow-md">
                      <Timeline className="h-full">
                        {detailTrackings.map((item, index) => (
                          <TimelineItem key={index} status={index === 0 ? 'done' : 'default'}>
                            <TimelineHeading className="text-mainColor">
                              {item?.status_d}
                            </TimelineHeading>
                            <TimelineDot
                              status={
                                index === 0 && item.order_status === '09' ? 'done' : 'default'
                              }
                            />
                            <TimelineLine />
                            <TimelineContent>
                              <span className="text-sm">
                                {formatDateFn(item.order_date_r, DATE_FORMAT.DATE_TIME)}
                              </span>
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full rounded-md bg-muted p-4">
                      <div className="flex gap-6">
                        <div className="space-y-2">
                          <p className="font-semibold">Mã đơn hàng:</p>
                          <p className="text-destructive">Thời gian nhận hàng:</p>
                        </div>
                        <div className="space-y-2">
                          <p className="">{orderCode}</p>
                          <p className="text-destructive">
                            {formatDateFn(detailTrackings[0]?.order_date_rtn)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-md bg-muted p-6">
                      <h5 className="font-semibold">Cửa hàng cung cấp</h5>
                      <div className="mt-2 rounded-sm bg-white p-2">
                        <p>{detailTrackings?.[0]?.rcv_store_name}</p>
                        <Separator className="my-2" />
                        <p className="mb-2 text-muted-foreground">
                          Địa chỉ: {detailTrackings?.[0]?.rcv_store_address}
                        </p>
                        <p className="text-muted-foreground">
                          Số điện thoại: {detailTrackings?.[0]?.rcv_store_phone}
                        </p>
                      </div>
                      <h5 className="mt-3 font-semibold">Cửa hàng gửi trả</h5>
                      <div className="mt-2 rounded-sm bg-white p-2">
                        <p>{detailTrackings?.[0]?.send_store_name}</p>
                        <Separator className="my-2" />
                        <p className="mb-2 text-muted-foreground">
                          Địa chỉ: {detailTrackings?.[0]?.send_store_address}
                        </p>
                        <p className="text-muted-foreground">
                          Số điện thoại: {detailTrackings?.[0]?.send_store_phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant={'default'}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
