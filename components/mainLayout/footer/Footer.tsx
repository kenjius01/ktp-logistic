'use client';
import { SVGProps } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Logo } from '@/components/logo/Logo';
import { companyInfoOptions } from '@/constants/options';

export const Footer = () => {
  const { data } = useSuspenseQuery(companyInfoOptions);
  const companyInfo = data?.result?.items?.[1];
  return (
    <footer className="bg-muted py-12 text-center">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          <div className="flex justify-center space-y-2 md:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Logo
                className="h-24 w-24 md:h-40 md:w-40"
                style={{ objectFit: 'cover' }}
                src="/images/logoBig.png"
              />
            </div>
          </div>
          <div className="flex justify-center space-y-2 md:justify-start">
            <ul className="flex flex-col space-y-1 text-base font-bold text-muted-foreground">
              <li className="text-left">
                <Link href="#" className="hover:text-mainColor hover:underline" prefetch={false}>
                  TRANG CHỦ
                </Link>
              </li>
              <li className="text-left">
                <Link href="#" className="hover:text-mainColor hover:underline" prefetch={false}>
                  GIỚI THIỆU
                </Link>
              </li>
              <li className="text-left">
                <Link href="#" className="hover:text-mainColor hover:underline" prefetch={false}>
                  TIN TỨC
                </Link>
              </li>{' '}
              <li className="text-left">
                <Link href="#" className="hover:text-mainColor hover:underline" prefetch={false}>
                  TRA CỨU
                </Link>
              </li>
              <li className="text-left">
                <Link href="#" className="hover:text-mainColor hover:underline" prefetch={false}>
                  LIÊN HỆ
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-y-2 text-left md:items-start">
            <h4 className="flex text-lg font-bold uppercase md:self-start">Thông tin liên hệ</h4>
            <ul className="flex flex-col items-center space-y-1">
              <li className="flex self-start text-nowrap">Địa chỉ: {companyInfo?.address}</li>
              <li className="flex self-start">Email: {companyInfo?.email}</li>
              <li className="flex self-start">Số điện thoại: {companyInfo?.phone_number}</li>
            </ul>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h4 className="text-lg font-bold uppercase">Theo dõi chúng tôi</h4>
            <div className="flex items-center space-x-4 md:justify-center">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <LinkedinIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          &copy; 2024 Your Company. All rights reserved.
        </div> */}
      </div>
    </footer>
  );
};

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
