import { holidaysData } from "@/data/dummy/dummy";
import type { CalendarBasePropsType, DateRange } from "@/types/date/calendar";
import { cn } from "@/utils/common";
import { createDays, formatDate, MAX_RANGE_DAYS } from "@/utils/date/calendar";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from './Calendar.module.scss';

// 🔹 1...31 달력 days
interface DateGridPropsType extends CalendarBasePropsType{
  y?: number, // year
  m?: number, // month
  className?: string,
}

export const DateGrid = ({
  y, m, 
  selectDates,  
  events, 
  isHolidays = true,
  isReadonly = false,
  selectOne = false,
  className,
  onChange,
  dayRender,
}: DateGridPropsType) => {
  const dateGridRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const year = y ?? today.getFullYear();
  const month = m ?? today.getMonth();
  const [selectRange, setselectRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const DayTag = isReadonly ? 'span' : 'button';
  const range = selectDates ?? selectRange;

  // days 생성
  const days = useMemo(() => (
    createDays(
      year, month,
      events,
      isHolidays ? holidaysData : undefined
    )
  ),[year, month]);
  
  console.log( days)
  // 선택 업데이트
  const updateRange = (next: DateRange) => {
    if (!selectDates) {
      setselectRange(next)
    }
    onChange?.(next);
  };

  // 선택 초기화
  const resetRange = () => {
    if (selectDates) return;
    if (!range.start && !range.end) return;
    updateRange({ start: null, end: null });
  };
  // 선택 된 날짜
  const isSelected = (date: Date) => {
    if (!range.start) return false;
    if (!range.end) {
      return formatDate(date) === formatDate(range.start);
    }
    return date >= range.start && date <= range.end;
  };
  
  const getDiffDays = (start: Date, end: Date) => {
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    const diff = Math.abs(e.getTime() - s.getTime());
    return diff / (1000 * 60 * 60 * 24) + 1; // inclusive
  };

  // 같은 날 선택 체크
  const isSameDay = (a: Date, b: Date) => ( formatDate(a) === formatDate(b) );

  const handleDayClick = (date: Date) => {
    if (isReadonly) return;
    const currentRange = range;

    // 같은 날 선택 시 해제
    if ( currentRange.start && isSameDay(currentRange.start, date) && (
        (selectOne && currentRange.end && isSameDay(currentRange.end, date)) ||
        (!selectOne && !currentRange.end)
      )){
      updateRange({ start: null, end: null });
      return;
    }
      
    if (selectOne) { // 하나만 선택
      updateRange({ start: date, end: date });
      return;
    }

    // start가 없거나 이미 range가 완성된 경우 → 새로 시작
    if (!currentRange.start || currentRange.end) {
      updateRange({ start: date, end: null });
      return;
    }
    const start = currentRange.start;
    const end = date < start ? start : date;
    const newStart = date < start ? date : start;

    const diffDays = getDiffDays(newStart, end);

    if (diffDays > MAX_RANGE_DAYS) {
      resetRange();
      alert('30일 이상 선택 할 수 없습니다'); // 🔔 나중에 교체 예정
      return;
    }
    updateRange({ start: newStart, end });
  };

  // true/false
  const isStart = (date: Date) => !!range.start && isSameDay(date, range.start);
  const isEnd = (date: Date) => !!range.end && isSameDay(date, range.end);
    

  useEffect(() => {
    if (isReadonly) return;
    if (!selectRange.start) return; // 🔑 start가 있을 때만 outside 감지

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!dateGridRef.current?.contains(target)) {
        resetRange(); // start / end 초기화
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isReadonly, selectRange.start]);

  return (
    <div 
      ref={dateGridRef} 
      className={styles.dateGrid}
    >
      {days.map(dayCell => {
        const selected = isSelected(dayCell.date);
        const isStartDate = isStart(dayCell.date);
        const isEndDate = isEnd(dayCell.date);
        const rendered = dayRender?.(dayCell.date, dayCell.events);
        
        return (
          <DayTag
            key={formatDate(dayCell.date)}
            className={cn(
              styles.dayCell,
              styles[dayCell.type],
              `${dayCell.type}`,
              isSameDay(dayCell.date, today) && styles.today,
              dayCell.holidays && styles.holidays,
              selected && styles.selected,
              isStartDate && styles.start,
              isEndDate && styles.end,
              className
            )}
            onMouseDown={e => e.stopPropagation()} // outside 방지
            onClick={() => handleDayClick(dayCell.date)}
          >
            <span className={styles.day}>{dayCell.date.getDate()}</span>
            {(isHolidays && dayCell.holidays) && (
              <span className={cn(styles.holiday, 'holiday-day','blind')}>
                {dayCell.holidays.map((holidayItem) => <span>{holidayItem.label}</span>)}
              </span>
            )}
            { rendered && (
              <span className={cn(styles.eventDay, 'event-day')}>{dayRender?.(dayCell.date, dayCell.events)}</span>
            )}
          </DayTag>
        )
      })}
    </div>
  );
};
