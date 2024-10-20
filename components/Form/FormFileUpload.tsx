'use client';
import React from 'react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CODE_RESPONSE } from '@/constants/codeResponse';
import { KEY_QUERY } from '@/constants/keyQuery';
import { uploadFileApi } from '@/services/common.services';

import { FileUpload } from '../container/fileUpload/FileUpload';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

// Props to make the component reusable in any form context
interface FormFileUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
}

export const FormFileUpload = <T extends FieldValues>({
  name,
  control,
  description,
  label = 'Upload your image',
  required,
}: FormFileUploadProps<T>) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(null);

  const { mutate, isPending } = useMutation({
    mutationKey: [KEY_QUERY.UPLOAD],
    mutationFn: uploadFileApi,
  });

  // Function to handle file preview generation
  const handleFileChange = (file: File | null, field: ControllerRenderProps<T, Path<T>>) => {
    if (file) {
      mutate(file, {
        onSuccess: (res) => {
          if (res.code === CODE_RESPONSE.POST_SUCCESS || res.code === 0) {
            setPreview(res.result);
            field.onChange(res.result);
            return;
          }
          toast.error(res.message);
        },
      });
    } else {
      setPreview(null);
    }
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FileUpload
            onChange={(file) => {
              handleFileChange(file, field);
            }}
            preview={preview}
            error={error?.message}
            isLoading={isPending}
          />
          <FormDescription>{description}</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
