import type { CalendarBasePropsType } from '@/types/date/calendar';
import { useRef, useState } from 'react';
import styles from './Calendar.module.scss';
import { DateGrid } from './DateGrid';
import { Week } from './Week';
import { cn } from '@/utils/common';
import { IconArrowLeft, IconArrowRight } from '@/assets/icon';

// 🔹 Calendar
interface CalendarTPropsType extends CalendarBasePropsType {
  className?:string,
  weekClassName?: string,
  daysClassName?:string,
}

export const Calendar = ({
  selectDates,
  events,
  isHolidays,
  isReadonly,
  selectOne,
  className,
  weekClassName,
  daysClassName,
  onChange,
  dayRender,
}:CalendarTPropsType) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const moveMonth = (diff: number) => {
    const date = new Date(year, month + diff, 1);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  };

  return(
    <div 
      ref={calendarRef} 
      className={cn(styles.calendar, className)}
    >
      <div className={styles.heading}>
        <button 
          onClick={() => moveMonth(-1)}
        >
          <i><IconArrowLeft /></i>
        </button>
        <span className={styles.ym}>
          {year}.{month + 1}
        </span>
       <button 
          onClick={() => moveMonth(1)}
        >
          <i><IconArrowRight /></i>
        </button>
      </div>
      <Week className={weekClassName} />
      <DateGrid
        y={year} 
        m={month}
        selectDates={selectDates}
        events={events}
        isHolidays={isHolidays}
        selectOne={selectOne}
        isReadonly={isReadonly}
        dayRender={dayRender}
        className={daysClassName}
        onChange={onChange}
      />
    </div>
  )
}