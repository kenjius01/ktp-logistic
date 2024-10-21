import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormInput } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { CODE_RESPONSE } from '@/constants/codeResponse';
import { KEY_QUERY } from '@/constants/keyQuery';
import { changePasswordApi } from '@/services/user.api';

const formSchema = z
  .object({
    current_password: z.string().min(1, {
      message: 'Vui lòng nhập mật khẩu hiện tại',
    }),
    new_password: z.string().min(1, {
      message: 'Vui lòng nhập mật khẩu mới',
    }),
    re_password: z.string().min(1, {
      message: 'Vui lòng xác nhận lại mật khẩu',
    }),
  })
  .refine(({ re_password, new_password }) => new_password === re_password, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['re_password'],
  });

type FormValues = z.infer<typeof formSchema>;

export const ChangePassword = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      re_password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [KEY_QUERY.CHANGE_PASSWORD],
    mutationFn: changePasswordApi,
  });
  const onChangePass = (values: FormValues) => {
    console.log(values);
    mutate(values, {
      onSuccess: (res) => {
        if (res.code === CODE_RESPONSE.POST_SUCCESS) {
          console.log(res);
          form.reset();
          toast.success('Đổi mật khẩu thành công');
          return;
        }
        toast.error(res.message);
      },
    });
  };
  return (
    <div className="pl-6">
      <h3 className="text-xl font-bold uppercase">Đổi mật khẩu</h3>
      <Separator className="mt-2" />
      <div className="py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onChangePass)}>
            <FormInput
              control={form.control}
              name="current_password"
              label="Mật khẩu hiện tại"
              required
              type="password"
            />
            <FormInput
              control={form.control}
              name="new_password"
              label="Mật khẩu mới"
              required
              type="password"
            />
            <FormInput
              control={form.control}
              name="re_password"
              label="Xác nhận mật khẩu"
              required
              type="password"
            />
            <Button className="mt-2" disabled={isPending} type="submit">
              Cập nhật
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
