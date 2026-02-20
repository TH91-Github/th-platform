import { hubTable } from '@/data/hub/hubData'
import styles from './HubContLists.module.scss'
import { useAuthUser } from '@/hook/auth/useAuthUser';
import { nonHubRoomData } from '@/data/hub/nonMember';

// 🔹 방 목록 
export const HubContLists = () => {
  const { data: user } = useAuthUser();
  console.log(user)

  const roomData = user ? nonHubRoomData : nonHubRoomData

  return (
    <div className={styles.wrap}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.row}>
            {
              hubTable.map((headItem) => (
                <div className={styles.cell} key={headItem.id}>
                  <span>{headItem.title}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className={styles.body}>
          { roomData.map((roomItem)=> (
            <div className={styles.row} key={roomItem.id}>
              <div className={styles.visibility}>

              </div>
              <div className={styles.title}>

              </div>
              <div className={styles.category}>

              </div>
              <div className={styles.createdAt}>

              </div>
              <div className={styles.members}>
            
              </div>
            </div>   
          ))}
        </div>
      </div>
    </div>
  )
}