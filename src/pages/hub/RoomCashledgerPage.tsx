import { CashledgerHeading } from '@/components/pages/hub/cashledger/CashledgerHeading';
import { CashledgerRecord } from '@/components/pages/hub/cashledger/CashledgerRecord';
import styles from './RoomCashledgerPage.module.scss';
import { CashledgerTotal } from '@/components/pages/hub/cashledger/CashledgerTotal';

// 🔹 가계부 상세 페이지
export const RoomCashledgerPage = () =>{ 

  // 방 id가 포함된 url로 접근 시 로그인 체크
  // 통합, 리스트 스토어로 관리 이전, 다음, 글 목록 확인하기 위함

  return(
   <div className={styles.cashledger}>
      <CashledgerHeading />
      {/* 통합 */}
      <CashledgerTotal />
      {/* 리스트 */}
      <CashledgerRecord />
   </div>
  )
}
