'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { POST_SIGNUP_CONTACT_KEY } from '@/constants/keyQuery';
import { useToast } from '@/hooks/use-toast';
import { postContactCompanyApi } from '@/services/common.services';

import { FormInput } from '../Form/FormInput';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  full_name: z
    .string()
    .min(1, {
      message: 'Vui lòng nhập họ tên',
    })
    .max(50),
  email: z.string(),
  phone_number: z.string().min(1, { message: 'Vui lòng nhập số điện thoại' }),
  address: z.string(),
  content: z.string(),
});

export const FormContact = () => {
  const { toast } = useToast();
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
        toast({
          description: 'Đăng ký liên hệ thành công',
          variant: 'success',
        });
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
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="min-h-24" placeholder="Nội dung" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
