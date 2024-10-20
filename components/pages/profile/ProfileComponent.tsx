'use client';

import { useSearchParams } from 'next/navigation';

import { ChangePassword } from './ChangePassword';
import { MyOrder } from './MyOrder';
import { TAB_PROFILE } from './ProfileSidebar';
import { UpdateProfile } from './UpdateProfile';

export const ProfileComponent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || TAB_PROFILE.INFO;

  return (
    <div>
      {tab === TAB_PROFILE.INFO && <UpdateProfile />}
      {tab === TAB_PROFILE.CHANGE_PASSWORD && <ChangePassword />}
      {tab === TAB_PROFILE.MY_ORDER && <MyOrder />}
    </div>
  );
};
