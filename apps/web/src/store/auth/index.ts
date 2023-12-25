import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from '@lumi/types';

export type AuthState = {
  logged: boolean;
  data?: User;
  setLogged: (logged: boolean) => void;
  setUser: (user: User) => void;
};

export const useAuthState = create<AuthState>()(
  devtools(
    persist(
      set => ({
        logged: false,
        setLogged: logged => set(state => ({ ...state, logged })),
        setUser: user => set(state => ({ ...state, data: user })),
      }),
      { name: 'auth' },
    ),
  ),
);
