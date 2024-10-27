import React, { useEffect } from 'react';
import { ControllerRenderProps, Path, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import { AvatarUpload } from '@/components/container/avatarUpload/AvatarUpload';
import { FormDatePicker, FormInput, FormSelect, FormTextArea } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { CODE_RESPONSE } from '@/constants/codeResponse';
import { GENDER_OPTIONS } from '@/constants/common';
import { KEY_QUERY } from '@/constants/keyQuery';
import { uploadFileApi } from '@/services/common.services';
import { updateProfileApi } from '@/services/user.api';
import useAuthStore from '@/stores/useAuthStore';

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z.string(),
  avatar_url: z.string(),
  first_name: z.string().min(1, {
    message: 'Vui lòng nhập tên',
  }),
  last_name: z.string().min(1, {
    message: 'Vui lòng nhập họ',
  }),
  phone_number: z.string(),
  gender: z.string(),
  email: z.string().email({ message: 'Email không hợp lệ' }).optional().or(z.literal('')),
  address: z.string(),
  date_of_birth: z.date().nullable().or(z.string()),
});
export const UpdateProfile = () => {
  const { user } = useAuthStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      avatar_url: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      gender: '',
      email: '',
      address: '',
      date_of_birth: '',
    },
  });
  const { mutate: mutateFile, isPending: isLoadingImg } = useMutation({
    mutationKey: [KEY_QUERY.UPLOAD],
    mutationFn: uploadFileApi,
  });

  const { mutate: updateProfileMutate, isPending } = useMutation({
    mutationKey: [KEY_QUERY.UPDATE_PROFILE],
    mutationFn: updateProfileApi,
  });

  useEffect(() => {
    if (user) {
      form.reset({
        address: user.address,
        avatar_url: user.avatar_url,
        date_of_birth: user.date_of_birth,
        email: user.email,
        first_name: user.first_name,
        gender: user.gender,
        last_name: user.last_name,
        phone_number: user.phone_number,
        username: user.username,
      });
    }
  }, [form, user]);
  const onChangeAvatar = (
    field: ControllerRenderProps<FormValues, Path<FormValues>>,
    file?: File,
  ) => {
    if (!file) {
      return;
    }
    mutateFile(file, {
      onSuccess: (res) => {
        if (res.code === CODE_RESPONSE.POST_SUCCESS || res.code === 0) {
          field.onChange(res.result);
          return;
        }
        toast.error(res.message);
      },
    });
  };
  const onUpdateProfile = (data: FormValues) => {
    updateProfileMutate(data, {
      onSuccess: (res) => {
        if (res.code === CODE_RESPONSE.POST_SUCCESS || res.code === 0) {
          toast.success(res.message);
          return;
        }
        toast.error(res.message || 'Cập nhật không thành công');
      },
    });
  };
  return (
    <div className="pl-6">
      <h3 className="text-xl font-bold uppercase">thông tin tài khoản</h3>
      <Separator className="mt-2" />
      <div className="py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdateProfile)}>
            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AvatarUpload
                        value={field.value}
                        onChange={(file) => onChangeAvatar(field, file)}
                        isLoading={isLoadingImg}
                        className="h-28 w-28"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex flex-col gap-2 md:flex-row">
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
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="phone_number"
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại..."
                  required
                />
              </div>
              <div className="w-full">
                <FormInput
                  disabled
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Nhập email..."
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="w-full">
                <FormSelect
                  control={form.control}
                  name="gender"
                  label="Giới tính"
                  placeholder="Chọn giới tính"
                  options={GENDER_OPTIONS}
                />
              </div>
              <div className="w-full">
                <FormDatePicker
                  name="date_of_birth"
                  label="Ngày sinh"
                  placeholder="Chọn ngày sinh"
                  disabledDate={(date) => date > new Date()}
                />
              </div>
            </div>
            <div className="w-full">
              <FormTextArea name="address" label="Địa chỉ" placeholder="Nhập địa chỉ" />
            </div>
            <Button className="mt-2" disabled={isPending} type="submit">
              Cập nhật
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
