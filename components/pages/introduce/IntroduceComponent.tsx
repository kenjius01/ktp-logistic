'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { Container } from '@/components/Container';
import { StringToHtml } from '@/components/container/stringToHtml/StringToHtml';
import { introduceOptions } from '@/constants/options';

import { Competitive } from './Competitive';
import { Partner } from './Partner';
import { RootValue } from './RootValue';
import { TextImage } from './TextImage';

export const IntroduceComponent = () => {
  const { data } = useSuspenseQuery(introduceOptions);
  const introduceRes = data?.result?.items?.[0];
  const getDataFromServer = () => {
    const visions = introduceRes?.info_vision || [];
    const missions = introduceRes?.info_mission || [];

    return [...visions, ...missions];
  };
  return (
    <div>
      <div className="bannerIntroduce relative h-80 w-full">
        <Image
          src={introduceRes?.cover_url}
          alt="introduce"
          fill
          className="rounded object-cover"
          priority={true}
        />
      </div>
      <Container>
        <div className="pt-16">
          <h3 className="pb-6 text-center text-3xl font-bold uppercase text-mainColor">
            {introduceRes?.title}
          </h3>
          <StringToHtml string={introduceRes?.content} />
        </div>
      </Container>

      <Container>
        <div className="space-y-10 md:space-y-24">
          {getDataFromServer().map((item, index) => {
            if (index % 2 === 0) {
              return (
                <TextImage
                  aos="ltr"
                  title={item?.content || 'Không có tiêu đề'}
                  mainTitle={item?.title || 'Không có nội dung chi tiết'}
                  image_url={item?.image_url || '/images/vision.png'}
                  key={index}
                  className={`flex flex-col md:flex-row-reverse`}
                  aosImage="rtl"
                  iconImage={'/icon/icon.svg'}
                  classImage={'aspect-video md:w-2/3 w-full'}
                />
              );
            }
            return (
              <TextImage
                aos="rtl"
                title={item?.content || 'Không có tiêu đề'}
                mainTitle={item?.title || 'Không có nội dung chi tiết'}
                image_url={item?.image_url || '/images/mission.png'}
                key={index}
                className={`flex flex-col md:flex-row`}
                rightText
                aosImage="ltr"
                iconImage={'/icon/icon.svg'}
                classImage={'aspect-video md:w-2/3 w-full'}
              />
            );
          })}
        </div>
      </Container>

      <div className="mt-16">
        <RootValue data={introduceRes.info_core_value} />
      </div>
      <Container>
        <div className="py-16">
          <Competitive data={introduceRes.info_competitive} />
        </div>
      </Container>
      <div className="py-16">
        <Partner />
      </div>
    </div>
  );
};
