'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Container } from '@/components/Container';
import { Logo } from '@/components/logo/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { listNavbarMenu } from '@/constants/menu';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const firstPath = '/' + pathname?.split('/')[1];

  const onNavigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm">
      <Container>
        <div className="flex h-16 justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Logo />
          </div>
          <div className="hidden flex-grow items-center justify-center sm:flex">
            <div className="flex md:gap-2 lg:space-x-8">
              {listNavbarMenu.map((item) => (
                <Link
                  key={item.name}
                  prefetch
                  href={item.href}
                  className={cn(
                    'inline-flex items-center border-b-2 border-transparent text-base font-bold uppercase text-black hover:border-mainColor hover:text-mainColor',
                    firstPath === item.href && 'text-mainColor',
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <Button onClick={() => onNavigate(ROUTES.REGISTER)} variant="outline" className="mr-2">
              Đăng ký
            </Button>
            <Button onClick={() => onNavigate(ROUTES.LOGIN)}>Đăng nhập</Button>
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
                      className={cn(
                        'text-lg font-medium capitalize hover:text-mainColor',
                        firstPath === item.href && 'text-mainColor',
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name.toLowerCase()}
                    </Link>
                  ))}
                  <hr className="my-4" />
                  <Button
                    variant="outline"
                    className="mb-2 w-full"
                    onClick={() => onNavigate(ROUTES.REGISTER)}
                  >
                    Đăng ký
                  </Button>
                  <Button className="w-full" onClick={() => onNavigate(ROUTES.LOGIN)}>
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
