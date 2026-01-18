import type { CalendarCell, CalendarCellType, CalendarEvent, FixedHoliday } from "@/types/date/calendar";

// 선택 최대 일 수 
export const MAX_RANGE_DAYS = 30;

// 날짜 변환 date 받은 후 20xx-xx-xx 
export const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// 월 정보
export const getMonthInfo = (year: number, month: number) => ({
  firstDay: new Date(year, month, 1).getDay(),
  lastDate: new Date(year, month + 1, 0).getDate(),
});

// 일정 Date
const createEventMap = (events?: CalendarEvent[]) => {
  const map = new Map<string, CalendarEvent[]>();

  events?.forEach(ev => {
    if (!map.has(ev.date)) map.set(ev.date, []);
    map.get(ev.date)!.push(ev);
  });

  return map;
};

// 공휴일 Date
const getHolidaysByDate = (
  date: Date,
  holidays: FixedHoliday[] = []
): FixedHoliday[] | undefined => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const matched = holidays.filter(h => {
    // 특정 연도
    if (h.y) return h.y === y && h.m === m && h.d === d;
    // 매년`
    return h.m === m && h.d === d;
  });

  return matched.length > 0 ? matched : undefined;
};

// days 가공
export const createDays = (
  year: number,
  month: number,
  events?: CalendarEvent[],
  holidays?: FixedHoliday[]
): CalendarCell[] => {
  const { firstDay, lastDate } = getMonthInfo(year, month);
  const prevLastDate = new Date(year, month, 0).getDate();
  const eventMap = createEventMap(events);

  const cells: CalendarCell[] = [];

  const pushCell = (date: Date, type: CalendarCellType) => {
    const key = formatDate(date);
    cells.push({
      date,
      type,
      events: eventMap.get(key),
      holidays: getHolidaysByDate(date, holidays),
    });
  };

  // 이전 달
  for (let i = firstDay - 1; i >= 0; i--) {
    pushCell(new Date(year, month - 1, prevLastDate - i), 'p');
  }

  // 이번 달
  for (let i = 1; i <= lastDate; i++) {
    pushCell(new Date(year, month, i), 'c');
  }

  // 다음 달
  const weeks = Math.ceil(cells.length / 7);
  const maxCells = weeks * 7;
  let next = 1;

  while (cells.length < maxCells) {
    pushCell(new Date(year, month + 1, next++), 'n');
  }

  return cells;
};
