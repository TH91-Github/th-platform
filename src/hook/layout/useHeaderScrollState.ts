import { useEffect, useState } from 'react';
import { getLenis } from '@/lib/scroll/smoothScroll';

export const useHeaderScrollState = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      setIsScrolled(prev => {
        const next = scroll > 0;
        return prev === next ? prev : next;
      });
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, []);

  return isScrolled;
};