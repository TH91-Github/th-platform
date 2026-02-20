import { useEffect, useState } from 'react';

// 🔹 header scroll 
export const useHeaderScrollState = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 🔹 body 스크롤 잠금 상태 체크
      const isBodyLocked = document.body.style.overflowY === 'hidden';
      
      // 잠금 상태면 무시하고 현재 값 유지
      if (isBodyLocked) {
        return;
      }

      const next = window.scrollY > 0;
      setIsScrolled(prev => {
        if (prev === next) return prev;
        return next;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 호출

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrolled;
};
