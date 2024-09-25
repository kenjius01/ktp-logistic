'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { listNavbarMenu } from '@/constants/menu';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-10 bg-white shadow-sm">
      <Container>
        <div className="flex h-16 justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Logo
            </Link>
          </div>
          <div className="hidden flex-grow items-center justify-center sm:flex">
            <div className="flex md:gap-2 lg:space-x-8">
              {listNavbarMenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-base font-bold text-black hover:border-mainColor hover:text-mainColor"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <Button variant="outline" className="mr-2">
              Đăng ký
            </Button>
            <Button>Đăng nhập</Button>
          </div>
          <div className="flex items-center sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {listNavbarMenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium capitalize hover:text-sky-500"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name.toLowerCase()}
                    </Link>
                  ))}
                  <hr className="my-4" />
                  <Button
                    variant="outline"
                    className="mb-2 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng ký
                  </Button>
                  <Button className="w-full" onClick={() => setIsOpen(false)}>
                    Đăng nhập
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </nav>
  );
};
