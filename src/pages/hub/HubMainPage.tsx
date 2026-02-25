import { Btn } from '@/components/element/button/Btn';
import { IconFolderAdd } from '@/assets/icon';
import styles from './HubMainPage.module.scss';
import { HubCategory } from '@/components/pages/hub/HubCategory';
import { HubContLists } from '@/components/pages/hub/HubContLists';
import { HubCalendar } from '@/components/pages/hub/HubCalendar';
import { HubCreate } from '@/components/pages/hub/HubCreate';

export const HubMainPage = () => {
  const handleAddClick = () => {

  }
  return (
    <div className={styles.hubMain}>
      <div className={styles.heading}>
        <h2 className={styles.title}>환영합니다!</h2>
        <p className={styles.desc}>원하는 주제로 공간을 만들어서 함께 공유해요. 😁</p>
        <div className={styles.btnWrap}>
          <HubCreate title="방 만들기" />
        </div>
      </div>
       {/* 카테고리 리스트 - userRooms 데이터 */}
      <div className={styles.categoryWrap}>
        <HubCategory />
      </div>
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