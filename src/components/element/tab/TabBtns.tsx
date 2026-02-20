import { media } from "@/assets/style/emotion/variables";
import { cn } from "@/utils/common";
import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface TabBtnsPropsType {
  tabType?: "base" | "moving";
  isAll?: boolean | "ko" | "en";
  data: string[];
  activeTab?: string;
  changeEvent?: (val: string) => void;
}

interface MovingStyleType {
  left: number;
  width: number;
  height: number;
}

export const TabBtns = ({
  tabType = 'base',
  isAll = true,
  data,
  activeTab,
  changeEvent
}: TabBtnsPropsType) => {
  const tabBtnWrapRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(isAll ? -1 : 0);
  const [movingStyle, setMovingStyle] = useState<MovingStyleType>({ left: 0, width: 0, height: 0 });

  const defaultLabel = isAll === 'en' ? 'All' : '전체';

  // 초기 activeTab 설정
  useEffect(() => {
    if (!activeTab || data.length === 0) return;

    const foundIndex = data.indexOf(activeTab);
    if (foundIndex >= 0) {
      setActiveIndex(foundIndex);
    }
  }, [activeTab, data]);

  // Moving - active 업데이트
  const updateMovingStyle = useCallback((targetEl?: HTMLElement) => {
    if (tabType !== 'moving' || !tabBtnWrapRef.current) return;

    const targetBtn = targetEl || (() => {
      const buttons = tabBtnWrapRef.current!.querySelectorAll('.tab button');
      const targetIdx = isAll && activeIndex === -1 ? 0 : isAll ? activeIndex + 1 : activeIndex;
      return buttons[targetIdx] as HTMLElement;
    })();

    if (!targetBtn) return;

    const { left, width, height } = targetBtn.getBoundingClientRect();
    const parentLeft = tabBtnWrapRef.current.getBoundingClientRect().left;

    setMovingStyle({
      left: left - parentLeft,
      width: Math.round(width),
      height: Math.round(height),
    });
  }, [tabType, activeIndex, isAll]);

   const handleTabClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, value: string, index: number) => {
    if (tabType === 'moving') {
      updateMovingStyle(e.currentTarget);
    }
    setActiveIndex(index);
    changeEvent?.(value);
  }, [tabType, updateMovingStyle, changeEvent]);

  useEffect(() => {
    if (tabType !== 'moving') return;
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        updateMovingStyle();
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [tabType, activeIndex, updateMovingStyle]);

  return (
    <StyleWrap
      ref={tabBtnWrapRef}
      className={cn('tab-wrap', tabType)}
      $left={movingStyle.left}
      $width={movingStyle.width}
      $height={movingStyle.height}
    >
      <ul>
        {isAll && (
          <li className={cn('tab', activeIndex === -1 && 'active')}>
            <button
              type="button"
              title={defaultLabel}
              onClick={(e) => handleTabClick(e, defaultLabel, -1)}
            >
              <span>{defaultLabel}</span>
            </button>
          </li>
        )}
        {data.map((item, idx) => (
          <li key={idx} className={cn('tab', activeIndex === idx && 'active')}>
            <button
              type="button"
              title={item}
              onClick={(e) => handleTabClick(e, item, idx)}
            >
              <span>{item}</span>
            </button>
          </li>
        ))}
      </ul>
    </StyleWrap>
  );
};

interface StyleWrapProps {
  $left?: number;
  $width?: number;
  $height?: number;
}

const StyleWrap = styled.div<StyleWrapProps>`
  position: relative;
  & > ul {
    display: flex;
    gap: 5px;
  }
  .tab {
    & > button {
      min-width: 40px;
      height: 40px;
      padding: 5px 10px;
      border: 1px solid transparent;
      border-radius: 5px;
      white-space: nowrap;
      transition: var(--transition-border), var(--transition-bg), var(--transition-color);
      &:hover, &:focus {
        color: var(--color-point);
      }
    }
  }
  &.base .tab {
    &.active > button {
      background-color: var(--color-point);
      color: var(--color-point-text);
    }
  }
  &.moving {
    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      min-width: 40px;
      min-height: 20px;
      width: ${({ $width }) => $width}px;
      height: ${({ $height }) => $height}px;
      border-radius: 4px;
      background-color: var(--color-point);
      transition: var(--transition-transform);
      transform: translate(${({ $left }) => $left}px, -50%);
      box-shadow: rgba(127, 127, 127, 0.1) 0.7px 2px 2px;
      content: '';
    }
    .tab { 
      & > button {
        position: relative;
        z-index: 2;
      }
      &.active {
        & > button {
          transition: var(--transition-color);
          color: var(--color-point-text);
        }
      }
    }
  }
  
  ${media.mob} {
    overflow-x: auto;
    padding-bottom: 5px;
    & > ul {
      width: max-content;
    }
  }
`;