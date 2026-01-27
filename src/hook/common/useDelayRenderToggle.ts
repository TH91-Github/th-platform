import { useCallback, useEffect, useRef, useState } from 'react';

interface UseDelayRenderTogglePropsType {
  delay?: number;
}

export const useDelayRenderToggle = ({
  delay = 0,
}: UseDelayRenderTogglePropsType = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const open = useCallback(() => {
    clearTimer();

    // ✅ open은 즉시
    setIsOpen(true);

    timerRef.current = window.setTimeout(() => {
      setIsRender(true);
    }, delay);
  }, [delay]);

  const close = useCallback(() => {
    clearTimer();

    // ✅ close도 즉시
    setIsOpen(false);

    timerRef.current = window.setTimeout(() => {
      setIsRender(false);
    }, delay);
  }, [delay]);

  const toggle = useCallback(() => {
    isOpen ? close() : open();
  }, [isOpen, open, close]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return {
    isOpen,
    isRender,
    toggle,
  };
};
