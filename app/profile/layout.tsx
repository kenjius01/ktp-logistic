import React, { Suspense } from 'react';

import { Container } from '@/components/Container';
import { ProfileSidebar } from '@/components/pages/profile/ProfileSidebar';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <Suspense>
      <Container className="py-8">
        <div className="grid grid-cols-4 gap-4">
          <ProfileSidebar />
          <div className="col-span-4 md:col-span-3">{children}</div>
        </div>
      </Container>
    </Suspense>
  );
};

export default ProfileLayout;
