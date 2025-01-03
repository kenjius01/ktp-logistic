/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { cn } from '@/lib/utils';
import { matchText } from '@/utils/function.utils';

import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type FieldNamesType = {
  label: string;
  value: string;
};
interface FormComboboxProps<T extends FieldValues> {
  control?: Control<T>;
  className?: string;
  commandClassName?: string;
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
export const FormCombobox = <T extends FieldValues>({
  name,
  control,
  className,
  commandClassName,
  defaultSelect,
  description,
  disabled,
  emptyContent,
  label,
  placeholder,
  required,
  fieldNames = { label: 'label', value: 'value' },
  config,
  options,
  queryFn,
  queryKey,
}: FormComboboxProps<T>) => {
  const [open, setOpen] = React.useState(false);
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
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="">
              <FormControl>
                <Button
                  disabled={isLoading || disabled}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'flex w-[200px] items-start justify-between',
                    !field.value && 'text-muted-foreground',
                    className,
                  )}
                >
                  {field.value
                    ? newOptions?.find((item: any) => item?.[fieldNames.value] === field.value)?.[
                        fieldNames.label
                      ]
                    : placeholder || `Chọn ${label}`}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn('p-0')}>
              <Command
                filter={(value, search) => {
                  if (matchText(value, search)) {
                    return 1;
                  }
                  return 0;
                }}
                className={cn('', commandClassName)}
              >
                <CommandInput placeholder={'Tìm kiếm'} className="h-9" />
                <CommandList>
                  <CommandEmpty>{emptyContent || 'Không tìm thấy kết quả'}</CommandEmpty>
                  <CommandGroup>
                    {newOptions.map((item: any) => (
                      <CommandItem
                        value={item?.[fieldNames.label]}
                        key={item?.[fieldNames.value]}
                        onSelect={() => {
                          form.setValue(name, item?.[fieldNames.value]);
                          setOpen(false);
                        }}
                      >
                        {item?.[fieldNames.label]}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            item?.[fieldNames.value] === field.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
