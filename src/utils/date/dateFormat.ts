//🔹 date format 
type DateFormatType =
  | 'date'        // 날짜만
  | 'datetime'    // 날짜 + 시간
  | 'time';       // 시간만

interface FormatDateOptions {
  format?: DateFormatType;  
  separator?: string;       
  timeSeparator?: string;   
  use12Hour?: boolean;
}

export const dateFormat = (
  value: number | Date | string,
  options: FormatDateOptions = {}
) => {
  const {
    format = 'datetime',
    separator,
    timeSeparator = ':',
    use12Hour = false,
  } = options;

  const isKoreanMode = !separator;

  const hasTime =
    typeof value === 'number' ||
    value instanceof Date ||
    (typeof value === 'string' && /T|\d{2}:\d{2}/.test(value));

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const y = String(date.getFullYear());
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  let hour = date.getHours();
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');

  let period = '';
  if (use12Hour) {
    period = hour < 12 
      ? (isKoreanMode ? '오전' : 'AM')
      : (isKoreanMode ? '오후' : 'PM');
    hour = hour % 12 || 12;
  }

  const h = String(hour).padStart(2, '0');

  const datePart = isKoreanMode
    ? `${y}년 ${m}월 ${d}일`
    : [y, m, d].join(separator);

  const timePart = isKoreanMode
    ? `${use12Hour ? period + ' ' : ''}${h}시 ${min}분 ${s}초`
    : `${use12Hour ? period + ' ' : ''}${h}${timeSeparator}${min}${timeSeparator}${s}`;

  switch (format) {
    case 'date':
      return datePart;

    case 'time':
      return hasTime ? timePart : '';

    case 'datetime':
    default:
      if (!hasTime) return datePart;
      return `${datePart} ${timePart}`;
  }
};


/*
날짜만
dateFormat('2026-02-06', { format: 'date' })
시간만
dateFormat(1770187597728, { format: 'time' })
날짜+시간
dateFormat(1770187597728)

* 숫자
dateFormat(1770187597728, {
  separator: '.',
  use12Hour: true
})

*/