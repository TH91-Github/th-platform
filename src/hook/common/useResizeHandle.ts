// hooks/useResizeHandle.ts
import { useEffect } from "react";
import { useIsMobileStore } from "@/store/zustand/common/commonStore";

export const useResizeHandle = () => {
  const setIsMobile = useIsMobileStore((state) => state.setIsMobile);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    // 초기
    setIsMobile(media.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      const prevViewport = useIsMobileStore.getState().isMobile;
      if (prevViewport !== e.matches) {
        setIsMobile(e.matches);
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [setIsMobile]);
};
