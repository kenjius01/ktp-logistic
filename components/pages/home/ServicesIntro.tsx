'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Container } from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_FILTER, listAdInfos, SERVICE_COMPANY } from '@/constants/common';
import { KEY_QUERY } from '@/constants/keyQuery';
import { ROUTES } from '@/constants/routes';
import { WebConfigType } from '@/constants/types';
import { searchWebConfigApi } from '@/services/common.services';
import useAuthStore from '@/stores/useAuthStore';

import { CompanyCarousel } from './CompanyCarousel';
import { ProcessAndFeedback } from './ProcessAndFeedback';

const ServicesIntro = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: [KEY_QUERY.WEB_CONFIG],
    queryFn: () => searchWebConfigApi(DEFAULT_FILTER),
  });
  const listWebConfig = data?.result?.items || [];

  const onRedirectTrackingOrder = (item: WebConfigType) => {
    if (Object.values(SERVICE_COMPANY).includes(item?.name) && user) {
      router.push(ROUTES.TRACKING_ORDER_TYPE(item?.name));
      return;
    }
    window.open(item?.link_web, '_blank');
  };
  return (
    <Container>
      <h2 className="py-8 text-center text-base font-bold sm:text-2xl md:text-3xl lg:text-4xl">
        VẬN CHUYỂN HÀNG HÓA QUỐC TẾ
      </h2>
      <div className="rounded-2xl p-8 shadow-[10px_10px_30px_0px_rgba(0,0,0,0.14)]">
        <div className="max-w-6xl">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h2 className="text-center text-base font-bold md:text-xl lg:text-2xl">
                THỊNH PHÁT LOGISTICS - CUNG CẤP DỊCH VỤ GỬI HÀNG ĐI NƯỚC NGOÀI UY TÍN
              </h2>
            </div>
            <p className="text-center">
              Với đa dạng dịch vụ <b>gửi hàng đi nước ngoài</b> như Singapore, Malaysia, Hàn Quốc,
              Đài Loan, Mỹ,.. Cùng nhiều năm kinh nghiệm trong việc gửi hàng đi nước ngoài, Thịnh
              phát logisticS sẽ là lựa chọn đáng tin cậy cho mọi khách hàng!
            </p>
            <p className="text-center text-xl font-bold uppercase">
              Tra cứu lộ trình đơn hàng từ nước ngoài
            </p>
          </div>

          {/* Carousel */}
          <div className="p-6">
            <Carousel className="mt-8 w-auto" opts={{ loop: true }}>
              <CarouselContent>
                {isLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
                        <div className="relative mb-2 aspect-square h-auto cursor-pointer">
                          <Skeleton className="h-full w-full rounded-xl" />
                        </div>
                      </CarouselItem>
                    ))
                  : listWebConfig.map((item) => (
                      <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3">
                        <div className="relative mb-2 aspect-square h-auto cursor-pointer">
                          <Image
                            className="rounded-3xl border-[0.5px] object-contain shadow-[-1px_4px_5px_0px_rgba(0,0,0,0.5)]"
                            src={item?.avatar_url}
                            alt="order"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            onClick={() => onRedirectTrackingOrder(item)}
                          />
                        </div>
                      </CarouselItem>
                    ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Why choose me */}
          <div className="bg-orange-200">
            <div className="pt-4">
              <h2 className="text-center text-2xl font-bold">TẠI SAO NÊN CHỌN CHÚNG TÔI?</h2>
            </div>
            <div className="pt-8">
              <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-4">
                {listAdInfos.map((item) => (
                  <Card className={''} key={item.id} style={item.style}>
                    <CardHeader className="flex flex-col gap-2">
                      <div className="icon relative mx-auto h-20 w-20">
                        <Image
                          src={item.image}
                          alt="icon"
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                      <CardTitle className="text-center text-base font-bold">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-justify">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <ProcessAndFeedback />
          <CompanyCarousel />
        </div>
      </div>
    </Container>
  );
};

export default ServicesIntro;
