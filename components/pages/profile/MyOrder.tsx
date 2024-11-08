import React, { useState } from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, PackageXIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { ImageWithFallback } from '@/components/container/image/ImageWithFallback';
import { PaginationWithLinks } from '@/components/pagination/PaginationWithLinks';
import { DataTable } from '@/components/Table/DataTable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CODE_RESPONSE } from '@/constants/codeResponse';
import { DEFAULT } from '@/constants/common';
import { KEY_QUERY } from '@/constants/keyQuery';
import { TOrderInfo } from '@/constants/types/orderRequest.type';
import { cancelOrderRequestApi, searchOrderUserApi } from '@/services/orderRequest.api';

export const MyOrder = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || DEFAULT.PAGE;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
  const [isOpenModalImg, setIsOpenModalImg] = useState(false);
  const [urlImg, setUrlImg] = useState('');
  const [rowData, setRowData] = useState<TOrderInfo>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: [KEY_QUERY.MY_ORDER, page],
    queryFn: () =>
      searchOrderUserApi({
        filters: [],
        keyword: '',
        pageable: {
          page,
          page_size: DEFAULT.PAGE_SIZE,
        },
      }),
  });
  const { mutate: cancelMutate } = useMutation({
    mutationKey: [KEY_QUERY.CANCEL_ORDER],
    mutationFn: cancelOrderRequestApi,
  });
  const listOrder = data?.result?.items || [];
  const onOpenModal = (data: TOrderInfo) => {
    setRowData(data);
    setIsOpenModal(true);
  };
  const onCloseModal = () => {
    setIsOpenModal(false);
    setIsOpenModalCancel(false);
    setRowData(undefined);
  };

  const onOpenModalCancel = (data: TOrderInfo) => {
    setRowData(data);
    setIsOpenModalCancel(true);
  };

  const onOpenModalImg = (url: string) => {
    setUrlImg(url);
    setIsOpenModalImg(true);
  };
  const onCloseModalImg = () => {
    console.log('first');
    setIsOpenModalImg(false);
    setUrlImg('');
  };

  const onCancelOrder = (id: number | string) => {
    cancelMutate(
      { id },
      {
        onSuccess: (res) => {
          if (res.code === CODE_RESPONSE.POST_SUCCESS) {
            toast.success('Hủy đơn hàng thành công');
            refetch();
            onCloseModal();
            return;
          }
          toast.error(res.message || 'Có lỗi xảy ra');
        },
      },
    );
  };

  const column: ColumnDef<TOrderInfo>[] = [
    {
      accessorKey: 'full_name',
      header: 'Họ và tên',
    },
    {
      accessorKey: 'phone_number',
      header: 'Số điện thoại',
    },
    {
      accessorKey: 'address',
      header: 'Đị̣a chỉ lấy hàng',
    },
    {
      accessorKey: 'time',
      header: 'Thời gian lấy hàng',
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
    },
    {
      accessorKey: '',
      header: 'Thao tác',
      meta: {
        className: 'text-center',
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <EyeIcon
                    className="h-4 w-4 cursor-pointer rounded-full hover:bg-muted"
                    onClick={() => onOpenModal(row.original)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Xem chi tiết</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PackageXIcon
                    className="h-4 w-4 cursor-pointer rounded-full text-destructive"
                    onClick={() => onOpenModalCancel(row.original)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hủy đơn hàng</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  return (
    <div className="pl-6">
      <h3 className="text-xl font-bold uppercase">Danh sách đơn hàng</h3>
      <Separator className="mt-2" />
      <div className="py-6">
        <DataTable data={listOrder} columns={column} isLoading={isLoading} />
        <br />
        <PaginationWithLinks
          page={page}
          pageSize={DEFAULT.PAGE_SIZE}
          totalCount={data?.result?.total || 0}
        />
        <Dialog open={isOpenModal} onOpenChange={onCloseModal}>
          <DialogOverlay onClick={(e) => e.stopPropagation()} />
          <DialogContent
            aria-describedby="description"
            onInteractOutside={(event) => event.preventDefault()}
            className="max-h-[80%] lg:max-w-[800px]"
          >
            <DialogHeader className="">
              <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            </DialogHeader>

            <ScrollArea className="h-96">
              <div className="rs max-h-full space-y-4">
                <div className="w-full space-y-2">
                  <p className="text-sm font-bold">Họ và tên</p>
                  <Input disabled value={rowData?.full_name} />
                </div>
                <div className="w-full space-y-2">
                  <p className="text-sm font-bold">Số điện thoại</p>
                  <Input disabled value={rowData?.phone_number} />
                </div>
                <div className="w-full space-y-2">
                  <p className="text-sm font-bold">Địa chỉ tới lấy hàng</p>
                  <Input disabled value={rowData?.address} />
                </div>
                <div className="w-full space-y-2">
                  <p className="text-sm font-bold">Thời gian tới lấy</p>
                  <Input disabled value={rowData?.time} />
                </div>
                <div className="w-full space-y-2">
                  <p className="text-sm font-bold">Số lượng kiện hàng</p>
                  <Input disabled value={rowData?.total_packages} />
                </div>
                <div className="w-full space-y-2">
                  <p className="text-sm font-bold">Ảnh kiện hàng</p>
                  <div className="grid grid-cols-4 gap-2">
                    {rowData?.image_url?.map((url, id) => (
                      <div key={id} className="relative aspect-[3/2] w-full grid-cols-1">
                        <ImageWithFallback
                          src={url || ''}
                          alt={'img order'}
                          className="cursor-pointer object-cover"
                          fill
                          onClick={() => onOpenModalImg(url)}
                          sizes="(max-width: 640px) 100vw, 33vw"
                          data-fancybox="gallery"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {rowData?.reason_cancel?.reason && (
                  <div className="w-full space-y-2">
                    <p className="text-sm font-bold">Lý do hủy hàng</p>
                    <Textarea disabled value={rowData?.reason_cancel.reason} />
                  </div>
                )}
                <div className="w-full space-y-2">
                  <p className="text-sm font-bold">Kê khai thông tin hàng hóa</p>
                  <Textarea disabled value={rowData?.total_packages} />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button onClick={onCloseModal} variant={'ghost'}>
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isOpenModalCancel} onOpenChange={onCloseModal}>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Hủy đơn hàng</DialogTitle>
            </DialogHeader>
            <div className="rs">
              <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
            </div>
            <DialogFooter>
              <Button onClick={() => onCancelOrder(rowData?.id as string)}>Xác nhận</Button>
              <Button onClick={onCloseModal} variant={'ghost'}>
                Hủy
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal để preview ảnh */}
        <Dialog open={isOpenModalImg} onOpenChange={onCloseModalImg}>
          <DialogContent className="fixed z-50 h-screen max-h-screen max-w-full border-none bg-transparent/80 p-0 text-white outline-none">
            <VisuallyHidden>
              <DialogTitle></DialogTitle>
            </VisuallyHidden>

            <div className="flex items-center justify-center">
              {urlImg && (
                <ImageWithFallback
                  src={urlImg}
                  alt="Preview"
                  width={0}
                  height={0}
                  className="h-auto max-h-lvh w-auto object-contain"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
