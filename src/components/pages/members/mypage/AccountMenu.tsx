import { useState } from "react";
import { Modal } from "@/components/element/modal/Modal";
import { InnerHTML } from "@/components/ui/text/InnerHTML";
import styles from './AccountMenu.module.scss';
import { Btn } from "@/components/element/button/Btn";
import { useNavigate } from "react-router-dom";
import { actionUserLogout } from "@/store/redux/sliceActions";
import { useAppDispatch } from "@/hook/store/useRedux";
import { signOut } from "firebase/auth";
import { clearSession } from "@/utils/auth/session";
import { auth } from "@/firebase";

export const AccountMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState<{
      type: 'logout' | 'remove',
      tit: string,
      desc?: string,
    } | null>(null);

  const userReset = async () => {
    dispatch(actionUserLogout());
    await signOut(auth);
    clearSession();
    navigate('/')
  }
  const handleLogout = () => {
    setAlertMessage({
      type: 'logout',
      tit: `로그아웃 하시겠습니까`,
      desc: '삭제 시 되돌릴 수 없습니다'
    });
    // 
  }
  const handleRemove = () => {
    setAlertMessage({
      type: 'logout',
      tit: `정말로 계정 삭제하시겠습니까?`,
      desc: '삭제 시 되돌릴 수 없습니다'
    });
  }

  const handlePopupClose = () => {
    // navigate('/');
    setAlertMessage(null);
  }

  const handleConfirm = () => { 
    if(alertMessage){
      if(alertMessage.type ==='logout') {
        userReset();
      }
      console.log('오한료'+ alertMessage.type)
    }
  }
  return( 
    <div className={styles.accountMenu}>
      <ul>
        <li>
          <button
            type="button"
            onClick={handleLogout}
          >
            <span>로그아웃</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.remove}
            onClick={handleRemove}
          >
            <span>계정 삭제</span>
          </button>
        </li>
      </ul>
      { alertMessage && (
        <Modal onClose={handlePopupClose}>
          <div className={styles.alert}>
            <p className={styles.tit}>
              <InnerHTML text={alertMessage.tit}/>
            </p>
            <p>
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