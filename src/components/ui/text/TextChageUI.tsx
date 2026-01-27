import { cn } from '@/utils/common';
import { useMemo } from 'react';
import styles from './TextChageUI.module.scss';

// 🔹 텍스트 한 줄 여러개 순차적 보여주기 
interface TextChageUIPropsType {
  textData?: string[], // 최대 4개 체크
  align?: 'left' | 'center' | 'right',
  color?: 'black' | 'white' | 'point' | 'sub',
  animationOpt?: {
    speed?: 2 | 3 | 4, // 2~4초 : 노출되는 시간
    delay?: number, // 텍스트 1개이며 딜레이 시간 있는 경우 1회 모션 
  }
  className?:string,
}

export const TextChageUI = ({
  textData = ['text'],
  align = 'left',
  color,
  animationOpt = {},
  className
}: TextChageUIPropsType) => {
  const { speed = 2, delay = 0 } = animationOpt;
  const maxTextLength = textData.slice(0, 4); // 최대 4개로 제한
  const isAnimation = maxTextLength.length >= 2;
  const hasDelayOnly = maxTextLength.length === 1 && delay > 0; // 1개 + delay

  // 가장 긴 문자열 - 가로 크기를 구하기 위해
  const baseIndex = useMemo(() => {
    return maxTextLength.reduce((maxIdx, cur, idx, arr) => {
      return cur.length > arr[maxIdx].length ? idx : maxIdx;
    }, 0);
  }, [maxTextLength]);

  return (
    <p
      className={cn(
        styles.textChange,
        !isAnimation && !hasDelayOnly && styles.static, // 애니메이션도 없고 delay도 없을 때
        align && styles[align],
        color && styles[color],
        hasDelayOnly && styles.delayOnly,
        className
      )}
      data-max={isAnimation ? maxTextLength.length : undefined}
      data-speed={isAnimation ? speed : undefined}
    >
      {maxTextLength.map((textItem, textIdx) => {
        const isBase = textIdx === baseIndex;
        const textDelay = isAnimation ? delay + (textIdx * speed) : delay;
        return (
          <span
            className={cn(
              styles.text,
              isBase && styles.base,
            )}
            style={(isAnimation || hasDelayOnly) ? {
              animationDelay: `${textDelay}s`,
            } : undefined}
            key={textIdx}
          >
            {textItem}
          </span>
        );
      })}
    </p>
  )
}