import type { InputHTMLAttributes } from 'react';
import styles from './CheckBox.module.scss';
import { cn } from '@/utils/common';
import { IconCheck } from '@/assets/icon';

interface CheckBoxPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const CheckBox = ({
  label,
  className,
  ...props
}: CheckBoxPropsType) => {
  return (
    <label className={cn(styles.checkbox, className)}>
      <input
        type="checkbox"
        className={styles.input}
        {...props}
      />
      <i className={styles.check}>
        <IconCheck />
      </i>
      {label && <span className={styles.tit}>{label}</span>}
    </label>
  );
};


/*
  활용
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const allItems = ['a', 'b', 'c'];

  const isAllChecked = checkedList.length === allItems.length;

  console.log(checkedList)
  const toggleAll = () => {
    if (isAllChecked) {
      setCheckedList([]);
    } else {
      setCheckedList(allItems);
    }
  };

  const toggleItem = (value: string) => {
    setCheckedList(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };


*/