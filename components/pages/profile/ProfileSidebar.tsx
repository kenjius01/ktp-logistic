'use client';
import { LockIcon, ShoppingCartIcon, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

export const TAB_PROFILE = {
  INFO: 'info',
  CHANGE_PASSWORD: 'change-password',
  MY_ORDER: 'my-order',
};

const listTabs = [
  {
    name: TAB_PROFILE.INFO,
    icon: User2Icon,
    label: 'Thông tin tài khoản',
  },
  {
    name: TAB_PROFILE.CHANGE_PASSWORD,
    icon: LockIcon,
    label: 'Thay đổi mật khẩu',
  },
  {
    name: TAB_PROFILE.MY_ORDER,
    icon: ShoppingCartIcon,
    label: 'Đơn hàng của tôi',
  },
];

export const ProfileSidebar = () => {
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || TAB_PROFILE.INFO;
  return (
    <div className="col-span-1 rounded-md border-r px-3">
      <div className="flex flex-col">
        {listTabs.map(({ icon: Icon, name, label }) => (
          <Link
            href={{ query: { tab: name } }}
            key={name}
            className={cn('cursor-pointer rounded-md p-2 hover:text-mainColor', {
              'bg-mainColor/80 text-mainColor': name === tab,
            })}
          >
            <div className={cn('flex items-center gap-2', { 'text-white': name === tab })}>
              <Icon className="h-4 w-4 text-current" />
              <p>{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
