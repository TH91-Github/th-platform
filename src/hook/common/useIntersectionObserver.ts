import { useEffect, useRef, useState } from 'react';

// 🔹 IntersectionObserver 사용
interface UseIntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean; // 한번 보이고 유지
}

export function useIntersection<T extends HTMLElement>({
  threshold = 0.5, // 50% 
  root = null, // viewport 기준
  rootMargin = '0px', // 영역 여유 없음
  freezeOnceVisible = false,
}: UseIntersectionOptions = {}) {
  const observerRef = useRef<T | null>(null);
  const [observerToggle , setObserverToggle] = useState(false);
  const [observerVisible, setObserverVisible] = useState(false);

  useEffect(() => {
    const observerEl = observerRef.current;
    if (!observerEl) return;

    // SSR 처리 : DOM, window, IntersectionObserver 없기에 브라우저 환경 시에만
    if (typeof IntersectionObserver === 'undefined') return;

    if (freezeOnceVisible && observerVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setObserverToggle(visible);

        if (visible && !observerVisible) {
          setObserverVisible(true);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(observerEl);

    return () => {
      observer.disconnect();
    };
  }, [
    threshold, // 얼마나 보여지는지
    root, // null : 브라우저 viewport 또는 특정 element 스크롤 영역 기준
    rootMargin, // : 영역 감지 공간
    freezeOnceVisible,
    observerVisible
  ]);

  return {
    observerRef,
    observerToggle, // 보여지는지 체크 가능 freezeOnceVisible false일 경우
    observerVisible, // 한번이라도 보여졌는지 1회 체크
  };
}

/*
 ✅ 사용 방법
  const { observerRef, observerToggle } = useIntersection();
  const { observerRef, isIntersecting } = useIntersection<HTMLDivElement>({
    threshold: 0.5
  });

  const { observerRef, observerVisible } = useIntersection({
    freezeOnceVisible: true,
    threshold: 0.3,
  });
  <div ref={observerRef} data-observer={observerVisible} >...</div>
*/
