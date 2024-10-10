import React from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';

interface FormTextAreaProps<T extends FieldValues> {
  name: Path<T>;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  description?: React.ReactNode;
  [x: string]: unknown;
}
export const FormTextArea = <T extends FieldValues>({
  disabled,
  name,
  label,
  required,
  placeholder,
  description,
  ...rest
}: FormTextAreaProps<T>) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea disabled={disabled} placeholder={placeholder} {...field} {...rest} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
