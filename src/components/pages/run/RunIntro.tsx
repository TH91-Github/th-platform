import { TypingText } from "@/components/element/text/TypingText";
import { cn } from "@/utils/common";
import { useEffect, useState } from "react";
import { SiRunrundotit } from "react-icons/si";
import styles from './RunIntro.module.scss';

interface RunIntroProps {
  onExitComplete: () => void;
}

export const RunIntro = ({ onExitComplete }: RunIntroProps) => {
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isTypingDone) return;

    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isTypingDone]);

  // 🔥 애니메이션 종료 후 부모에게 알림
  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      console.log('실행')
      onExitComplete();
    }, 2500); // animation duration과 맞추기

    return () => clearTimeout(timer);
  }, [isAnimating, onExitComplete]);

  return (
    <div className={cn(styles.intro, isAnimating && styles.fadeOut)}>
      <div className={cn(styles.heading, isAnimating && styles.moveUp)}>
        <h2 className={styles.title}>
          <i className={styles.icon}><SiRunrundotit /></i>
          unPulse
        </h2>

        <TypingText
          text={['뛰었어?', '뛰었으면 충분해!']}
          loop={false}
          onComplete={() => setIsTypingDone(true)}
          className={styles.text}
        />
      </div>
    </div>
  );
};
