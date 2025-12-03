import { colors, scrollBar, textColor } from "assets/style/variables";
import { IconCloseCircle } from "assets/svg/icons";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components"
import { TextareaKeyboardValType } from "types/common";
import { cn } from "utils/common";

interface TextareaStylePropsType extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
  $maxWidth?: number | string;
  $height?: number | string;
  $defaultLine?: 'line' | 'line-bottom' | 'line-left' | 'none';
  $lineColor?: string;
  $focusColor?: string;
}

interface TextareaPropsType {
  name?: string;
  id: string;
  className?: string;
  title?: string;
  placeholder?: string;
  initVal?: string;
  disabled?: boolean;
  error?: boolean;
  styleOpt?: TextareaStylePropsType;
  keyEnter?: ({e, val}: TextareaKeyboardValType) => void;
  changeEvent?: (val: string) => void;
  focusEvent?: () => void;
  removeEvent?: () => void;
  blurEvent?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export interface TextareaRefType {
  refTextareaEl: () => HTMLTextAreaElement | null;
  refTextareaValue: () => string;
  refFocusEvent: () => void;
  refInitVal: (value: string) => void;
  refResetVal: () => void;
}

export const TextareaUI = forwardRef<TextareaRefType, TextareaPropsType>(function Textarea({
  name, id, className, title, placeholder, initVal, disabled, error, styleOpt = {},
  keyEnter, changeEvent, focusEvent, blurEvent, removeEvent
}: TextareaPropsType, ref) {
  const [isFocus, setIsFocus] = useState<boolean>(initVal ? true : false);
  const [val, setVal] = useState<string>(initVal ?? "");
  const propsTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    $maxWidth,
    $height = '150px',
    $defaultLine = 'line',
    $lineColor = colors.lineColor,
    $focusColor = colors.mSlateBlue,
  } = styleOpt;

  const handleFocusIn = useCallback(() => {
    setIsFocus(true);
    focusEvent && focusEvent();
  }, [focusEvent]);

  const handleFocusOut = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocus(false);
    blurEvent && blurEvent(e);
  }, [blurEvent]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && keyEnter) {
      const val = textareaRef.current?.value;
      keyEnter({ e, val });
    }
  }, [keyEnter]);

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setVal(value);
    if (propsTimeRef.current) {
      clearTimeout(propsTimeRef.current);
    }
    propsTimeRef.current = setTimeout(() => {
      changeEvent && changeEvent(value);
    }, 100);
  }, [changeEvent]);

  const handleValRemove = () => {
    setVal('');
    changeEvent?.('');
    removeEvent?.();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  useEffect(() => {
    return () => {
      if (propsTimeRef.current) {
        clearTimeout(propsTimeRef.current);
      }
    }
  }, []);

  useImperativeHandle(ref, () => ({
    refTextareaEl: () => textareaRef.current,
    refTextareaValue: () => val,
    refFocusEvent: () => {
      textareaRef.current?.focus();
    },
    refInitVal: (value) => {
      setVal(value);
    },
    refResetVal: () => {
      setVal('');
    }
  }));

  return (
    <StyleWrap
      className={cn(
        'textarea-item', isFocus && 'isFocus', error && 'error', disabled && 'disabled'
      )}
      $maxWidth={$maxWidth ? $maxWidth : undefined}
      $height={$height ? $height : undefined}
      $lineColor={$lineColor}
      $focusColor={$focusColor}
    >
      <label>
        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          className={cn('textarea', className && className, $defaultLine !== 'none' && $defaultLine)}
          value={val}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
          onKeyUp={handleKeyUp}
          onChange={handleOnChange}
          placeholder={placeholder}
          disabled={disabled}
          title={placeholder ? placeholder : (title ?? '입력 해주세요')}
          rows={5} // 기본 높이 조정 가능
        />
      </label>
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

const StyleWrap = styled.div<TextareaStylePropsType>`
  display: block;
  position: relative;
  width: 100%;
  ${props => props.$maxWidth && 
    (typeof props.$maxWidth === 'number' ? `max-width: ${props.$maxWidth}px;` : `max-width: ${props.$maxWidth};`)
  }
  ${props => props.$height && 
    (typeof props.$height === 'number' ? `height: ${props.$height}px;` : `height: ${props.$height};`)
  }
  font-size: 16px;
  line-height: 1;
  .textarea {
    display: block;
    width: 100%;
    height:100%;
    padding: 8px 30px 8px 10px;
    border: 1px solid transparent;
    border-radius: 5px;
    background: transparent;
    font-size: inherit;
    transition: border-color .3s;
    outline: 0;
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
    resize: none;
    ${scrollBar("y")}
    &:disabled {
      border-color: ${colors.lineColor};
      background: ${colors.disabled};
      color: ${textColor.desc};
    }

    &.line {
      border-color: ${colors.lineColor};
    }

    &.line-bottom {
      outline: 0;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid ${colors.lineColor};
    }
    
  }

  .remove {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  &.isFocus {
    .textarea {
      border-color: ${({ $focusColor }) => $focusColor};
      &.line-bottom {
        border-bottom: 1px solid ${({ $focusColor }) => $focusColor};
      }
    }
  }

  &.disabled {
    .textarea {
      background: ${colors.disabled};
      border-color: ${colors.lineColor};
      color: ${textColor.desc};
    }
  }

  &.error {
    .textarea {
      color: ${colors.red};
      border-color: ${colors.red};
    }
  }
`;
