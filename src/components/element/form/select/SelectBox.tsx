import { cn } from "@/utils/common";
import {
  useCallback, useEffect, useRef, useState,
  type SelectHTMLAttributes
} from "react";
import styles from './SelectBox.module.scss';
import { ArrowOpen } from "@/components/common/ui/ArrowOpen";

//🔹 select option
interface SelectOptionType {
  value: string;
  label?: string;
  disabled?: boolean;
}

interface SelectPropsType
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOptionType[],
  iniVal?: string, // 초기 val
  changeEvent: (value: string) => void,
}

export const SelectBox = ({
  options,
  iniVal,
  className,
  changeEvent,
  ...rest
}:SelectPropsType) => {
  const selectBoxRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(
    iniVal ?? options[0]?.value
  );
  const { disabled } = rest
  
  // 초기 value 동기화
  useEffect(() => {
    if (iniVal !== undefined) {
      setSelected(iniVal);
    }
  }, [iniVal]);

  // 포커스 벗어날(외부 클릭) 경우 닫기
  const handleBlurClose = (e:React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!selectBoxRef.current?.contains(next)) {
      setOpen(false);
    }
  }

  const selectOption = useCallback(
    (val: string) => {
      setSelected(val);
      changeEvent?.(val);
      setOpen(false);
    },
    [changeEvent]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (!open && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      setOpen(false);
    }
  };
  
  // options label 없는 경우 value로 대체
  const optionLists = options.map(optItem => ({
    ...optItem,
    label: optItem.label ?? optItem.value,
  }));

  const selectedOption = optionLists.find(opt => opt.value === selected);
  const selectedLabel = selectedOption?.label ?? "Test Option";
  const selectedIndex = optionLists.findIndex(
    opt => opt.value === selected
  );

  useEffect(() => {
    if (!open) return;
    if (selectedIndex < 0) return;

    const el = optionRefs.current[selectedIndex];
    el?.scrollIntoView({ block: "center" });
  }, [open, selectedIndex]);

  return (
    <div
      ref={selectBoxRef}
      className={cn(styles.selectBox, className)}
      tabIndex={-1}
      onBlur={(e) => handleBlurClose(e)}
    >
      {/* select - hidden */}
      <label className={styles.hiddenSelect}>
        <select
          value={selected}
          onChange={(e) => selectOption(e.target.value)}
          className={styles.select}
          disabled={true}
          tabIndex={-1}
          {...rest}
        >
          <option value={selectedOption?.value}></option>
        </select>
      </label>
      {/* UI */}
      <button
        type="button"
        className={cn(styles.selectBtn,open && styles.open)}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={disabled ? undefined : '선택해주세요.'}
        onClick={() => setOpen(v => !v)}
      >
        <span>{selectedLabel}</span>
        <ArrowOpen open={open} />
      </button>
      {open && (
        <ul
          className={styles.optionList}
          role="listbox"
        >
          {optionLists.map((opt, index) => (
            <li key={opt.value}>
              <button
                ref={(el) => { optionRefs.current[index] = el; }}
                type="button"
                role="option"
                aria-selected={selected === opt.value}
                disabled={opt.disabled}
                className={cn(
                  styles.optionBtn,
                  selected === opt.value && styles.selected,
                  opt.disabled && styles.disabled
                )}
                title={opt.disabled ? '선택할 수 없음..': opt.label}
                onClick={() => !opt.disabled && selectOption(opt.value)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}