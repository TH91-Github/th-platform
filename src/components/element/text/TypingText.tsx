import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string[];
  typingSpeed?: number;
  startDelay?: number; 
  deletingSpeed?: number;
  endTime?: number;
  loop?: boolean;
  onComplete?: () => void;
  className?: string;
}

export const TypingText = ({
  text,
  typingSpeed = 120,
  startDelay = 1000,
  deletingSpeed = 80,
  endTime = 1500,
  loop = false,
  onComplete,
  className,
}: TypingTextProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (hasStarted) return;

    const timer = window.setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [hasStarted, startDelay]);

  useEffect(() => {
    if (!hasStarted || isFinished) return; 
    if (isFinished) return;

    const currentText = text[textIndex];
    let timeoutId: number;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeoutId = window.setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // 마지막 텍스트 + loop=false → 즉시 종료
        if (!loop && textIndex === text.length - 1) {
          setIsFinished(true);
          onComplete?.();
          return;
        }

        timeoutId = window.setTimeout(() => {
          setIsDeleting(true);
        }, endTime);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = window.setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % text.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [
    displayText,
    isDeleting,
    textIndex,
    text,
    typingSpeed,
    hasStarted,
    deletingSpeed,
    endTime,
    loop,
    isFinished,
    onComplete,
  ]);

  return (
    <StyleWrap className={className}>
      {displayText}
      {!isFinished && <span className="cursor">|</span>}
    </StyleWrap>
  );
};


// const blink = keyframes`
//   0%, 49% { opacity: 1; }
//   50%, 100% { opacity: 0; }
// `;

const StyleWrap = styled.p`
  min-height: 1.5em;
  font-size: 1.2rem;
  .cursor{
    margin-left: 2px;
    animation: cursorAni 1s infinite;
  }
  @keyframes cursorAni {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`;

