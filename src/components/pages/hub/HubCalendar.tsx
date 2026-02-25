
import { useState } from 'react';
import { Calendar } from '@/components/element/calendar/Calendar';
import type { DateRange } from '@/types/date/calendar';
import styles from './HubCalendar.module.scss';

export const HubCalendar = () => {

  const [range, setRange] = useState<DateRange>({
    start: new Date(2026, 0, 1),
    end: new Date(2026, 0, 5),
  });

  const onChange = (e:DateRange) => {
    setRange(e);
    console.log(e)
  }
  return ( 
    <div className={styles.hubCalendar}>
      <div className={styles.heading}>
        <span>Calendar</span>
      </div>
      <Calendar
        daysClassName={styles.calendarDay}
        selectDates={range}
        events={[
          { date: '2026-02-15', label:'test' },
          { date: '2026-02-16', label: '회의' },
          { date: '2026-02-25', label: '휴가' },
        ]}
        onChange={onChange}
        isReadonly={true}
        dayRender={(_, events) => {
          if (!events || events.length === 0) return null;

          return events.map((event, i) => (
            <span key={i} className={styles.event}>{event.label}</span>
          ));
        }}
        className={styles.calendar}
      />
    </div>
  )
}