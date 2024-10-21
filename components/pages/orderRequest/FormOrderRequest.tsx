'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormInput, FormTextArea } from '@/components/Form';
import { FormFileUpload } from '@/components/Form/FormFileUpload';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { KEY_QUERY } from '@/constants/keyQuery';
import { orderRequestAuthApi, orderRequestPublicApi } from '@/services/orderRequest.api';
import useAuthStore from '@/stores/useAuthStore';

const formSchema = z.object({
  full_name: z.string().min(1, {
    message: 'Vui lòng nhập họ tên',
  }),
  phone_number: z.string().min(1, {
    message: 'Vui lòng nhập số điện thoại',
  }),
  address: z.string().min(1, {
    message: 'Vui lòng nhập địa chỉ lấy hàng',
  }),
  time: z.string().min(1, {
    message: 'Vui lòng nhập thời gian lấy hàng',
  }),
  total_packages: z.string(),
  image_url: z.string(),
  content: z.string(),
});
export const FormOrderRequest = () => {
  const { user } = useAuthStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      phone_number: '',
      address: '',
      time: '',
      image_url: '',
      content: '',
    },
  });
  const { mutate } = useMutation({
    mutationKey: [KEY_QUERY.ORDER_REQUEST],
    mutationFn: user ? orderRequestAuthApi : orderRequestPublicApi,
  });

  const onSendOrderRequest = (data: z.infer<typeof formSchema>) => {
    const dataSend = {
      ...data,
      image_url: [data.image_url],
    };
    mutate(dataSend, {
      onSuccess: () => {
        toast.success('Đặt hàng thành công');
      },
    });
  };
  return (
    <div className="">
      <div className="">
        <h1 className="mb-10 text-2xl font-bold">Đặt hàng</h1>
      </div>
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSendOrderRequest)}>
          <div className="max-w-2xl space-y-4">
            <div className="space-y-2">
              <FormInput
                control={form.control}
                name="full_name"
                required
                className="h-12"
                label={<span className="text-lg font-bold uppercase">HỌ TÊN QUÝ KHÁCH </span>}
              />
            </div>
            <div className="space-y-2">
              <FormInput
                control={form.control}
                name="phone_number"
                required
                className="h-12"
                label={<span className="text-lg font-bold uppercase">SỐ ĐIỆN THOẠI </span>}
              />
            </div>

            <div className="space-y-2">
              <FormInput
                control={form.control}
                name="address"
                required
                className="h-12"
                label={<span className="text-lg font-bold uppercase">ĐỊA CHỈ TỚI LẤY HÀNG</span>}
              />
            </div>

            <div className="space-y-2">
              <FormInput
                control={form.control}
                name="time"
                description="Quý khách ghi rõ khoảng thời gian tới lấy hàng"
                required
                className="h-12"
                label={<span className="text-lg font-bold uppercase">THỜI GIAN TỚI LẤY</span>}
              />
            </div>

            <div className="space-y-2">
              <FormInput
                control={form.control}
                name="total_packages"
                description="Quý khách nhập số kiện hàng, ví dụ có 2 kiện hàng thì ghi 2"
                className="h-12"
                type="number"
                label={<span className="text-lg font-bold uppercase">SỐ LƯỢNG KIỆN HÀNG</span>}
              />
            </div>

            <div className="space-y-2">
              <FormFileUpload
                control={form.control}
                name="image_url"
                label={<span className="text-lg font-bold uppercase">Ảnh kiện hàng</span>}
              />
            </div>

            <div className="space-y-2">
              <FormTextArea
                control={form.control}
                name="content"
                className="min-h-24"
                label={
                  <span className="text-lg font-bold uppercase">KÊ KHAI THÔNG TIN HÀNG HÓA</span>
                }
              />
            </div>
            <div className="flex justify-center space-y-2">
              <Button type="submit" size={'lg'}>
                Gửi yêu cầu
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
