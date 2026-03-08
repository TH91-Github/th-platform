import { cn } from "@/utils/common";
import { createPortal } from "react-dom";
import styles from './Loading.module.scss';

// 🔹 로딩바
interface LoadingAnimationType {
  dimmed?:boolean;
  mode?: 'body' | 'local'; // position : body 기준 / 부모 기준 
  text?: string;
}
export const Loading = ({
  dimmed = true, 
  mode = 'body',
  text = 'Loading...'
 }:LoadingAnimationType) => {

  const loadingContent = (
    <div 
      className={cn(
        styles.loadingWrap, mode ==='body' && styles.isFixed, dimmed && styles.dimmed
      )}
    >
      <div className={styles.loading}>
        <div className={styles.aniBox}>
          {
            Array.from({ length: 4 }, (_, idx) => (
              <span className={styles.cube} key={idx}></span>
            ))
          }
        </div>
        <span className={styles.txt}>{text}</span>
      </div>
    </div>
  )
  // body 
  if (mode === 'body') {
    return typeof window !== 'undefined' ? createPortal(loadingContent, document.body) : null;
  }
  return loadingContent;
}
