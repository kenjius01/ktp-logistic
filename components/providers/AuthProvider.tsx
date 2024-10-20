'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { KEY_QUERY } from '@/constants/keyQuery';
import { getMeApi } from '@/services/user.api';
import useAuthStore from '@/stores/useAuthStore';

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, token } = useAuthStore();
  const { data } = useQuery({
    queryKey: [KEY_QUERY.GET_ME, token],
    queryFn: getMeApi,
    enabled: !!token,
  });
  const profileRes = data?.result;

  useEffect(() => {
    if (profileRes) {
      setUser(profileRes);
    }
  }, [profileRes, setUser]);
  return <div>{children}</div>;
};
