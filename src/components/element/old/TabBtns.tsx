import { colors, media } from "assets/style/variables";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { cn } from "utils/common";

interface TabBtnsPropsType {
  tabType?:'basics'|'moving', // 기본 
  isAll? : boolean | 'ko' | 'en';
  data: string[];
  activeTab?:string;
  onBgColor?:string;
  changeEvent?: (val: string) => void;
}
export const TabBtns = ({
  tabType = 'basics',
  isAll = true,
  data,
  activeTab,
  onBgColor,
  changeEvent
}:TabBtnsPropsType) => {
  const tabBtnWrap = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(isAll ? -1 : 0);
  const [isInitialized, setIsInitialized] = useState(false);
  const defaultVal = useMemo(() => (
    isAll === 'en' ? 'All' : '전체'
  ), [isAll]);
  const [movingStyle, setMovingStyle] = useState(
    tabType === 'moving' 
      ? { left: 0, width: 0, height: 0 } 
      : { left: 5, width: 16, height: 16 }
  );

  const updateMovingStyle = useCallback((targetEl?: HTMLElement) => {
    if (tabType !== 'moving' || !tabBtnWrap.current) return;
    
    let targetBtn: Element | null = null;
    if (targetEl) {
      targetBtn = targetEl;
    } else {
      // 초기화 또는 상태 변경에서 호출된 경우
      const allButtons = tabBtnWrap.current.querySelectorAll('.tab button');
      // isActive가 -1이면 첫 번째 버튼(전체)
      let targetIndex = isActive;
      if (isAll) {
        targetIndex = isActive === -1 ? 0 : isActive + 1;
      }
      targetBtn = allButtons[targetIndex] || null;
    }

    if (targetBtn && tabBtnWrap.current) {
      const { left, width, height } = targetBtn.getBoundingClientRect();
      const parentLeft = tabBtnWrap.current.getBoundingClientRect().left;
      setMovingStyle({
        left: left - parentLeft,
        width: Math.round(width),
        height: Math.round(height),
      });
    }
  }, [tabType, isActive, isAll]);

  const handleTabClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, val: string, idx: number) => {
    if (tabType === 'moving') {
      updateMovingStyle(e.currentTarget);
    }
    setIsActive(idx);
    changeEvent && changeEvent(val);
  }, [tabType, updateMovingStyle, changeEvent]);

  // 초기 선택 Tab 설정 (activeTab이 있는 경우 우선 처리)
  useEffect(() => {
    if (activeTab && data.length > 0) {
      const activeNum = data.indexOf(activeTab);
      if (activeNum >= 0) {
        setIsActive(activeNum);
        setIsInitialized(true);
        return;
      }
    }
    
    // activeTab이 없고 초기화되지 않은 경우에만 기본값 설정
    if (!activeTab && !isInitialized && isAll && changeEvent) {
      setIsActive(-1);
      changeEvent(defaultVal);
      setIsInitialized(true);
    } else if (!activeTab && !isInitialized) {
      setIsInitialized(true);
    }
  }, [activeTab, data, isAll, changeEvent, defaultVal, isInitialized]);

  // moving 스타일
  useEffect(() => {
    if (tabType === 'moving' && tabBtnWrap.current && isInitialized) {
      // requestAnimationFrame을 사용하여 렌더링 완료 후 실행
      const updateStyle = () => {
        requestAnimationFrame(() => {
          updateMovingStyle();
        });
      };
      
      updateStyle();
    }
  }, [tabType, updateMovingStyle, isInitialized]);

  return (
    <StyleWrap 
      ref={tabBtnWrap}
      className={cn('tab-btn-wrap', tabType)}
      $left={movingStyle.left}
      $width={movingStyle.width}
      $height={movingStyle.height}
      $onBgColor={onBgColor || colors.mSlateBlue}
    >
      <ul>
        {isAll && (
          <li className={cn('tab', isActive === -1 && 'active')}>
            <button 
              type="button" 
              onClick={(e) => handleTabClick(e, defaultVal, -1)}
            >
              <span>{defaultVal}</span>
            </button>
          </li>
        )}
        {data.map((item, idx) => (
          <li key={idx} className={cn('tab', isActive === idx && 'active')}>
            <button
              type="button"
              onClick={(e) => handleTabClick(e, item, idx)}>
                <span>{item}</span>
            </button>
          </li>
        ))}
      </ul>
    </StyleWrap>
  )
}
interface StyleWrapType {
  $left?:number,
  $width?:number,
  $height?:number,
  $activeColor?:string,
  $onTextColor?:string, // active text
  $onBgColor:string; // active bg
}

const StyleWrap = styled.div<StyleWrapType>`
  position:relative;
  & > ul {
    display:flex;
    gap:5px;
  }
  .tab {
    & > button {
      min-width:40px;
      height:40px;
      padding:5px 10px;
      border:1px solid transparent;
      border-radius: 5px;
      white-space: nowrap;
    }
  }
  &.basics{
    .tab {
      & > button {
        min-width:40px;
        height:40px;
        padding:5px 10px;
        border:1px solid transparent;
        border-radius: 5px;
        transition: border-color var(--transition), background-color var(--transition), color var(--transition);
      }
      &.active {
        & > button {
          background: ${({$onBgColor}) => $onBgColor};
          color: #fff;
        }
      }
    }
  }
  &.moving {
    &:before {
      position:absolute;
      top:50%;
      left:0;
      min-width:40px;
      min-height:20px;
      width:${({$width}) => $width}px;
      height:${({$height}) => $height}px;
      border-radius:4px;
      background: ${({$onBgColor}) => $onBgColor};
      transition: transform var(--transition);
      transform:translate(${({$left}) => $left}px, -50%);
      box-shadow: rgba(127,127,127, 0.1) 0.7px 2px 2px;
      content:'';
    }
    .tab {
      & > button {
        position:relative;
        z-index:2;
      }
      &.active {
        & > button {
          transition: color var(--transition);
          color: #fff;
        }
      }
    }
  }
  ${media.mo}{
    overflow-x:auto;
    padding-bottom:5px;
    & > ul {
      width: max-content;
    }
  }
`;