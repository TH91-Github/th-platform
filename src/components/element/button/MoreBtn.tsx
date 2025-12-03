import { useState } from 'react';
import styles from './MoreBtn.module.scss'
import { cn } from '@/utils/common';

// 🔹 더보기 버튼
interface MoreBtnPropsType {
  uiType?: 'bar' | 'circle'
}
export const MoreBtn = ({uiType}: MoreBtnPropsType) => {
  const [active, setActive] = useState(false);
  const handleMoreClick = () => {
    setActive(!active);
  }
  return (
    <div className={`${styles['more-btn-wrap']} ${cn(uiType ==='circle' && 'circle')}`}>
      <button
        type="button"
        className={`${styles['more-btn']} ${active ? styles.open : ''}`}
        onClick={handleMoreClick}
      >
        <span className="blind">더보기</span>
        <span className={styles.icon}></span>
      </button>
    </div>
  )
}