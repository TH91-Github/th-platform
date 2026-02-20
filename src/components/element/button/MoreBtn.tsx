import { cn } from '@/utils/common';
import styles from './MoreBtn.module.scss';

// 🔹 더보기 버튼
interface MoreBtnPropsType {
  isTransparent?:boolean, // 투명 배경인 경우 white
  isOpen: boolean,
  uiType?: 'bar' | 'circle',
  className?: string,
  onClick: () => void,
}
export const MoreBtn = ({
  isTransparent,
  isOpen, 
  className, 
  uiType='bar', 
  onClick
}: MoreBtnPropsType) => {
  const handleMoreClick = () => {
    onClick?.();
  }
  return (
    <div className={cn(
        styles.moreBtnWrap, 
        className,
        isTransparent && styles.transparent
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