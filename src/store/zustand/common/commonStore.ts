import { create } from 'zustand'
import { persist } from 'zustand/middleware';

// 🔹 모바일 체크
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

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist( // zustand 미들웨어를 사용해서 반복 구조 개선
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          return { theme: newTheme };
        }),
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },
    }),
    {
      // localStorage 저장 / 불러오기 자동화
      name: 'platform-theme',
      onRehydrateStorage: () => (state) => {  // onRehydrateStorage 저장된 데이터 다시 복원
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme);
        }
      },
    }
  )
);

// isMobile
export const useIsMobile = () => useIsMobileStore((state) => state.isMobile)
export const useIsMobileAction = () => useIsMobileStore((state) => state.setIsMobile);

// theme
export const useTheme = () => useThemeStore((state) => state.theme);
export const useToggleTheme = () => useThemeStore((state) => state.toggleTheme);
export const useSetTheme = () => useThemeStore((state) => state.setTheme);