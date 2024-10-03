'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Vui lòng nhập tài khoản',
  }),
  password: z.string().min(1, {
    message: 'Vui lòng nhập mật khẩu',
  }),
});
export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onLogin = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="mx-auto max-w-[400px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Đăng nhập</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Nhập tài khoản và mật khẩu của bạn để đăng nhập
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLogin)}>
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tài khoản</FormLabel>
                      <FormControl>
                        <Input disabled={false} placeholder="Nhập tài khoản" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input type="password" disabled={false} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="text-center text-sm">
        Bạn chưa có tài khoản?{' '}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4"
          prefetch={false}
        >
          Đăng ký
        </Link>
      </div>
    </div>
  );
};
