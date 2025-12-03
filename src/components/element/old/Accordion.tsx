import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { cn } from "utils/common";
interface AccdionItemTitlePropsType {
  btnTit:string;
  jsx: React.ReactNode;
}
interface AccordionProps<T> {
  data: T[];
  mode?: "single" | "multiple"; // 하나만 열기 or 각 open
  className?: string;
  initActive?: number[]; // 초기 활성화 필요한 목록
  smoothAni?: boolean; // 부드럽게
  accOpt?:{
    openIcon?:'arrow';
  }
  children: (accItem: T, accIdx:number) => {
    heading: AccdionItemTitlePropsType;
    content?: React.ReactNode;
  };
}

export const Accordion = <T,>({
  data,
  mode = "multiple", 
  className,
  initActive = [],
  smoothAni = false,
  accOpt = { openIcon: 'arrow' },
  children,
}: AccordionProps<T>) => {
  const [isActives, setIsActives] = useState<number[]>(
    mode === 'single' ? (initActive.length > 0 ? [initActive[0]] : []) : [...initActive]
  );
  const handleChange = useCallback((index: number) => {
    setIsActives(prevState => {
      const isIndexActive = prevState.includes(index);
      if (mode === 'single') {
        return isIndexActive ? [] : [index];  // single 모드에서는 하나만 선택
      }
      return isIndexActive 
        ? prevState.filter(item => item !== index) // 삭제
        : [...prevState, index];  // 추가
    });
  }, [setIsActives, mode]);
  return (
    <div 
      className={cn(
        'accordion-wrap', 
        className && className, 
    )}>
      { data.length > 0 ? (
        <ul>
          {data.map((accItem, accIdx) => {
            const { heading, content } = children(accItem, accIdx);
            return (
              <MemoAccordionItem
                key={accIdx}
                isActive={isActives.includes(accIdx)}
                onChange={() => handleChange(accIdx)}
                heading={heading}
                content={content}
                smoothAni={smoothAni}
                accOpt={accOpt}
              />
            );
          })}
        </ul>
        ) : <div className="acc-empty">목록이 없습니다.</div>
      }
    </div>
  );
};

// 아코디언 item type
interface AccordionItemPropsType {
  heading: AccdionItemTitlePropsType;
  content?: React.ReactNode;
  isActive:boolean;
  smoothAni?:boolean,
  accOpt: {
    openIcon?: 'arrow';
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
  const {btnTit, jsx} = heading;
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const CLOSE_SPEED = 0.5;
  const CLOSE_DELAY = CLOSE_SPEED * 1000 + 1000;

  const handleClick = useCallback(() => {
    onChange();
  }, [onChange]);

  useEffect(()=>{ // smoothAni 옵션
    if(!smoothAni) return

    const contentEl = contentRef.current;
    const innerEl = innerRef.current;
    if (!contentEl || !innerEl) return;
    contentEl.style.display = 'block';

    if(isActive){
      const totalH = innerEl.offsetHeight;
      contentEl.style.height = totalH + 'px';

    }else{
      const height = innerEl.offsetHeight;
      contentEl.style.height = height + "px";
      contentEl.style.height = "0px";

      if (animationTimer.current) {
        clearTimeout(animationTimer.current);
      }
      animationTimer.current = setTimeout(() =>{
        contentEl.style.display = 'none';
      }, (CLOSE_DELAY))
    }
  },[isActive, smoothAni])

  const renderHeading = () => {
    if (content) {
      return (
        <button 
          type="button" 
          className="acc-btn"
          onClick={handleClick}
          title={btnTit}
        >
          {jsx}
          <span className="arrow-icon"></span>
          <span className="blind">{isActive ? '닫기' : '열기'}</span>
        </button>
      );
    }
    return <span className="acc-tit">{jsx}</span>;
  };

  return (
    <StyleItem 
      className={cn(
        'acc-item',
        isActive && 'open',
        content !== null && accOpt.openIcon, // head button 화살표
        smoothAni && 'smooth'
      )}
      $isIcon={accOpt.openIcon ? true : false}
      $sepped={CLOSE_SPEED}
    >
      <div className="acc-head">
        {renderHeading()}
      </div>
      { content && (
        <div 
          ref={contentRef}
          className="acc-content"
        >
          <div 
            ref={innerRef}
            className="acc-inner"
          >
            {content}
          </div>
        </div>
      )}
    </StyleItem>
  );
};

const MemoAccordionItem = memo(AccordionItem, (prevProps, nextProps) => {
  return(
    prevProps.isActive === nextProps.isActive
  )
});

interface StyleItemType {
  $isIcon:boolean;
  $sepped: number;
}
const StyleItem = styled.li<StyleItemType>`
position:relative;
.acc-btn{
  width:100%;
  text-align:left;
}
.acc-btn, .acc-tit {
  display:inline-block;
  position:relative;
  padding:10px 15px 10px 0;
  line-height:1;
  svg { 
    max-width:30px;
    max-height:30px;
  }
}
${({$isIcon}) => $isIcon && `
  .acc-tit {
    padding:10px;
  }
`}
&.open{
  .acc-content{
    display:block !important;
  }
}
&.arrow{
  .acc-btn{
    padding-right:30px;
  }
  &.open {
    .acc-btn{ 
      .arrow-icon{
          &::before{
          transform:rotate(-45deg);
        }
        &::after{
          transform:rotate(45deg);
        }
      }
    }
  }
  .arrow-icon{
    display:block;
    position:absolute;
    top:50%;
    right:10px;
    width:10px;
    height:10px;
    transform:translateY(-50%);
    &::before, &::after{
      position:absolute;
      top:0;
      right:6px;
      width:100%; 
      height:2px;
      border-radius:30px; 
      background:#000; 
      transform:rotate(-135deg);
      transition:transform .3s ease-in-out;
      content:'';
    }
    &::after{
      right:0;
      transform:rotate(135deg);
    }
  }
}
&:not(.smooth) {
  .acc-content{
    display:none;
  }
}
&.smooth {
  .acc-content{
    overflow:hidden;
    position:relative;
    height: 0;
    transition: height ${({$sepped}) => $sepped}s ease-in-out;
  }
  .acc-inner{
    position:absolute;
    top:0;
    width:100%;
  }
}
`;

/*
  ※ 참고 설명
  ✅ 아래와 같이 타입 전달 가능
  <Accordion<Data1Type> data={GUIDE_ITEMS}>
    {(item) => ({
      accTit: (
        <div className="flex items-center gap-2">
          <span>{item.title}</span>
        </div>
      ),
      content: <div>{item.path}</div>,
    })}
  </Accordion>
  
  
  children: (item: T) => ...	각 item을 받아서 동적으로 JSX를 렌더링
  <Accordion>{(item) => <div>{item.title}</div>}</Accordion>

  tit, content 필수 전달
*/