import { useEffect, useRef, useState } from 'react';

// 🔹 Count 컴포넌트
interface CountPropsType {
  start?: number, // 시작 값
  end: number, // 끝나는 값
  duration?: number,  // 시간 
  useComma?: boolean, // 숫자 천 단위 콤마 , 
  resetZero?: boolean, // 값 변경 시 0부터 다시 시작하고 싶은 경우
  onComplete?: () => void,
}
export const Count = ({
  start = 0,
  end,
  duration = 1000,
  useComma = false,
  resetZero = false,
  onComplete,
}: CountPropsType) => {
  const [count, setCount] = useState(start)
  const startValueRef = useRef(start)
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    startValueRef.current = resetZero ? 0 : count // 0 부터 시작 or 바뀌기 이전 부터
    startTimeRef.current = null
    completedRef.current = false

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time

      const elapsed = time - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const value = startValueRef.current + (end - startValueRef.current) * eased
      const next = Math.floor(value)

      setCount(prev => (prev === next ? prev : next))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
        if (!completedRef.current) {
          completedRef.current = true
          onComplete?.()
        }
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }

  }, [end, duration, resetZero])

  const displayValue = useComma
    ? count.toLocaleString()
    : count.toString();

  return <span>{displayValue}</span>;
};
