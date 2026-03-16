import { Outlet } from 'react-router-dom';
import styles from './HubPage.module.scss';
import { HubMenu } from '@/components/pages/hub/HubMenu';
import { Modal } from '@/components/element/modal/Modal';

export const HubPage = () => {
  
  const onClose = () => {

  }
  return ( 
    <div className={styles.hub}>
      <Modal onClose={onClose}>
        <div>
          "현재 개발 중입니다."<br />
          멋진 결과물로 찾아뵙겠습니다.<br />
          🙇‍♂️
        </div>
      </Modal>
      {/* hub side */}
      <div className={styles.side}>
        <div className={styles.sideInner}>
          <HubMenu />
        </div>
      </div>
      {/* hub cont */}
      <div className={styles.cont}>
        <Outlet />
      </div>
    </div>
  )
}