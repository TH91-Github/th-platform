import type { CalendarEvent } from "@/types/date/calendar";

export const userEvents: CalendarEvent[] = [
  {
    id: 1,
    date: '2026-01-10',
    label: '프로젝트 킥오프',
  },
  {
    id: 2,
    date: '2026-01-15',
    label: '디자인 리뷰',
  },
  {
    id: 3,
    date: '2026-02-01',
    label: '2월 정기 회의',
  },
  {
    id: 4,
    date: '2026-12-25',
    label: '크리스마스 파티',
  },
];

import type { FixedHoliday } from "@/types/date/calendar";

export const holidaysData: FixedHoliday[] = [
  // 매년 반복
  { m: 1, d: 1, label: '신정' },
  { m: 3, d: 1, label: '삼일절' },
  { m: 5, d: 5, label: '어린이날' },
  { m: 6, d: 6, label: '현충일' },
  { m: 7, d: 17, label: '제헌절' },
  { m: 8, d: 15, label: '광복절' },
  { m: 10, d: 3, label: '개천절' },
  { m: 10, d: 9, label: '한글날' },
  { m: 12, d: 25, label: '성탄절' }

  // // 특정 연도만
  // { y: 2026, m: 1, d: 1, label: 'test' },
  // { y: 2026, m: 5, d: 5, label: '2026 어린이날' },
  // { y: 2026, m: 10, d: 9, label: '2026 한글날' },
];
