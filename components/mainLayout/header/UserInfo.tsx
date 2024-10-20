'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KEY_QUERY } from '@/constants/keyQuery';
import { ROUTES } from '@/constants/routes';
import { UserType } from '@/constants/types/user.type';
import { logoutApi } from '@/services/user.api';
import useAuthStore from '@/stores/useAuthStore';
import { getFullName, getInitialsName } from '@/utils/function.utils';

interface UserInfoProps {
  user: UserType;
  isMobile?: boolean;
}
export const UserInfo = ({ user, isMobile }: UserInfoProps) => {
  const { logout, user: userInfo, long_token } = useAuthStore();
  const { mutate } = useMutation({
    mutationKey: [KEY_QUERY.LOGOUT],
    mutationFn: logoutApi,
  });
  const router = useRouter();
  const onLogout = () => {
    mutate(
      { userId: userInfo?.id, accessToken: long_token },
      {
        onSuccess: () => {
          logout();
          router.refresh();
        },
      },
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <Avatar>
            <AvatarImage className="border" src={user?.avatar_url} alt="avatar" />
            <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
          </Avatar>
          {!isMobile && <div>{getFullName(user)}</div>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(ROUTES.PROFILE)}>
          Thông tin tài khoản
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
