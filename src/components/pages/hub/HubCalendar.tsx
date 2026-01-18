
import { useState } from 'react';
import styles from './HubCalendar.module.scss';
import { Calendar } from '@/components/element/calendar/Calendar';
import type { DateRange } from '@/types/date/calendar';

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
      <div className={styles.calendar}>
        <Calendar
          selectDates={range}
          events={[
            { date: '2026-01-15', label:'test' },
            { date: '2026-01-15', label: '회의' },
            { date: '2026-01-20', label: '휴가' },
          ]}
          onChange={onChange}
          isReadonly={false}
          dayRender={(_, events) => {
            if (!events || events.length === 0) return null;

            return events.map((event, i) => (
              <span key={i} className="dd">{event.label}</span>
            ));
          }}
        />
      </div>
    </div>
  )
}