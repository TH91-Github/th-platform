// 🔹 가계부 Type 

// 🔹 내역 Type
export interface RowType {
  id: string
  date: string
  content: string
  category: string
  type: 'income' | 'expense'
  amount: string
}
// 연도별 종합 - 컬렉션 CashledgerSummary/{yyyy}/
export interface CashledgerYearSummaryType {
  year: number,
  income: number,
  expense: number,
  months: Record<string, { income: number; expense: number }>,
  updatedAt: number,
}

