
// 🔹 내역 Type
export interface RowType {
  id: string
  date: string
  content: string
  category: string
  type: 'income' | 'expense'
  amount: string
}