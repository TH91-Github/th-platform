import { useCallback, useEffect, useRef } from "react";

const BODY = document.body;

// 🔹 스크롤 잠금
export const useBodyScrolLock = () =>{
  const scrollYRef = useRef(0);
  const isLockedRef = useRef(false);
  const scrollbarWidthRef = useRef(0);

  const preventTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
  }, []);

  // 스크롤바 너비
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  const lockScroll = useCallback(() => {
    if (isLockedRef.current) return;
    scrollYRef.current = window.scrollY;

    // 스크롤바가 존재할 경우에 레이아웃 흔들림 방지 패딩(right) 추가
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth > 0) {
      scrollbarWidthRef.current = scrollbarWidth;
      BODY.style.paddingRight = `${scrollbarWidth}px`;
    }

    BODY.style.overflowY = 'hidden';
    BODY.style.position = 'fixed';
    BODY.style.top = `-${scrollYRef.current}px`;
    BODY.style.width = '100%';

    document.addEventListener('touchmove', preventTouchMove, { passive: false });

    isLockedRef.current = true;
  }, [preventTouchMove]);

  const unlockScroll = useCallback(() => {
    if (!isLockedRef.current) return;

    BODY.style.overflowY = '';
    BODY.style.position = '';
    BODY.style.top = '';
    BODY.style.width = '';
    BODY.style.paddingRight = '';

    window.scrollTo(0, scrollYRef.current);
    document.removeEventListener('touchmove', preventTouchMove);
    isLockedRef.current = false;
  }, [preventTouchMove]);

  useEffect(() => {
    return () => {
      if (isLockedRef.current) {
        unlockScroll();
      }
    };
  }, [unlockScroll]);

  return { lockScroll, unlockScroll };
}

// 🔹 포커스 저장 및 회귀 : data-id 활용하여 포커스 회귀
export const useRestoreFocus = (): {
  beforeFocus: (target?: HTMLElement | string, targetTag?: string) => void;
  resetFocus: () => void;
} => {
  const focusTarget = useRef<string | null>(null);

  const targetFind = useCallback((element:HTMLElement, tag:string) => {
    const dataID = element.getAttribute('data-id');
    dataID 
      ? focusTarget.current = `${tag}[data-id="${dataID}"]`
      : focusTarget.current = null;
  },[]);
  // focus 회귀 전 저장
  const beforeFocus = useCallback((target?: HTMLElement | string, targetTag: string= 'button') => {
    if (typeof target === 'string') { // id값만 있는 경우
      focusTarget.current = `${targetTag}[data-id="${target}"]`;
    }else if(target instanceof HTMLElement){
      // HTMLElement인 경우 data-id 속성 추출
      targetFind(target,targetTag);
    }else{
      // 현재 기준 activeElement 선택
      const active = document.activeElement;
      if(active instanceof HTMLElement){
        targetFind(active,targetTag);
      }
    }
  }, [targetFind]);

  // focus 회귀 하기
  const resetFocus = useCallback(() => {
    const selectFind = focusTarget.current;
    if (!selectFind) return;

    requestAnimationFrame(() => {
      const focusEl = document.querySelector(selectFind);
      
      if (focusEl instanceof HTMLElement) {
        focusEl.focus();
        setTimeout(() => {
          focusTarget.current = null;
        }, 200);
      } else {
        focusTarget.current = null;
      }
    });
  }, []);
  return { beforeFocus, resetFocus };
};