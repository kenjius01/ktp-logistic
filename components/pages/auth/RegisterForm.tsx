'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import { FormInput } from '@/components/Form/FormInput';
import { FormSelect } from '@/components/Form/FormSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { GENDER_OPTIONS } from '@/constants/common';
import { ROUTES } from '@/constants/routes';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Vui lòng nhập tài khoản',
  }),
  password: z
    .string()
    .min(1, {
      message: 'Vui lòng nhập mật khẩu',
    })
    .min(8, {
      message: 'Mật khẩu phải tối thiểu 8 ký tự',
    }),
  first_name: z.string().min(1, {
    message: 'Vui lòng nhập tên',
  }),
  last_name: z.string().min(1, {
    message: 'Vui lòng nhập họ',
  }),
  phone_number: z.string(),
  gender: z.string(),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  address: z.string(),
  date_of_birth: z.date().nullable(),
});
export const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      gender: '',
      email: '',
      address: '',
      date_of_birth: null,
    },
  });
  const onRegister = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="mx-auto max-w-[500px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Đăng ký</h1>
        <p className="text-gray-500 dark:text-gray-400">Nhập thông tin để tạo tài khoản của bạn</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onRegister)}>
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full space-y-2">
                  <FormInput
                    control={form.control}
                    label="Họ"
                    placeholder="Nhập họ..."
                    name="last_name"
                    required
                  />
                </div>
                <div className="w-full space-y-2">
                  <FormInput
                    control={form.control}
                    label="Tên"
                    placeholder="Nhập tên..."
                    name="first_name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <FormInput
                  control={form.control}
                  label="Tài khoản"
                  placeholder="Nhập tài khoản..."
                  name="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  control={form.control}
                  name="password"
                  label="Mật khẩu"
                  required
                  type="password"
                />
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full space-y-2">
                  <FormInput
                    control={form.control}
                    name="phone_number"
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Nhập email..."
                    type="email"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="space-y-2">
                  <FormSelect
                    name="gender"
                    control={form.control}
                    label="Giới tính"
                    placeholder="Chọn giới tính"
                    options={GENDER_OPTIONS}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Đăng ký
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="text-center text-sm">
        Bạn đã có tài khoản?{' '}
        <Link
          href={ROUTES.LOGIN}
          className="font-medium underline underline-offset-4"
          prefetch={false}
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};
