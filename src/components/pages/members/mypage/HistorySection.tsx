import { useAuthUser } from '@/hook/auth/useAuthUser';
import styles from './MyPageDetail.module.scss'

export const HistorySection = () =>{
  const user = useAuthUser();
  
  return( 
    <div className={styles.sectionWrap}>
      HistorySection

    {/*   
      로그인 목록
      연결된 서비스 관리 - 참여 방 또는 비슷한 류 
    */}
    </div>
  )
}