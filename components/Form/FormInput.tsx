import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface FormInputProps<T extends FieldValues> {
  control?: Control<T>;
  description?: React.ReactNode;
  name: Path<T>;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  [x: string]: unknown;
}
export const FormInput = <T extends FieldValues>({
  control,
  description,
  disabled,
  name,
  label,
  required,
  placeholder,
  ...rest
}: FormInputProps<T>) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (!allowedKeys.includes(key) && (key < '0' || key > '9')) {
      event.preventDefault();
    }
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              disabled={disabled}
              placeholder={placeholder}
              onKeyDown={rest.type === 'number' ? onKeyDown : undefined}
              {...field}
              {...rest}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
