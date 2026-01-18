import { Btn } from '@/components/element/button/Btn';
import styles from './HubMain.module.scss';
import { IconFolderAdd } from '@/assets/icon';
import { HubCategory } from './HubCategory';
import { HubContLists } from './HubContLists';
import { HubCalendar } from './HubCalendar';

export const HubMain = () => {

  const handleAddClick = () => {
    console.log('방 만들기 클릭');
  }
  return (
    <div className={styles.hubMain}>
      <div className={styles.heading}>
        <h2 className={styles.title}>환영합니다!</h2>
        <p className={styles.desc}>원하는 주제로 공간을 만들어서 함께 공유해요. 😁</p>
        <div className={styles.btnWrap}>
          <Btn
            bType="primary"
            onClick={handleAddClick}
            className={styles.btnAdd}
          >
           <i><IconFolderAdd /></i>
           <span>방 만들기</span>
          </Btn>
        </div>
      </div>
       {/* 카테고리 리스트 */}
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