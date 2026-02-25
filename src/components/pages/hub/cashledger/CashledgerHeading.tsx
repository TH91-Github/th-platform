import { Btn } from '@/components/element/button/Btn';
import styles from './CashledgerHeading.module.scss';
import { useToggle } from '@/hook/common/useToggle';
import { AddModal } from './AddModal';
import { Modal } from '@/components/element/modal/Modal';
import { TitlePoint } from '@/components/ui/text/TitlePoint';

// 🔹 가계부 상단
export const CashledgerHeading = () =>{
  const [isModal, setIsModal] = useToggle(false);

  const handleAdd = () => {
    setIsModal.on();
  }

  return(
    <div className={styles.headWrap}>
      <div className={styles.heading}>
        <TitlePoint 
          titleTag="h2" 
          title="가계부" 
          $fontSize={24}
        />
        <span>/</span>
        <p className={styles.date}>2026년 2월</p>
      </div>
      <div className={styles.btnWrap}>
        <Btn
          bType="primary"
          onClick={handleAdd}
        >
          <span>내역추가</span>
        </Btn>
      </div>
      { isModal && (
        <Modal
          $width={800}
          $align="left"
          onClose={() => setIsModal.off()}
        >
          {(close) => (
            <AddModal onClose={close} />
          )}
        </Modal>
      )}
    </div>
  )
}