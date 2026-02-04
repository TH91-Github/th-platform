import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAnimatedToggleOptions {
  duration?: number;
}

export const useCloseAniToggle = ({
  duration = 500,
}: UseAnimatedToggleOptions = {}) => {
  const [isRender, setIsRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const close = useCallback(() => {
    // 이미 닫히는 중이면 중복 실행 방지
    if (!isRender || isClosing) return;

    setIsOpen(false);
    setIsClosing(true);

    timerRef.current = window.setTimeout(() => {
      setIsRender(false);
      setIsClosing(false);
    }, duration);
  }, [isRender, isClosing, duration]);

  const open = useCallback(() => {
    setIsRender(true);

    requestAnimationFrame(() => {
      setIsOpen(true);
      setIsClosing(false);
    });
  }, []);

  const toggle = useCallback(() => {
    if (!isRender) {
      open();
    } else {
      close();
    }
  }, [isRender, open, close]);

  // ✅ 외부 클릭 시 닫기
  useEffect(() => {
    if (!isRender) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isRender, close]);

  return {
    isRender,
    isOpen,
    isClosing,
    toggle,
    close,
    containerRef,
  };
};
