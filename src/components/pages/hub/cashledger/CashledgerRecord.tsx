import { Btn } from '@/components/element/button/Btn'
import { TitlePoint } from '@/components/ui/text/TitlePoint'
import styles from './CashledgerRecord.module.scss'
import { cn } from '@/utils/common'
// 🔹 가계부 내역
export const CashledgerRecord = () =>{
  return(
    <div className={styles.record}>
      <div className={styles.recordInner}>
        <div className={styles.heading}>
          <TitlePoint 
            title="내역" 
            pointType="underline"
          />
          <div className={styles.filter}>
            <Btn>
              <span>전체</span>
            </Btn>
            <Btn>
              <span>수입</span>
            </Btn>
            <Btn>
              <span>지출</span>
            </Btn>
          </div>
        </div>
        <div className={styles.thead}>
          <div className={styles.row}>
            <span>날짜</span>
            <span>내용</span>
            <span>카테고리</span>
            <span>금액</span>
            <span>수정</span>
          </div>
        </div>
        <ul className={styles.tbody}>
          <li className={styles.row}>
            {/* 날짜 */}
            <span>2026.02.26</span>
            {/* 내용 */}
            <span>가계부 내용입니다.</span>
            {/* 카테고리 */}
            <span>식비</span>
            {/* 금액 */}
            <span className={cn(styles.amount, 1 === 1 ? styles.income : styles.expense)}>
              <span className={styles.num}>136,000</span>
              <span>원</span>
            </span>
            {/* 수정 - modal */}
            <span>-</span>
          </li>
          <li className={styles.row}>
            {/* 날짜 */}
            <span>2026.02.26</span>
            {/* 내용 */}
            <span>가계부 내용입니다.</span>
            {/* 카테고리 */}
            <span>식비</span>
            {/* 금액 */}
            <span className={cn(styles.amount, 1 !== 1 ? styles.income : styles.expense)}>
              <span className={styles.num}>136,000</span>
              <span>원</span>
            </span>
            {/* 수정 - modal */}
            <span>-</span>
          </li>
        </ul>
      </div>
    </div>
  )
} 