/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';
import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type FieldNamesType = {
  label: string;
  value: string;
};
interface FormSelectProps<T extends FieldValues> {
  control?: Control<T>;
  defaultSelect?: Record<string, unknown>;
  description?: React.ReactNode;
  emptyContent?: React.ReactNode;
  name: Path<T>;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  fieldNames?: FieldNamesType;
  options?: Array<Record<string, unknown>>;
  queryKey?: QueryKey;
  config?: QueryConfig<any>;
  queryFn?: QueryFunction<unknown, QueryKey>;
  [x: string]: unknown;
}

export const FormSelect = <T extends FieldValues>({
  name,
  config,
  defaultSelect,
  description,
  disabled,
  fieldNames = { label: 'label', value: 'value' },
  label,
  options,
  placeholder,
  queryFn,
  queryKey,
  required,
  ...rest
}: FormSelectProps<T>) => {
  const form = useFormContext();
  const { data, isLoading } = useQuery({
    queryKey: queryKey as QueryKey,
    queryFn,
    enabled: !!queryFn,
    refetchOnWindowFocus: false,
    retry: false,
    ...config,
  });

  const newOptions = useMemo(() => {
    if (options) {
      if (!defaultSelect) {
        return options;
      }
      return [defaultSelect, ...options];
    }
    if (queryFn) {
      const res = data?.result?.items || data?.result || [];
      if (!defaultSelect) {
        return res;
      }
      return [defaultSelect, ...res];
    }
  }, [data?.result, defaultSelect, options, queryFn]);
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
          <Select
            disabled={disabled || isLoading}
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...rest}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {newOptions.map((option: any) => (
                <SelectItem key={option[fieldNames.value]} value={option[fieldNames.value]}>
                  {option[fieldNames.label]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
