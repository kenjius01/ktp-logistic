import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserType } from '@/constants/types/user.type';

const AUTH_KEY = 'auth';
interface AuthState {
  token?: string | null;
  long_token?: string | null;
  user: UserType | null;
  setTokens: (token: string, long_token?: string) => void;
  setUser: (user: UserType) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      long_token: null,
      user: null,
      setTokens: (token, long_token) => set({ token, long_token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, long_token: null, user: null }),
    }),
    {
      name: AUTH_KEY,
      // storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
