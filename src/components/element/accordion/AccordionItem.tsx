import { ArrowOpen } from '@/components/common/ui/ArrowOpen';
import { cn } from '@/utils/common';
import { memo } from 'react';
import type { AccordionItemHeadingProps } from './Accordion';
import styles from './AccordionItem.module.scss';

interface AccordionItemPropsType {
  itemId: string;
  heading: AccordionItemHeadingProps;
  content?: React.ReactNode;
  disabled?: boolean;
  isActive: boolean;
  smoothAni?: boolean;
  accOpt: {
    titFull?: boolean;
    openIcon?: 'arrow' | 'none';
  };
  onChange: () => void;
}

const AccordionItem = ({
  itemId,
  heading,
  content,
  disabled = false,
  isActive,
  accOpt,
  smoothAni = false,
  onChange,
}: AccordionItemPropsType) => {
  const { title, btnTit, jsx, className } = heading;
  const hasContent = content !== null && content !== undefined;
  const buttonTitle = title ?? btnTit ?? '';

  return (
    <li
      className={cn(
        styles.accItem,
        isActive && styles.open,
        hasContent && accOpt.openIcon === 'arrow' && styles.arrow,
        accOpt.titFull && styles.full,
        smoothAni && styles.smooth,
        disabled && styles.disabled,
        className,
      )}
    >
      <div className={styles.accHead}>
        {hasContent && !disabled ? (
          <button
            id={`${itemId}-trigger`}
            type="button"
            className={styles.accBtn}
            title={`${buttonTitle} ${isActive ? '닫기' : '더 보기'}`}
            aria-expanded={isActive}
            aria-controls={`${itemId}-panel`}
            onClick={onChange}
          >
            {jsx ?? buttonTitle}
            <span className="blind">{isActive ? '닫기' : '열기'}</span>
            {accOpt.openIcon === 'arrow' && <ArrowOpen open={isActive} />}
          </button>
        ) : (
          <div className={styles.accTit}>
            {jsx ?? buttonTitle}
          </div>
        )}
      </div>

      {hasContent && (
        <div
          id={`${itemId}-panel`}
          className={styles.accContent}
          role="region"
          aria-labelledby={`${itemId}-trigger`}
          aria-hidden={!isActive}
        >
          <div className={styles.accInner}>
            {content}
          </div>
        </div>
      )}
    </li>
  );
};

export const MemoAccordionItem = memo(AccordionItem, (prevProps, nextProps) => (
  prevProps.isActive === nextProps.isActive &&
  prevProps.content === nextProps.content &&
  prevProps.disabled === nextProps.disabled
));
