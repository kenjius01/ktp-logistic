'use client';
import React from 'react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import FileUploadDropzone from '../container/fileUpload/FileUploadDropzone';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

// Props to make the component reusable in any form context
interface FormFileUploadDropzoneProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
}

export const FormFileUploadDropzone = <T extends FieldValues>({
  name,
  control,
  description,
  label = 'Tải ảnh lên',
  required,
}: FormFileUploadDropzoneProps<T>) => {
  // Function to handle file preview generation
  const handleFileChange = (files: string[], field: ControllerRenderProps<T, Path<T>>) => {
    field.onChange(files || []);
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FileUploadDropzone
            onChange={(files) => {
              handleFileChange(files, field);
            }}
          />
          <FormDescription>{description}</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
