import React, { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Banner } from '@/components/Banner/Banner';
import { Container } from '@/components/Container';
import { HotNewsSider } from '@/components/pages/news/HotNewsSider';
import { FormOrderRequest } from '@/components/pages/orderRequest/FormOrderRequest';
import { ShippingRegulation } from '@/components/pages/orderRequest/ShippingRegulation';
import { Skeleton } from '@/components/ui/skeleton';
import { shippingRegulationOptions } from '@/constants/options';
import { getQueryClient } from '@/lib/get-query-client';

interface OrderRequestPageProps {
  params: {
    page: string;
  };
}
const OrderRequestPage = ({ params: { page } }: OrderRequestPageProps) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(shippingRegulationOptions(Number(page || 1)));
  // void queryClient.prefetchQuery(hotNewsOptions);
  return (
    <div className="min-h-screen">
      <Banner />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Container>
          <h2 className="my-5 text-center text-4xl font-bold">Gửi yêu cầu lấy hàng</h2>
          <div className="grid h-full gap-8 lg:grid-cols-3">
            <div className="md:col-span-2">
              <div className="py-8">
                <FormOrderRequest />
              </div>
              <div>
                <h2 className="my-5 text-center text-4xl font-bold">Quy định vận chuyển</h2>
                <div className="py-8">
                  <Suspense fallback={<Skeleton />}>
                    <ShippingRegulation />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="top-16 mt-2 hidden h-fit w-full rounded bg-gray-100 p-8 md:sticky md:col-span-2 lg:col-span-1 lg:block">
              <h4 className="pb-4 font-bold uppercase">TIN TỨC NỔI BẬT</h4>
              <HotNewsSider />
            </div>
          </div>
        </Container>
      </HydrationBoundary>
    </div>
  );
};

export default OrderRequestPage;
