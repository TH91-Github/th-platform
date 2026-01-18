import { Outlet } from 'react-router-dom';
import styles from './HubPage.module.scss';
import { HubMenu } from '@/components/pages/hub/HubMenu';

export const HubPage = () => {
  return ( 
    <div className={styles.hub}>
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