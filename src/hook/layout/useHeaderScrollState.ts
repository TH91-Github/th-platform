// /hook/layout/useHeaderScrollState.ts
import { useEffect, useState } from 'react';

// 🔹 header scroll 
export const useHeaderScrollState = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 0;

      setIsScrolled(prev => {
        if (prev === next) return prev;
        return next;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrolled;
};
