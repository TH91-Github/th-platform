import { useCallback, useEffect, useState } from 'react';
import styles from './Accordion.module.scss';
import { cn } from '@/utils/common';
import { MemoAccordionItem } from './AccordionItem';
import { IconFolderEmpty } from '@/assets/icon';

// 🔹 아코디언 메뉴
// 🔺 개선 필요한 컴포넌트 
export interface AccdionItemTitlePropsType {
  btnTit: string;
  jsx?: React.ReactNode; // jsx - 있는경우 btnTit 대신 html 구조 사용
  className?:string;
}
interface AccordionProps<T> {
  data: T[];
  mode?: "single" | "multiple"; // 하나만 열기 or 각 open
  className?: string;
  initActive?: number[]; // 초기 활성화 필요한 목록
  allClose?: boolean,
  smoothAni?: boolean; // 부드럽게
  accOpt?: {
    titFull?: boolean,
    openIcon?: 'arrow' | 'none';
  }
  children: (accItem: T, accIdx: number, actives:number[]) => { // 부모에게 각 item, idx, active 활성 번호
    heading: AccdionItemTitlePropsType;  // 아코디언 타이틀 (버튼)
    content?: React.ReactNode; // 하위 메뉴 (아코디언 내부 컨텐츠)
  };
}
export const Accordion = <T,>({
  data,
  mode = "multiple",
  className,
  initActive = [],
  allClose,
  smoothAni = false,
  accOpt = { titFull: true, openIcon: 'arrow' },
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

  // initActive 변경
  useEffect(() => {
    if(allClose) setIsActives([])
  }, [allClose]);
  
  return (
    <div
      className={cn(
        styles.accordionWrap,
        className,
      )}
    >
      {data.length > 0 ? (
        <ul>
          {data.map((accItem, accIdx) => {
            const { heading, content } = children(accItem, accIdx, isActives);
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
      ) : (
        <div className={cn(styles.empty) }>
          <i className={styles.icon}><IconFolderEmpty /></i>
          <p className="tit"> 목록이 없습니다.</p>
        </div>
      )
      }
    </div>
  );
};
