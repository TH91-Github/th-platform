import { colors, textColor } from "assets/style/variables";
import { IconCloseCircle } from "assets/svg/icons";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components"
import { InputKeyboardValType } from "types/common";
import { cn } from "utils/common";

interface InputStylePropsType extends React.InputHTMLAttributes<HTMLInputElement>{
  $maxWidth?: number | string;
  $defaultLine?: 'line' | 'line-bottom' | 'line-left' | 'none'; // default line 유무
  $lineColor?:string;
  $focusColor?:string;
}
interface InputPropsType {
  name?: string;
  id: string;
  type?: 'text' | 'password';
  className?: string;
  title?: string;
  placeholder?: string;
  initVal?: string;
  disabled?: boolean;
  error?:boolean;
  styleOpt?:InputStylePropsType;
  keyEnter?: ({e,val}:InputKeyboardValType) => void;
  changeEvent?: (e: string) => void;
  focusEvent?: () => void;
  removeEvent?: () => void;
  blurEvent?: (e:React.FocusEvent<HTMLInputElement>) => void;
}

export interface InputTextRefType {
  refInputEl: () => HTMLInputElement | null;
  refInputValue: () => string;
  refFocusEvent: () => void;
  refInitVal: (e:string) => void;
  refResetVal: () => void;
}

export const InputText = forwardRef<InputTextRefType, InputPropsType>(function InputText({
  name, id, type, className, title, placeholder, initVal, disabled, error, styleOpt={},
  keyEnter, changeEvent, focusEvent, blurEvent, removeEvent
}: InputPropsType, ref ) {
  const [isFocus, setIsFocus] = useState<boolean>(initVal ? true : false);
  const [val, setVal] = useState<string>(initVal ?? "");
  const propsTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    $maxWidth, 
    $defaultLine = 'line', 
    $lineColor = colors.lineColor,
    $focusColor = colors.mSlateBlue 
  } = styleOpt;
  const handleFocusIn = useCallback(() => {
    setIsFocus(true);
    focusEvent && focusEvent();
  }, [focusEvent]);

  const handleFocusOut = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);
    blurEvent && blurEvent(e);
  }, [blurEvent]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyEnter) {
      const val = inputRef.current?.value;
      keyEnter({e, val});
    }
  }, [keyEnter] );

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVal(value);
    if (propsTimeRef.current) {
      clearTimeout(propsTimeRef.current);
    }
    propsTimeRef.current = setTimeout(() =>{
      changeEvent && changeEvent(value)
    }, 100)
  },[changeEvent]);

  const handleValRemove = () => { // 입력 초기화
    setVal('');
    changeEvent?.('');
    removeEvent?.();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  useEffect(()=>{
    return () => {
      if (propsTimeRef.current) {
        clearTimeout(propsTimeRef.current);
      }
    }
  },[])

  useImperativeHandle(ref, () => ({ // ref로 시작
    refInputEl: () => { // input 반환
      return inputRef.current
    },
    refInputValue: () => { // value
      return val
    },
    refFocusEvent: () => { 
      inputRef.current?.focus()
    },
    refInitVal: (value) => { // value 변경
      setVal(value);
    },
    refResetVal: () => { // value 초기화
      setVal('');
    }
  }));
  
  return( 
    <StyleWrap
      className={cn(
        'input-item', isFocus && 'isFocus', error && 'error', disabled && 'disabled'
      )}
      $maxWidth={$maxWidth ? $maxWidth : undefined} 
      $lineColor={$lineColor}
      $focusColor={$focusColor}
    >
      <label>
        <input
          ref={inputRef}
          type={type ?? 'text'}
          id={id}
          name={name}
          className={cn(
            'input', className && className, $defaultLine !== 'none' && $defaultLine
          )}
          value={val}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
          onKeyUp={handleKeyUp}
          onChange={handleOnChange}
          autoComplete="off"
          title={placeholder ? placeholder : (title ?? '입력 해주세요')}
          disabled={disabled}
        />
      </label>
      {(placeholder && val.length === 0) && (
        <span className="placeholder">{ placeholder }</span>
      )}
      {(val.length > 0 && !disabled) && ( 
        <button
          type="button"
          className={cn('remove', val.length > 0 && 'on')}
          onClick={handleValRemove}>
          <span className="blind">
            입력 삭제
          </span>
          <IconCloseCircle />
        </button>
      )}
    </StyleWrap>
  )
});

const StyleWrap = styled.div<InputStylePropsType>`
display:block;
position:relative;
width:100%;
${props => props.$maxWidth && 
  (typeof props.$maxWidth === 'number' ? `max-width: ${props.$maxWidth}px;` : `max-width: ${props.$maxWidth};`)
}
font-size:16px;
line-height:1;
.input {
  display:block;
  width:100%;
  height:40px;
  padding:5px 30px 5px 10px;
  border:1px solid transparent;
  border-radius:5px;
  background:transparent;
  font-size:inherit;
  transition: border-color .3s;
  outline:0;
  &:disabled {
    border-color:${colors.lineColor};
  }
  &:disabled + .placeholder{
    color:${textColor.subText};
  }
  &.line {
    border-color:${colors.lineColor};
  }
  &.line-bottom{
    outline:0;
    border-radius:0;
    border:none;
    border-bottom:1px solid ${colors.lineColor};
  }
}
.placeholder {
  position:absolute;
  top:50%;
  left:10px;
  font-size:inherit;
  line-height:1;
  transform: translateY(-50%);
  color:${textColor.subText};
  pointer-events:none;
}
.remove {
  display:flex;
  justify-content:center;
  align-imtes:center;
  position:absolute;
  top:50%;
  right:10px;
  transform: translateY(-50%);
}
&.isFocus {
  .input {
    border-color: ${({$focusColor}) => $focusColor};
    &.line-bottom{ 
      border-bottom: 1px solid ${({$focusColor}) => $focusColor};
    }
  }
}
&.disabled {
  .input {
    background:${colors.disabled};
    border-color:${colors.lineColor};
    color:${textColor.desc};
  }
}
&.error {
  .input{
    color:${colors.red};
    border-color:${colors.red};
  }
}
`;