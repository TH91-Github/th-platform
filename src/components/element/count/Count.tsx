import { useEffect, useRef, useState } from 'react';

// 🔹 Count 컴포넌트
interface CountPropsType {
  start?: number,
  end: number,
  duration?: number,
  useComma?: boolean,
  onComplete?: () => void,
}

export const Count = ({
  start = 0,
  end,
  duration = 3000,
  useComma = false,
  onComplete,
}: CountPropsType) => {
  const [count, setCount] = useState(start);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    startTimeRef.current = null;
    completedRef.current = false;

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;

      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const value = start + (end - start) * progress;
      setCount(Math.floor(value));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [start, end, duration, onComplete]);

  const displayValue = useComma
    ? count.toLocaleString()
    : count.toString();

  return <span>{displayValue}</span>;
};
