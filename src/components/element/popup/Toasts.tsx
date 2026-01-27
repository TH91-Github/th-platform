import { IconCheck } from "@/assets/icon";
import { cn } from "@/utils/common";
import { createPortal } from "react-dom";
import { useToastList } from "@/store/zustand/common/toastStore";
import styles from './Toasts.module.scss';

// 🔹 Toast popup : toastStore 스토어 내 추가/삭제 제어
export const Toasts = () => {
  const toasts = useToastList();
  
  return toasts.length > 0 ? (
    createPortal(
      <div className={cn(styles.toastWrap, 'toast-wrap')}>
        {toasts.map(({ id, visible, message, type }) => (
          <div
            key={id}
            className={cn(styles.toast, styles[type], visible ? styles.show : styles.hide)}
          >
            <span className={styles.mgessage}>
              <span className={styles.icon}><IconCheck /></span>
              <span className={styles.txt}>{message}</span>
            </span>
          </div>
        ))}
      </div>,
      document.body
    )
  ) : null
};
