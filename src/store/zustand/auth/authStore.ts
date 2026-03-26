import type { AuthStateType, AuthUserType } from "@/types/auth/auth";
import { create } from "zustand";

interface AuthStoreType extends AuthStateType {
  login: (user: AuthUserType) => void;
  logout: () => void;
  setAuthReady: () => void;
}

const initialAuthState: AuthStateType = {
  user: null,
  loginTime: 0,
  isAuthReady: false,
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  ...initialAuthState,
  login: (user) =>
    set({
      user,
      loginTime: Date.now(),
      isAuthReady: true,
    }),
  logout: () =>
    set({
      user: null,
      loginTime: 0,
      isAuthReady: true,
    }),
  setAuthReady: () => set({ isAuthReady: true }),
}));

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthReady = () => useAuthStore((state) => state.isAuthReady);
