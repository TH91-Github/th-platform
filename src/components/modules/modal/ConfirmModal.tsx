import { Btn } from "@/components/element/button/Btn";
import { Modal } from "@/components/element/modal/Modal";
import { cn } from "@/utils/common";
import styles from './ConfirmModal.module.scss';

// 🔹 확인/취소 modal
interface ConfirmModalPropsType {
  children?:React.ReactNode,
  className?: string,
  align?: 'left' | 'right'
  $width?: number,
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  children, className, 
  align, $width,
  onConfirm, onCancel
}: ConfirmModalPropsType) =>{

  return(
    <Modal
      className={className}
      $width={$width}
      onClose={onCancel}
    >
      <div className={cn(styles.confirmModal, align && styles[align])}>
        <div className={styles.inner}>
          {children}
        </div>
        <div className={styles.btnWrap}>
          <Btn bType="primary" onClick={onConfirm}>
            <span>확인</span>
          </Btn>
          <Btn bType="gray" reverse={true} onClick={onCancel}>
            <span>취소</span>
          </Btn>
        </div>
      </div>
      
    </Modal>
  )
}