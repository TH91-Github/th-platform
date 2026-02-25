import { IconClose } from "@/assets/icon";
import { media } from "@/assets/style/emotion/variables";
import { useBodyScrolLock } from "@/hook/common/useCommon";
import { cn } from "@/utils/common";
import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// 🔹 모달, 팝업 
interface ModalPropsType {
  isDimmed?: boolean, // dimmed on/off EX: 2중 모달 시 
  isUnder?: boolean, // 2중 모달일 경우 딤드보다 아래로
  autoCloseSecond?: number, // 자동 닫기 시간초 1000 단위
  className?:string,
  $width?: number,
  $align?: 'center' | 'left' | 'right',
  children?: React.ReactNode | ((close: () => void) => React.ReactNode)
  onClose: () => void; // ⭐ 필수
}
export const Modal = ({
  isDimmed = true,
  isUnder,
  autoCloseSecond,
  className,
  $width = 300,
  $align = 'center',
  children,
  onClose
}:ModalPropsType) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const prevFocusRef = useRef<HTMLElement>(document.activeElement as HTMLElement);
  const [isClosing, setIsClosing] = useState(false);
  const { lockScroll, unlockScroll } = useBodyScrolLock();
  const autoCloseS = autoCloseSecond ? (autoCloseSecond < 2000 ? 2000 : autoCloseSecond) : 0;
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 
  const handleCloseClick = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    if (autoTimerRef.current) { 
      clearTimeout(autoTimerRef.current);
    }
    setTimeout(() => {
      onClose();
      prevFocusRef.current?.focus();
      if(isDimmed) unlockScroll();
    }, 200);
  },[isClosing, isDimmed, onClose, unlockScroll]);

  useEffect(() => { // 자동 닫기
    if (autoCloseS > 0) {
      autoTimerRef.current = setTimeout(() => {
        handleCloseClick();
      }, autoCloseS);
    }
    return () => {
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current);
      }
    };
  }, [autoCloseS, handleCloseClick]);

  useEffect(() => {
    if(modalRef.current){
      modalRef.current.focus();
    }
    if(isDimmed) lockScroll(); // scroll lock, 중첩 모달 시 실행 x
    return () => setIsClosing(false);
  }, [isDimmed, lockScroll]);
  
  // 포커스 이탈 방지
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements: HTMLElement[] = [
        modalRef.current, // modal-inner tabindex 0
        ...modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), ' +
          'textarea:not([disabled]), button:not([disabled]), iframe, object, embed, ' +
          '[tabindex]:not([tabindex="-1"]), [contenteditable]'
        ),
      ];
      const firstFocus = focusableElements[0];
      const lastFocus = focusableElements[focusableElements.length - 1];
      if (focusableElements.length === 0) return;

      // 처음과 마지막에서 탭, 역 탭 진행 시
      if (e.shiftKey && document.activeElement === firstFocus) {
        e.preventDefault();
        lastFocus.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocus) { 
        e.preventDefault();
        firstFocus.focus();
      }
    }
    if (e.key === 'Escape') {
      handleCloseClick();
    }
  },[handleCloseClick]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[handleKeyDown]);

  return (
    createPortal(
      <StyleWrap 
        className={cn(
          'modal-wrap', 
          className,
          isClosing && 'modal-close',
        )}
        $width={$width}
        $align={$align}
        $autoTime={(autoCloseS / 1000)}
      >
        <div 
          className={`modal-inner ${isUnder ? 'under':''}`}
          tabIndex={0}
          ref={modalRef}
        >
          <div className="modal-cont">
            {typeof children === 'function'
              ? children(handleCloseClick)
              : children}
          </div>
          <button 
            type="button" 
            className="btn-close"
            onClick={handleCloseClick}
          >
            <i className="icon"><IconClose /></i>
          </button>
          {
            autoCloseSecond && <span className="timer-bar"></span>
          }
        </div>
        <div className={`dimmed ${!isDimmed ? 'overlapping': ''}`} onClick={handleCloseClick}></div>
      </StyleWrap>,
      document.body
    )
  )
}

interface StyleWrapProps {
  $width:number;
  $align:string;
  $autoTime:number;
}
const StyleWrap = styled.div<StyleWrapProps>`
position:fixed;
z-index:100;
top:0;
left:0;
width:100svw;
height:100svh;
text-align: ${({$align}) => $align};
&.modal-close{
  pointer-events: none;
  .modal-inner{
    animation: fadeDownCenterAni .2s ease both;
  }
  .dimmed {
    animation: fadeOutAni .2s ease both;
  }
}
.modal-inner{
  overflow:hidden;
  display:flex;
  flex-direction: column;
  position:absolute;
  z-index:102;
  top:50%;
  left:50%;
  width:${({$width}) => $width}px;
  min-height:50px;
  max-width:80%;
  padding:30px;
  border-radius:5px;
  background-color: var(--color-bg);
  box-shadow: var(--box-shadow);
  transform: translate(-50%, -50%);
  animation: fadeUpCenterAni .3s .1s ease both;
  &.under {
    animation: fadeDownCenterAni .3s ease both;
  }
}
.modal-cont{
  flex-grow:1;
  position:relative;
}
.btn-close {
  display:flex;
  justify-content:center;
  align-items:cetner;
  position:absolute;
  top:10px;
  right:10px;
  .icon{ 
    width:20px;
    height:20px;
    transition: var(--transition-transform);
  }
  &:hover, &:focus {
    .icon{
      transform: rotate(90deg);
    }
  }
}
.timer-bar{
  display:block;
  position:absolute;
  bottom:0;
  left:0;
  width:100%;
  height:2px;
  background-color: var(--color-point);
  animation: timerbarAni ${({$autoTime})=> $autoTime}s linear both;
  transform-origin: left center;
}
@keyframes timerbarAni {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.dimmed {
  position: absolute;
  z-index:101;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
  &.overlapping {
    opacity:0;
    background:none;
  }
  animation: fadeInAni .3s ease both;
}
${media.mob}{
  .modal-inner{
    width:calc(100% - 30px);
    max-width:100%;
    outline:0;
  }
}
`;