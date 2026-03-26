import { IconFolderEmpty } from '@/assets/icon';
import { cn } from '@/utils/common';
import { useCallback, useId, useState } from 'react';
import { MemoAccordionItem } from './AccordionItem';
import styles from './Accordion.module.scss';

export interface AccordionItemHeadingProps {
  title?: string;
  btnTit?: string;
  jsx?: React.ReactNode;
  className?: string;
}

export interface AccordionRenderResult {
  heading: AccordionItemHeadingProps;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionRenderContext {
  index: number;
  isActive: boolean;
  activeIndexes: number[];
  toggle: () => void;
}

interface AccordionProps<T> {
  data: T[];
  mode?: 'single' | 'multiple';
  className?: string;
  initActive?: number[];
  defaultActive?: number[];
  activeIndexes?: number[];
  smoothAni?: boolean;
  itemKey?: (item: T, index: number) => React.Key;
  onActiveChange?: (indexes: number[]) => void;
  accOpt?: {
    titFull?: boolean;
    openIcon?: 'arrow' | 'none';
  };
  renderItem?: (item: T, context: AccordionRenderContext) => AccordionRenderResult;
  children?: (item: T, index: number, activeIndexes: number[]) => AccordionRenderResult;
}

const normalizeIndexes = (indexes: number[], mode: 'single' | 'multiple') => {
  if (mode === 'single') {
    return indexes.length > 0 ? [indexes[0]] : [];
  }
  return [...new Set(indexes)];
};

const isSameIndexes = (prev: number[], next: number[]) => (
  prev.length === next.length && prev.every((item, index) => item === next[index])
);

const toggleIndexes = (current: number[], index: number, mode: 'single' | 'multiple') => {
  const isActive = current.includes(index);

  if (mode === 'single') {
    return isActive ? [] : [index];
  }

  return isActive
    ? current.filter((item) => item !== index)
    : [...current, index];
};

// 🔹 아코디언 메뉴
export const Accordion = <T,>({
  data,
  mode = 'multiple',
  className,
  initActive = [],
  defaultActive,
  activeIndexes: controlledActiveIndexes,
  smoothAni = false,
  itemKey,
  onActiveChange,
  accOpt = { titFull: true, openIcon: 'arrow' },
  renderItem,
  children,
}: AccordionProps<T>) => {
  const accordionId = useId();
  const isControlled = controlledActiveIndexes !== undefined;
  const initialActiveIndexes = normalizeIndexes(defaultActive ?? initActive, mode);
  const [uncontrolledActiveIndexes, setUncontrolledActiveIndexes] = useState<number[]>(initialActiveIndexes);
  const activeIndexes = isControlled
    ? normalizeIndexes(controlledActiveIndexes, mode)
    : uncontrolledActiveIndexes;

  const handleToggle = useCallback((index: number) => {
    const nextIndexes = toggleIndexes(activeIndexes, index, mode);

    if (!isControlled && !isSameIndexes(uncontrolledActiveIndexes, nextIndexes)) {
      setUncontrolledActiveIndexes(nextIndexes);
    }

    onActiveChange?.(nextIndexes);
  }, [activeIndexes, isControlled, mode, onActiveChange, uncontrolledActiveIndexes]);

  const resolveItem = useCallback(
    (item: T, index: number) => {
      const isActive = activeIndexes.includes(index);
      const toggle = () => handleToggle(index);

      if (renderItem) {
        return renderItem(item, {
          index,
          isActive,
          activeIndexes,
          toggle,
        });
      }

      if (children) {
        return children(item, index, activeIndexes);
      }

      throw new Error('Accordion requires renderItem or children.');
    },
    [activeIndexes, children, handleToggle, renderItem]
  );

  return (
    <div className={cn(styles.accordionWrap, className)}>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => {
            const resolved = resolveItem(item, index);
            const isActive = activeIndexes.includes(index);

            return (
              <MemoAccordionItem
                key={itemKey ? itemKey(item, index) : index}
                itemId={`${accordionId}-${index}`}
                heading={resolved.heading}
                content={resolved.content}
                disabled={resolved.disabled}
                isActive={isActive}
                onChange={() => handleToggle(index)}
                smoothAni={smoothAni}
                accOpt={accOpt}
              />
            );
          })}
        </ul>
      ) : (
        <div className={styles.empty}>
          <i className={styles.icon}><IconFolderEmpty /></i>
          <p className="tit"> 목록이 없습니다.</p>
        </div>
      )}
    </div>
  );
};
