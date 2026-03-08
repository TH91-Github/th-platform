
import { HubCalendar } from '@/components/pages/hub/main/HubCalendar';
import { HubContLists } from '@/components/pages/hub/main/HubContLists';
import { HubMainHeading } from '@/components/pages/hub/main/HubMainHeading';
import styles from './HubMainPage.module.scss';

// 🔹 hub
export const HubMainPage = () => {

  return (
    <div className={styles.hubMain}>
      <HubMainHeading />
      <div className={styles.contWrap}>
        {/* 리스트 */}
        <div className={styles.cont}>
          <HubContLists />
        </div>
        {/* 달력 & 메모 할일 등*/}
        <div className={styles.subSide}>
          <HubCalendar />
        </div>
      </div>
    </div>
  )
}