import { TitlePoint } from '@/components/ui/text/TitlePoint'
import styles from './CashledgerTotal.module.scss'
import { cn } from '@/utils/common'
import { Count } from '@/components/element/count/Count'
import { colors } from '@/assets/style/emotion/variables'
// 🔹 가계부 종합 
export const CashledgerTotal = () => {
  // 년, 월, 기간 설정 
  // 토탈 수입, 지출, 잔액, 그래프, 리스트
  return ( 
    <div className={styles.total}>
      <div className={styles.summary}>
        <div className={styles.box}>
          <TitlePoint
            titleTag="h3"
            title="수입" 
            pointType="underline"
            $fontSize={18}
            $activeColor={colors.blue}
          />
          <p className={cn(styles.amount, styles.income)}>
            <span className={styles.num}>
              <Count end={3700000} useComma={true} />
            </span>
            <span>원</span>
          </p>
           <p className={styles.totalCount}>총 5건</p>
        </div>
        <div className={styles.box}>
          <TitlePoint 
            titleTag="h3"
            title="지출" 
            pointType="underline"
            $fontSize={18}
            $activeColor={colors.red}
          />
          <p className={cn(styles.amount, styles.expense)}>
            <span className={styles.num}>
              <Count end={3700000} useComma={true} />
            </span>
            <span>원</span>
          </p>
          <p className={styles.totalCount}>총 5건</p>
        </div> 
        <div className={styles.box}>
          <TitlePoint 
            titleTag="h3"
            title="잔액" 
            pointType="underline"
            $fontSize={18}
            $activeColor={colors.green}
          />
          <p className={cn(styles.amount, styles.save)}>
            <span className={styles.num}>
              <Count end={3700000} useComma={true} />
            </span>
            <span>원</span>
          </p>
        </div> 
      </div>
      {/* 그래프 */}
      <div className="">

      </div>
    </div>
  )
}