import { useEffect, useRef, useState } from 'react';
import styles from './Breadcrumb.module.scss';
import { cn } from '@/utils/common';
import { IconArrowRight, IconEllipsis } from '@/assets/icon';

// 🔹 Breadcrumb(브레드크럼) 현재 위치 Nav
interface BreadcrumbPropsType {
  data? : string[],
}
export const Breadcrumb = ({data = ['Home']}:BreadcrumbPropsType) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const renderBreadcrumb = () => {
    if (data.length < 5) {
      // 4개 이하면 모두 표시
      return data.map((item, idx) => (
        <div key={idx} className={styles.breadcrumbItem}>
          {idx > 0 && <span className={styles.gapArrow}><IconArrowRight /></span>}
          <span 
            className={cn(styles.breadcrumbBtn, (data.length -1) === idx && styles.active)}
          >
            <span>{item}</span>
          </span>
        </div>
      ));
    } else {
      // 5개 이상이면 첫번째, ..., 마지막 2개 표시
      const hiddenItems = data.slice(1, data.length - 2);
      return (
        <>
          {/* 첫번째 항목 */}
          <div className={styles.breadcrumbItem}>
            <span className={styles.breadcrumbBtn}>{data[0]}</span>
          </div>
          {/* 생략된 항목들 (드롭다운) */}
          <div ref={dropdownRef} className={cn(styles.breadcrumbItem,styles.dropdownContainer)}>
            <span className={styles.gapArrow}>
              <span className={styles.gapArrow}><IconArrowRight /></span>
            </span>
            <div 
              className={styles.dropdownBtn}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className={styles.icon}><IconEllipsis /></span>
            </div>
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                {hiddenItems.map((item, index) => (
                  <div key={index} className={styles.dropdownItem}>
                    <span className={styles.breadcrumbBtn}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* 마지막 2개 항목 */}
          <div className={styles.breadcrumbItem}>
            <span className={styles.gapArrow}><IconArrowRight /></span>
            <span className={styles.breadcrumbBtn}>{data[data.length - 2]}</span>
          </div>
          <div className={styles.breadcrumbItem}>
            <span className={styles.gapArrow}><IconArrowRight /></span>
            <span 
              className={cn(styles.breadcrumbBtn, styles.active)}
            >
              <span>{data[data.length - 1]}</span>
            </span>
          </div>
        </>
      );
    }
  };

  return (
    <div className={styles.breadcrumb}>
      {renderBreadcrumb()}
    </div>
  )
}