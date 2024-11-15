'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

import { Container } from '@/components/Container';
import { FormCombobox, FormInput } from '@/components/Form';
import { DataTable } from '@/components/Table/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { DEFAULT_FILTER } from '@/constants/common';
import { OPERATION_FILTER } from '@/constants/filters';
import { KEY_QUERY } from '@/constants/keyQuery';
import { massListOptions } from '@/constants/options';
import { IConfigPrice, LookupFormType } from '@/constants/types/lookup.type';
import { searchDistrictByProvince, searchProvince } from '@/services/area.api';
import { lookupFeeAndTimeApi, searchShippingServiceApi } from '@/services/lookup.api';

import { MassItem } from './MassItem';

const transportFormOptions = [
  {
    value: 1,
    label: 'Trong nước',
  },
  {
    value: 2,
    label: 'Quốc tế',
  },
];

const formSchema = z.object({
  service_id: z.number({
    message: 'Vui lòng chọn dịch vụ',
  }),
  khoi_luong: z.string().min(1, {
    message: 'Vui lòng nhập khối lượng',
  }),
  khoi_luong_id: z.string(),
  from_province_code: z.string().min(1, {
    message: 'Vui lòng chọn tỉnh',
  }),
  from_district_code: z.string(),
  to_province_code: z.string().min(1, {
    message: 'Vui lòng chọn tỉnh',
  }),
  to_district_code: z.string(),
  transport_form1: z.number().optional(),
  transport_form2: z.number().optional(),
});

