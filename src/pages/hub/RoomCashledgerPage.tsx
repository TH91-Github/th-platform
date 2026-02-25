import { CashledgerHeading } from '@/components/pages/hub/cashledger/CashledgerHeading';
import { CashledgerRecord } from '@/components/pages/hub/cashledger/CashledgerRecord';
import styles from './RoomCashledgerPage.module.scss';
import { CashledgerTotal } from '@/components/pages/hub/cashledger/CashledgerTotal';

// 🔹 가계부 상세 페이지
export const RoomCashledgerPage = () =>{ 

  // 방 id가 포함된 url로 접근 시 로그인 체크
  // 공개/비공개 분류

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
