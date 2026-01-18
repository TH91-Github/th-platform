import { cn } from '@/utils/common';
import styles from './MoreBtn.module.scss';

// 🔹 더보기 버튼
interface MoreBtnPropsType {
  isOpen: boolean,
  uiType?: 'bar' | 'circle',
  className?: string,
  onClick: () => void,
}
export const MoreBtn = ({isOpen, className, uiType='bar', onClick}: MoreBtnPropsType) => {
  const handleMoreClick = () => {
    onClick?.();
  }
  return (
    <div className={cn(
        styles.moreBtnWrap, 
        className,
      )}
    >
      <button
        type="button"
        className={cn(
          styles.btn,
          styles[uiType],
          isOpen && styles.open
        )}
        onClick={handleMoreClick}
      >
        <span className="blind">더보기</span>
        <span className={styles.icon}></span>
      </button>
    </div>
  )
}