export const FeeLookup = () => {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(massListOptions);
  const massList = data?.result?.items || [];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // service_id: null,
      khoi_luong_id: '',
      khoi_luong: '0',
      from_province_code: '',
      from_district_code: '',
      to_province_code: '',
      to_district_code: '',
    },
  });
  const fromProvinceCode = form.watch('from_province_code');
  const toProvinceCode = form.watch('to_province_code');
  const [activeMassId, setActiveMassId] = useState<number | string>();
  const [lookupForm, setLookupForm] = useState<LookupFormType>();
  const onSelectMass = (weight: string) => {
    form.setValue('khoi_luong', weight);
  };
  // Hàm để tìm kiếm khoảng khối lượng
  // Hàm tìm kiếm khoảng khối lượng
  const findKhoiLuongId = (weight: number) => {
    const item = massList.find(({ from, to }) => {
      if (to === undefined) {
        return weight >= from; // Nếu không có `to`, chỉ kiểm tra `from`
      } else {
        return weight >= from && weight <= to; // Kiểm tra cả `from` và `to`
      }
    });

    return item ? item.id : ''; // Trả về `id` nếu tìm thấy
  };
  const { data: lookupRes, isFetching: isLoading } = useQuery({
    queryKey: [KEY_QUERY.LOOKUP, lookupForm],
    queryFn: () => lookupFeeAndTimeApi(lookupForm as LookupFormType),
    enabled: !!lookupForm,
  });
  const configPrices = lookupRes?.result?.config_price || [];
  const transport_form1 = form.watch('transport_form1');
  const transport_form2 = form.watch('transport_form2');
  const onLookup = (values: z.infer<typeof formSchema>) => {
    const { khoi_luong, ...rest } = values;
    const khoi_luong_id = findKhoiLuongId(Number(khoi_luong));
    setActiveMassId(khoi_luong_id);
    const dataLookup = {
      ...rest,
      khoi_luong_id,
    };
    setLookupForm(dataLookup);
    queryClient.invalidateQueries({ queryKey: [KEY_QUERY.LOOKUP] });
  };

  const columns: ColumnDef<IConfigPrice>[] = [
    {
      accessorKey: 'name',
      header: 'Tên dịch vụ',
    },
    {
      accessorKey: 'price_default',
      header: 'Giá cước',
    },
    {
      accessorKey: 'time_default',
      header: 'Thời gian',
    },
  ];
  return (
    <Container>
      <div>
        <h3 className="mb-4 font-bold uppercase">KHỐI LƯỢNG ƯỚC TÍNH</h3>
        <div className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-5">
          {massList.map((item) => (
            <MassItem
              activeMassId={activeMassId}
              setActiveMassId={setActiveMassId}
              key={item.id}
              item={item}
              onSelectMass={onSelectMass}
            />
          ))}
        </div>
        <h3 className="mb-4 font-bold uppercase">ƯỚC TÍNH CƯỚC PHÍ</h3>
        <div className="flex flex-col gap-4 md:flex-row">
          <Form {...form}>
            <form
              className="flex-1"
              onSubmit={form.handleSubmit(onLookup, (errors) => console.log(errors))}
            >
              <Card className="bg-[#f0f0f0]">
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-2">
                    <FormCombobox
                      required
                      className="w-full justify-between"
                      label="Dịch vụ"
                      control={form.control}
                      name="service_id"
                      queryKey={[KEY_QUERY.SHIPPING_SERVICE]}
                      queryFn={() => searchShippingServiceApi(DEFAULT_FILTER)}
                      fieldNames={{ value: 'id', label: 'name' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormCombobox
                      className="w-full justify-between"
                      label="Hình thức vận chuyển"
                      control={form.control}
                      name="transport_form1"
                      options={transportFormOptions}
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full space-y-2">
                      <FormCombobox
                        required
                        className="w-full justify-between"
                        label="Gửi từ"
                        placeholder="Chọn tỉnh"
                        control={form.control}
                        name="from_province_code"
                        queryKey={[KEY_QUERY.PROVINCE, 'from_province_code', transport_form1]}
                        queryFn={() =>
                          searchProvince({
                            keyword: '',
                            filters: [
                              {
                                name: 'in_the_country',
                                value: transport_form1 === 1,
                                operation: OPERATION_FILTER.EQ,
                              },
                            ],
                            pageable: { page_size: 100, page: 1 },
                          })
                        }
                        fieldNames={{ value: 'code', label: 'name' }}
                      />
                    </div>

                    <div className="w-full space-y-2">
                      <FormCombobox
                        className="w-full justify-between"
                        label="Quận/huyện"
                        placeholder="Chọn huyện"
                        control={form.control}
                        name="from_district_code"
                        config={{ enabled: !!fromProvinceCode }}
                        queryKey={[
                          KEY_QUERY.DISTRICT,
                          fromProvinceCode,
                          'from_district_code',
                          transport_form1,
                        ]}
                        queryFn={() => searchDistrictByProvince(fromProvinceCode)}
                        fieldNames={{ value: 'code', label: 'name' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormCombobox
                      className="w-full justify-between"
                      label="Hình thức vận chuyển"
                      control={form.control}
                      name="transport_form2"
                      options={transportFormOptions}
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full space-y-2">
                      <FormCombobox
                        required
                        className="w-full justify-between"
                        label="Gửi đến"
                        placeholder="Chọn tỉnh"
                        control={form.control}
                        name="to_province_code"
                        queryKey={[KEY_QUERY.PROVINCE, 'to_province_code', transport_form2]}
                        queryFn={() =>
                          searchProvince({
                            keyword: '',
                            filters: [
                              {
                                name: 'in_the_country',
                                value: transport_form2 === 1,
                                operation: OPERATION_FILTER.EQ,
                              },
                            ],
                            pageable: { page_size: 100, page: 1 },
                          })
                        }
                        fieldNames={{ value: 'code', label: 'name' }}
                      />
                    </div>
                    <div className="w-full space-y-2">
                      <FormCombobox
                        className="w-full justify-between"
                        label="Quận/huyện"
                        placeholder="Chọn huyện"
                        control={form.control}
                        name="to_district_code"
                        config={{ enabled: !!toProvinceCode }}
                        queryKey={[toProvinceCode, 'to_district_code', transport_form2]}
                        queryFn={() => searchDistrictByProvince(toProvinceCode)}
                        fieldNames={{ value: 'code', label: 'name' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormInput
                      className="bg-white"
                      control={form.control}
                      name="khoi_luong"
                      required
                      label="Trọng lượng"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <Button size={'lg'} disabled={isLoading} type="submit" className="font-bold">
                    {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Tra cứu
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
          <div className="result flex-1">
            <DataTable isLoading={isLoading} columns={columns} data={configPrices} />
          </div>
        </div>
      </div>
    </Container>
  );
};
