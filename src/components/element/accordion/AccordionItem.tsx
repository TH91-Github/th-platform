import { memo, useEffect, useRef } from 'react';
import type { AccdionItemTitlePropsType } from './Accordion';
import styles from './AccordionItem.module.scss';
import { cn } from '@/utils/common';
import { ArrowOpen } from '@/components/common/ui/ArrowOpen';

// 🔹 아코디언 개별 Item
// 🔺 개선 필요한 컴포넌트 
interface AccordionItemPropsType {
  heading: AccdionItemTitlePropsType; // acc tit (버튼 or span)
  content?: React.ReactNode;  // 하위 목록이 있는경우 
  isActive: boolean; // 현재 item 활성 여부 
  smoothAni?: boolean, // 부드럽게 열리고 닫히는지 설정
  accOpt: {
    titFull?: boolean,
    openIcon?: 'arrow' | 'none';
  };
  onChange: () => void;
}

const AccordionItem = ({
  heading,
  content,
  isActive,
  accOpt,
  smoothAni,
  onChange,
}: AccordionItemPropsType) => {
  const { btnTit, jsx, className } = heading;
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const CLOSE_SPEED = 0.5;
  const CLOSE_DELAY = CLOSE_SPEED * 1000 + 500;
  const RESIZE_DEBOUNCE = 300;

  const handleClick = () => {
    onChange();
  };

  const getFullHeight = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);
    const marginTop = parseFloat(computedStyle.marginTop);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    return rect.height + marginTop + marginBottom;
  };

  const updateHeight = () => {
    if (!smoothAni || !isActive) return;

    const contentEl = contentRef.current;
    const innerEl = innerRef.current;
    if (!contentEl || !innerEl) return;

    const totalH = getFullHeight(innerEl);
    contentEl.style.height = totalH + 'px';
  };

  const resetStyle = () => {
    const contentEl = contentRef.current;
    contentEl?.removeAttribute('style' );
  }
  useEffect(() => { // smoothAni 옵션
    if (!smoothAni) {
      resetStyle()
      return 
    };
    const contentEl = contentRef.current;
    const innerEl = innerRef.current;
    if (!contentEl || !innerEl) return;
    contentEl.style.display = 'block';

    if (isActive) {
      const totalH = getFullHeight(innerEl);
      contentEl.style.height = totalH + 'px';
      if (animationTimer.current) {
        clearTimeout(animationTimer.current);
      }
      animationTimer.current = setTimeout(() => {
      }, (CLOSE_DELAY));
    } else {
      const height = getFullHeight(innerEl);
      contentEl.style.height = height + 'px';
      requestAnimationFrame(() => {
        contentEl.style.height = '0px';
      });
      if (animationTimer.current) {
        clearTimeout(animationTimer.current);
      }
      animationTimer.current = setTimeout(() => {
        contentEl.style.display = 'none';
      }, (CLOSE_DELAY));
    }
  }, [isActive, smoothAni]);

  useEffect(() => { // resize - 높이 재지정
    if (!smoothAni) {
      resetStyle()
      return
    };

    const handleResize = () => {
      if (resizeTimer.current) {
        clearTimeout(resizeTimer.current);
      }
      resizeTimer.current = setTimeout(() => {
        updateHeight();
      }, RESIZE_DEBOUNCE);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimer.current) {
        clearTimeout(resizeTimer.current);
      }
    };
  }, [smoothAni, isActive]);

  return (
    <li
      className={cn(
        styles.accItem,
        isActive && styles.open,
        content !== null && styles[`${accOpt.openIcon}`], // head button 화살표
        accOpt.titFull && styles.full,
        smoothAni && styles.smooth,
        className,
      )}
    >
      {content
        ? <>
          <div className={styles.accHead}>
            <button
              type="button"
              className={cn(styles.accBtn)}
              title={`${btnTit} ${isActive ? '닫기' : '더 보기'}`}
              onClick={handleClick}
            >
              {jsx ? jsx : btnTit}
              <span className="blind">{isActive ? '닫기' : '열기'}</span>
              <ArrowOpen open={isActive} />
            </button>

          </div>
          <div
            ref={contentRef}
            className={styles.accContent}
          >
            <div
              ref={innerRef}
              className={styles.accInner}
            >
              {content}
            </div>
          </div>
        </>
        : (
          // 하위 메뉴가 없는 경우
          <div className={styles.accHead}>
            <span className={cn(styles.accTit)}>
              {jsx ? jsx : btnTit}
            </span>
          </div>
        )
      }
    </li>
  );
};

export const MemoAccordionItem = memo(AccordionItem, (prevProps, nextProps) => {
  return (
    prevProps.isActive === nextProps.isActive
  );
});