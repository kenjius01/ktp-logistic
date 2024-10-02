import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { MainLayout } from '@/components/mainLayout/MainLayout';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const font = Roboto({
  subsets: ['vietnamese'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Thịnh Phát Logistics',
  description: '',
  icons: {
    icon: '/logoIcon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'en'} className="scroll-smooth">
      <body className={font.className}>
        <QueryProvider>
          <MainLayout>{children}</MainLayout>
          <ReactQueryDevtools />
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
