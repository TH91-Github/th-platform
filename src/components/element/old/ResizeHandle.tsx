import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { stateIsMobile } from "recoilStore/atoms";
import { isMobileSizeChk } from "utils/common";

// 🔹 공통 resize 함수
export const ResizeHandle = () => {
  const [_viewport, setViewport] = useRecoilState(stateIsMobile);

  const handleResize = () => {
    const newViewport = isMobileSizeChk();
    setViewport(prev => {
      if (prev !== newViewport) {
        return newViewport;
      }
      return prev;
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setViewport]);

  return null;
}