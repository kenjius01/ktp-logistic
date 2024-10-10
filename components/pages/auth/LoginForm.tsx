'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { FormInput } from '@/components/Form/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { CODE_RESPONSE } from '@/constants/codeResponse';
import { KEY_QUERY } from '@/constants/keyQuery';
import { ROUTES } from '@/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { loginApi } from '@/services/user.api';
import useAuthStore from '@/stores/useAuthStore';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Vui lòng nhập tài khoản',
  }),
  password: z.string().min(1, {
    message: 'Vui lòng nhập mật khẩu',
  }),
});
export const LoginForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setTokens } = useAuthStore();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate } = useMutation({
    mutationKey: [KEY_QUERY.LOGIN],
    mutationFn: loginApi,
    onError: (error) => {
      console.log(error);
      toast({
        description: error.message || 'Có lỗi xảy ra',
        variant: 'destructive',
      });
    },
  });

  const onLogin = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (res) => {
        if (res.code === CODE_RESPONSE.POST_SUCCESS) {
          const { long_token, token } = res.result;
          toast({ description: 'Đăng nhập thành công', variant: 'success' });
          setTokens(token, long_token);
          queryClient.invalidateQueries({ queryKey: [KEY_QUERY.GET_ME] });
          router.push(ROUTES.HOME);
          return;
        }

        toast({ description: res.message, variant: 'destructive' });
      },
    });
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
              <FormInput
                control={form.control}
                name="username"
                label="Tài khoản"
                required
                placeholder="Nhập tài khoản"
              />
              <FormInput
                control={form.control}
                name="password"
                label="Mật khẩu"
                required
                type="password"
              />
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
          href={ROUTES.REGISTER}
          className="font-medium underline underline-offset-4"
          prefetch={false}
        >
          Đăng ký
        </Link>
      </div>
    </div>
  );
};
