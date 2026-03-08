import { doc, type DocumentReference, type Transaction } from "firebase/firestore";

// 🔹 가계부 방 생성 시 초기 컬렉션
export const initCashledgerSummary = (
  tx: Transaction,
  roomRef: DocumentReference,
  now: number
) => {
  const year = new Date(now).getFullYear();
  const summaryRef = doc(roomRef, 'cashledgerYearSummary', String(year))
  const months: Record<number, { income: number; expense: number }> = {};

  for (let i = 1; i <= 12; i++) {
    months[i] = { income: 0, expense: 0 };
  }

  tx.set(summaryRef, {
    year,
    income: 0,
    expense: 0,
    months,
    updatedAt: now,
  });
};