import { useMemo } from 'react';
import styles from './SplitText.module.scss';
import { cn } from '@/utils/common';

interface AnimationOptType {
  delay?: number,
  speed?: number, // 각 글자의 애니메이션 지속 시간 (default: 0.3)
  stopTime?: number, // 애니메이션 사이클 끝나고 대기 시간
  delayStep?: number, // 순차 딜레이: 0(없음), 1(0.1), 2(0.2)...
  sequential?: boolean, // 순차적으로 나올지 여부 (default: true)
}

interface SplitTextPropsType {
  value?: string;
  upperCase?: boolean;
  animationName?: 'SquashStretch' | 'fadeIn';
  animationOpt?: AnimationOptType;
  className?: string;
}

export const SplitText = ({
  value = 'Test',
  upperCase = false,
  animationName,
  animationOpt = {
    delay: 0,
    speed: 0.3,
    stopTime: 1,
    delayStep: 1,
    sequential: true,
  },
  className,
}: SplitTextPropsType) => {
  let nonSpaceNum = 0;

  // 대소문자 변환
  const textValue = useMemo(
    () => (upperCase ? value.toUpperCase() : value),
    [value, upperCase]
  );

  // 공백 제외한 글자 수
  const nonSpaceLength = useMemo(
    () => value.split('').filter(char => char.trim() !== '').length,
    [value]
  );

  // 글자별 delay 계산  - CSSProperties : css 타입
  const animationStyle = (opt: AnimationOptType, textIdx: number): React.CSSProperties => {
    const {
      delay = 0,
      delayStep = 1,
      speed = 0.3,
      stopTime = 1,
      sequential = true,
    } = opt;

    const style: React.CSSProperties = {};

    // sequential이 true면 순차 딜레이 적용
    const textDelay = sequential ? textIdx * (delayStep * 0.1) : 0;
    const aniDelay = delay + textDelay;

    if (aniDelay !== 0) {
      style.animationDelay = `${aniDelay}s`;
    }

    // 마지막 글자가 끝나는 시점까지의 딜레이
    const lastCharDelay = sequential ? (nonSpaceLength - 1) * (delayStep * 0.1) : 0;
    // 전체 시간 = 애니메이션 시간 + 마지막 글자까지의 딜레이 + 대기 시간
    const totalCycleTime = speed + lastCharDelay + stopTime;
    style.animationDuration = `${totalCycleTime}s`;

    return style;
  };

  return (
    <span
      className={cn(
        styles.splitText,
        animationName && styles[`${animationName}`],
        className
      )}
    >
      {textValue.split('').map((char, idx) => {
        // 애니메이션 이름이 있는 경우에만 적용
        const style = animationName
          ? animationStyle(animationOpt, nonSpaceNum)
          : {};
        // 공백이면 nonSpaceCounter 증가 안함
        if (char.trim() !== '') nonSpaceNum++;
        return (
          <span key={idx} className={styles.text} style={style}>
            {char}
          </span>
        );
      })}
    </span>
  );
};