import { IconOpenView } from '@/assets/icon';
import { Members } from '@/components/pages/hub/members/Members';
import { hubCategoryData, hubTable } from '@/data/hub/hubData';
import { nonUserRoomsData } from '@/data/hub/nonMember';
import { useAuthUser } from '@/hook/auth/useAuthUser';
import { dateFormat } from '@/utils/date/dateFormat';
import { useNavigate } from 'react-router-dom';
import styles from './HubContLists.module.scss';

// 🔹 방 목록 
export const HubContLists = () => {
  const navigate = useNavigate();
  const { data: user } = useAuthUser();
  const roomData = user ? nonUserRoomsData : nonUserRoomsData
  
  const handleRoomOpen = (docId:string, category:string) => {
    navigate(`/hub/${category}/${docId}`);
  }
  const categoryConversion = (categoryId:string) => {
    const findVal = hubCategoryData.find(c => c.id === categoryId);
    return  findVal ? findVal.title : '-';
  }
  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <div className={styles.row}>
          { hubTable.map((headItem) => (
            <div className={styles.cell} key={headItem.id}>
              <span>{headItem.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tbody}>
        { roomData.map((roomItem)=> (
          <div className={styles.row} key={roomItem.id}>
            {/* 공개 여부 visibility */}
            <div className={styles.cell}>
              <span>{roomItem.visibility === 'public' ? '공개':'비공개' }</span>
            </div>
            {/* 제목 title */}
            <div className={styles.cell}>
              <button
                className={styles.roomBtn}
                title="자세히 보기"
                onClick={() => handleRoomOpen(roomItem.id, roomItem.category)}
              >
                <span>{roomItem.title}</span>
                <i><IconOpenView /></i>
              </button>
            </div>
            {/* 구분 category */}
            <div className={styles.cell}>
              <span>{categoryConversion(roomItem.category)}</span>
            </div>
            {/* 개설일 createdAt */}
            <div className={styles.cell}>
              <span className={styles.createdAt}>{dateFormat(roomItem.createdAt,{format:'date',separator:'.'})}</span>
            </div>
            {/* 참여자 members */}
            <div className={styles.cell}>
              <Members data={roomItem.members} />
            </div>
          </div>   
        ))}
      </div>
    </div>
  )
}