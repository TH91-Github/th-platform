import { useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from './Input.module.scss';
import { cn } from "@/utils/common";

export interface InputKeyboardValType {
  e?:React.KeyboardEvent<HTMLInputElement>,
  val?:string
}

// 🔹 Input Text
export interface InputRefType {
  getValue: () => string,
  focus: () => void,
  changeVal: (e:string) => void,
  reset: () => void,
}
interface InputPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<InputRefType>,
  initVal?: string,
  disabled?: boolean,
  error?:boolean,
  $defaultLine?: 'line' | 'line-bottom' | 'line-left' | 'line-none',
  keyEnter?: ({e,val}: InputKeyboardValType) => void,
  changeEvent?: (e: string) => void,
  focusEvent?: (e?:React.FocusEvent<HTMLInputElement>) => void,
  blurEvent?: (e?:React.FocusEvent<HTMLInputElement>) => void,
}

export function Input({ 
  ref, 
  initVal,
  disabled,
  error,
  $defaultLine,
  keyEnter, changeEvent, focusEvent, blurEvent,
  ...rest 
}: InputPropsType) {
  const inputEl = useRef<HTMLInputElement | null>(null);
  const [val, setVal] = useState(initVal ?? '');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { id, title, placeholder } = rest

  // 초깃값
  useEffect(() => {
    if (initVal !== undefined && initVal !== val) {
      setVal(initVal);
    }
  }, [initVal]);

  const handleFocusIn = (e: React.FocusEvent<HTMLInputElement>) => {
    focusEvent && focusEvent(e)
  }

  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    blurEvent && blurEvent(e);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyEnter) {
      keyEnter({e, val});
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVal(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() =>{
      changeEvent && changeEvent(value)
    }, 100)
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getValue: () => val,
    focus: () => inputEl.current?.focus(),
    changeVal: (val) => setVal(val), 
    reset: () => setVal(''),
  }));

  return (
    <label className={cn(styles.label, rest.className)}>
      <input
        ref={inputEl}
        type="text"
        id={id}
        {...rest}
        className={cn(
          styles.input, 
          'input',
          $defaultLine && styles[$defaultLine],
          error && styles.error
        )}
        value={val}
        autoComplete="off"
        title={placeholder ? placeholder : (title ?? '입력 해주세요')}
        disabled={disabled}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        onKeyUp={handleKeyUp}
        onChange={handleOnChange}
      />
    </label>
  );
}

/*
부모 사용
  const inputRef = useRef<InputRefType>(null);

  <InputText
    ref={inputRef}
  />

*/