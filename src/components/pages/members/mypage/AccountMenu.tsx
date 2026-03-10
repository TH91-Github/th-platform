import { Btn } from "@/components/element/button/Btn";
import { Modal } from "@/components/element/modal/Modal";
import { IconMatch } from "@/components/ui/icon/IconMatch";
import { InnerHTML } from "@/components/ui/text/InnerHTML";
import { auth } from "@/firebase";
import { useAuthAction } from "@/hook/auth/useAuthAction";
import { cn } from "@/utils/common";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './MyPageDetail.module.scss';

export const AccountMenu = () => {
  const navigate = useNavigate();
  const { removeAccount } = useAuthAction();
  const [alertMessage, setAlertMessage] = useState<{
      type: 'logout' | 'remove',
      tit: string,
      desc?: string,
    } | null>(null);

  const userReset = async () => {
    await signOut(auth);
    navigate('/')
  }
  const handleLogout = () => {
    setAlertMessage({
      type: 'logout',
      tit: `로그아웃 할까요?`,
    });
  }
  const handleRemove = () => {
    setAlertMessage({
      type: 'remove',
      tit: `정말로 계정 삭제할까요?`,
      desc: '삭제 시 되돌릴 수 없어요. 😢'
    });
  }

  const handlePopupClose = () => {
    // navigate('/');
    setAlertMessage(null);
  }

  const handleConfirm = () => { 
    if (!alertMessage) return;

    if (alertMessage.type === 'logout') {
      userReset();
    }

    if (alertMessage.type === 'remove') {
      removeAccount();
    }

    setAlertMessage(null);
  }

  return( 
    <div className={styles.accountWrapp}>
      <div className={styles.sectionItem}>
        <div className={styles.section}>
          <button
            type="button"
            className={styles.headingBtn}
            onClick={handleLogout}
          >
            <i><IconMatch id={'icon-unlock'} /></i>
            <span className={styles.tit}>로그아웃</span>
          </button>
        </div>
        <div className={styles.section}>
          <button 
            type="button"
            onClick={handleRemove}
            className={cn(styles.headingBtn, styles.red)}
          >
            <i><IconMatch id={'icon-trash'} /></i>
            <span className={styles.tit}>삭제</span>
          </button>
        </div>
      </div>
      { alertMessage && (
        <Modal onClose={handlePopupClose}>
          <div className={styles.alert}>
            <p className={styles.tit}>
              <InnerHTML text={alertMessage.tit}/>
            </p>
            <p className={styles.desc}>
              {alertMessage?.desc}
            </p>
            <div className={styles.btnWrap}>
              <Btn
                bType="primary"
                onClick={handleConfirm}
              >
                <span>확인</span>
              </Btn>
              <Btn
                bType="gray"
                onClick={handlePopupClose}
              >
                <span>취소</span>
              </Btn>
            </div>
          </div>          
        </Modal>
      )}
    </div>
  )
}