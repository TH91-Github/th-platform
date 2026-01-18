import { cn } from "@/utils/common";
import styles from './Calendar.module.scss';
interface WeekPropsType {
  lang? : 'ko' | 'en',
  className?: string,
}
const KO = ['일', '월', '화', '수', '목', '금', '토'];
const EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
export const Week = ({ lang = 'ko', className = '' }: WeekPropsType) => {
  const weekDay = lang === 'en' ? EN : KO;

  return (
    <div className={cn(styles.week, className)}>
      {weekDay.map((d, index) => (
        <div key={index}>
          <span>{d}</span>
        </div>
      ))}
    </div>
  );
};