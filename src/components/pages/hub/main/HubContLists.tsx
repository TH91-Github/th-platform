import { IconOpenView } from '@/assets/icon';
import { Pagination } from '@/components/element/pagination/Pagination';
import { Members } from '@/components/pages/hub/members/Members';
import { Loading } from '@/components/ui/effect/Loading';
import { hubCategoryData, hubTable } from '@/data/hub/hubData';
import { useAuthUser } from '@/hook/auth/useAuthUser';
import { useUserRooms } from '@/hook/hub/useUserRooms';
import { selectUserHub } from '@/store/redux/store';
import { dateFormat } from '@/utils/date/dateFormat';
import { getHubUid } from '@/utils/hun/common';
import { getHubTotal } from '@/utils/hun/hubStats';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './HubContLists.module.scss';

// 🔹 방 목록 
export const HubContLists = () => {
  const navigate = useNavigate();
  const { data: user } = useAuthUser();
  const { totalData, isLoading : stateLoading } = useSelector(selectUserHub);
  const total = getHubTotal(totalData, 'total', 'all');
  const { roomData, fetchMore, isLoading, isFetching} = useUserRooms(getHubUid(user), !user);
  const [page, setPage] = useState(1);
  const viewNum = 5;
  const start = (page - 1) * viewNum;
  const viewData = roomData.slice(start, start + viewNum);

  useEffect(() => {
    const need = page * viewNum;
    if (roomData.length < need) {
      fetchMore();
    }
  }, [page, roomData.length, fetchMore]);

  const handleRoomOpen = (docId:string, category:string) => {
    navigate(`/hub/${category}/${docId}`);
  }
  const categoryConversion = (categoryId:string) => {
    const findVal = hubCategoryData.find(c => c.id === categoryId);
    return  findVal ? findVal.title : '-';
  }

  const onChangePagination = (page:number) => {
    console.log(page)
    setPage(page)
  }

  return (
    <div className={styles.contLists}>
      { isLoading && roomData.length === 0 ? (
        <Loading mode="local" />
      ) : (
        <div className={styles.tableWrap}>
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
              { viewData.map((roomItem)=> (
                <div className={styles.row} key={roomItem.id}>
                  <div className={styles.cell}>
                    <span>{roomItem.visibility === 'public' ? '공개':'비공개' }</span>
                  </div>
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
                  <div className={styles.cell}>
                    <span>{categoryConversion(roomItem.category)}</span>
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.createdAt}>{dateFormat(roomItem.createdAt,{format:'date',separator:'.'})}</span>
                  </div>
                  <div className={styles.cell}>
                    <Members data={roomItem.memberPreview} maxView={roomItem.memberCount} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination
            page={page}
            totalPages={total}
            viewCount={viewNum}
            center={true}
            onChange={onChangePagination}
          />
        </div>
      )}
    </div>
    
  )
}