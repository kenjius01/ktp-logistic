'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import { POST_SIGNUP_CONTACT_KEY } from '@/constants/keyQuery';
import { postContactCompanyApi } from '@/services/common.services';

import { FormInput, FormTextArea } from '../Form';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

const formSchema = z.object({
  full_name: z
    .string()
    .min(1, {
      message: 'Vui lòng nhập họ tên',
    })
    .max(50),
  email: z.string(),
  phone_number: z.string().min(1, { message: 'Vui lòng nhập số điện thoại' }),
  address: z.string().min(1, { message: 'Vui lòng nhập địa chỉ' }),
  content: z.string().min(1, { message: 'Vui lòng nhập nội dung' }),
});

export const FormContact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      address: '',
      content: '',
      email: '',
      phone_number: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: postContactCompanyApi,
    mutationKey: [POST_SIGNUP_CONTACT_KEY],
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => {
        toast.success('Đăng ký liên hệ thành công');
      },
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2 md:grid-cols-2">
            <FormInput
              control={form.control}
              placeholder="Họ và tên"
              name="full_name"
              className="h-12"
              required
            />
            <FormInput
              control={form.control}
              placeholder="Số điện thoại"
              name="phone_number"
              className="h-12"
              required
            />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <FormInput
              control={form.control}
              placeholder="Email"
              name="email"
              type="email"
              className="h-12"
            />
            <FormInput
              control={form.control}
              placeholder="Địa chỉ"
              name="address"
              className="h-12"
            />
          </div>
          <div>
            <FormTextArea
              control={form.control}
              name="content"
              className="min-h-24"
              placeholder="Nội dung"
            />
          </div>
          <div className="text-center">
            <Button size={'lg'} type="submit">
              Gửi nội dung
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
