// 🔹 Calendar Type

export type CalendarCellType = 'p' | 'c' | 'n'; // prev, current, next

export interface FixedHoliday { // 공휴일
  y?: number;      // 없으면 매년
  m: number;       // 1 ~ 12
  d: number;       // 1 ~ 31
  label: string;
}
export type CalendarEvent = {
  id?: string | number;
  date: string; // 'YYYY-MM-DD'
  label?: string;
};

// days
export interface CalendarCell {
  date: Date,
  type: 'p' | 'c' | 'n',
  events?: CalendarEvent[],
  holidays?: FixedHoliday[],
};

// 선택 date
export type DateRange = {
  start: Date | null;
  end: Date | null;
};

// 캘린더, DateGrid 공통 타입
export interface CalendarBasePropsType {
  selectDates?: DateRange,  // 선택 된 값 유지 or 선택 된 값 내려오는 경우
  events?: CalendarEvent[], // 사용자 특정 날짜
  isHolidays?: boolean, // holidays
  isReadonly?: boolean, // 읽기 전용, 선택 가능
  selectOne?: boolean, // 하루 선택 or 여러 일
  onChange?: (range: DateRange) => void; // 선택값 반환
  dayRender?: (date: Date, events?: CalendarEvent[]) => React.ReactNode; // 부모에서 특정 날 렌더
}