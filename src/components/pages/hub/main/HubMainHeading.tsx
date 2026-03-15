import { HubCreate } from '../common/HubCreate';
import { HubCategory } from './HubCategory';
import styles from './HubMainHeading.module.scss';

export const HubMainHeading = () => {
  return( 
    <div className={styles.heading}>
      <div className={styles.header}>
        <p>⚠ 현재 개발 중인 페이지입니다. UI만 준비되어 있으며, 기능은 순차적으로 추가될 예정입니다.</p>
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
    </div>
  )
}