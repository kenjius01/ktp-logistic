import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Banner } from '@/components/Banner/Banner';
import { Contact } from '@/components/contact/Contact';
import ServicesIntro from '@/components/pages/home/ServicesIntro';
import { bannerOptions } from '@/constants/options';
import { getQueryClient } from '@/lib/get-query-client';

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(bannerOptions);
  return (
    <div className="">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Banner />
      </HydrationBoundary>
      <ServicesIntro />
      <Contact />
    </div>
  );
}
