import { create } from 'zustand'

interface UseIsMobileStoreType {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

export const useIsMobileStore = create<UseIsMobileStoreType>((set, get) => ({
  isMobile: false,
  
  setIsMobile: (value: boolean) => {
    const current = get().isMobile;
    if (current !== value) set({ isMobile: value });
  },
}));

export const useIsMobile = () => useIsMobileStore((state) => state.isMobile)
export const useIsMobileAction = () => useIsMobileStore((state) => state.setIsMobile);
