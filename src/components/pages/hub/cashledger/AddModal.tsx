import { IconClose, IconRotate } from '@/assets/icon'
import { Btn } from '@/components/element/button/Btn'
import { Input } from '@/components/element/form/input/Input'
import { TitlePoint } from '@/components/ui/text/TitlePoint'
import type { RowType } from '@/types/hub/cashledger/cashledger'
import { cn } from '@/utils/common'
import { formatDate } from '@/utils/date/calendar'
import { useState } from 'react'
import styles from './AddModal.module.scss'

// 🔹 가계부 내역 추가 모달
const createEmptyRow = (): RowType => ({
  id: '', // doc id
  date: formatDate(new Date()),
  content: '',
  category: '',
  type: 'expense',
  amount: '0'
})

export const AddModal = ({onClose}:{onClose : () => void}) => {
  const [rows, setRows] = useState<RowType[]>([createEmptyRow()])
  const isValid = rows.every(row =>
    row.content.trim() !== '' &&
    Number(row.amount) > 0
  )
  // 🔹 행 추가
  const handleAddRow = () => {
    setRows(prev => [...prev, createEmptyRow()])
  }

  // 🔹 행 삭제
  const handleRemoveRow = (index: number) => {
    if (rows.length === 1) {
      // 값만 초기화
      setRows([createEmptyRow()])
      return
    }
    setRows(prev => prev.filter((_, i) => i !== index))
  }

  // 🔹 값 변경
  const handleChange = ( index: number, key: keyof RowType, value: string ) => {
    setRows(prev =>
      prev.map((row, i) =>
        i === index ? { ...row, [key]: value } : row
      )
    )
  }

  // 🔹 저장
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const invalidRow = rows.find(row =>
      row.content.trim() === '' ||
      Number(row.amount) <= 0
    )

    if (invalidRow) {
      alert('입력을 확인해주세요.')
      return
    }

    const payload = rows.map(row => ({
      ...row,
      category: row.category.trim() || '-',
      amount: Number(row.amount)
    }))

    console.log('확인용:', payload)
  }

  // 🔹 토탈 계산
  const totalIncome = rows
    .filter(r => r.type === 'income')
    .reduce((acc, cur) => acc + Number(cur.amount || 0), 0)

  const totalExpense = rows
    .filter(r => r.type === 'expense')
    .reduce((acc, cur) => acc + Number(cur.amount || 0), 0)

  return (
    <>
      <div className={styles.heading}>
        <TitlePoint title="내역 추가" pointType="underline" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.content}>
          <div className={styles.thead}>
            <div className={styles.row}>
              <span className={styles.tNum}>No.</span>
              <span className={styles.tDate}>날짜</span>
              <span className={styles.tText}>내용</span>
              <span className={styles.tCategory}>카테고리</span>
              <span className={styles.tType}>수입/지출</span>
              <span className={styles.tAmount}>금액 (원)</span>
              <span className={cn(styles.tInit)}>초기화, 삭제</span>
            </div>
          </div>
          <ul className={styles.tbody}>
            {rows.map((row, index) => (
              <li key={index} className={styles.row}>
                <span className={cn(styles.tNum, styles.center)}>{index + 1}</span>
                {/* 날짜 */}
                <span className={styles.tDate}>
                  <Input
                    type="date"
                    initVal={formatDate(new Date())}
                    value={row.date}
                    changeEvent={(e) => handleChange(index, 'date', e)}
                  />
                </span>
                {/* 내용 */}
                <span className={styles.tText}>
                  <Input
                    initVal={row.content}
                    changeEvent={e =>  handleChange(index, 'content', e)}
                  />
                </span>
                {/* 카테고리 */}
                <span className={styles.tCategory}>
                  <Input
                    initVal={row.category}
                    changeEvent={e => handleChange(index, 'category', e)}
                  />
                </span>
                {/* 수입/지출 */}
                <span className={styles.tType}>
                  <Btn
                    type="button"
                    className={row.type === 'income' ? styles.income : styles.expense }
                    title={`${row.type === 'income' ? '지출': '수입'} 변경하기`}
                    onClick={() => handleChange(index, 'type', row.type === 'income' ? 'expense' : 'income')}
                  >
                    <i><IconRotate /></i>
                    <span>{row.type === 'income' ? '수입': '지출'}</span>
                  </Btn>
                </span>
                {/* 금액 */}
                <span className={styles.tAmount}>
                  <Input
                    type="number"
                    initVal={row.amount}
                    changeEvent={val =>
                      handleChange(index, 'amount', val)
                    }
                  />
                </span>
                {/* 삭제 */}
                <span className={cn(styles.tInit, styles.center)}>
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                  >
                    <i><IconClose /></i>
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* footer */}
        <div className={styles.footer}>
          <div className={styles.btnWrap}>
            <Btn 
              className={styles.addBtn}
              onClick={handleAddRow}
            >
              <span>추가</span>
            </Btn>
          </div>
          <div className={styles.total}>
            <span className={styles.txt}>수입: <strong className={styles.income}>{totalIncome.toLocaleString()}</strong></span>
            <span> / </span>
            <span className={styles.txt}>지출: <strong className={styles.expense}>{totalExpense.toLocaleString()}</strong></span>
          </div>
        </div>
        {/* 하단 버튼 */}
        <div className={styles.summaryBtn}>
          <Btn
            type="button"
            bType="gray"
            reverse
            onClick={onClose}
          >
            <span>취소</span>
          </Btn>
          <Btn 
            bType="primary" 
            type="submit"
            disabled={!isValid}
          >
            <span>전체 저장하기</span>
          </Btn>
        </div>
      </form>
    </>
  )
}