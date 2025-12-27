import { Input } from '@/components/element/form/input/Input';
import { TitlePoint } from '@/components/ui/text/TitlePoint';
import { cn } from '@/utils/common';
import { useState } from 'react';
import styles from './FontsGuidePage.module.scss';


const DEFAULT_FONT_TEXT = 'Pretendard 굵기 미리보기입니다.';
export const FontsGuidePage = () => {
  const [fontValue, setFontValue] = useState(DEFAULT_FONT_TEXT);

  const handleChange = (val:string) =>{
    setFontValue(val ? val : DEFAULT_FONT_TEXT);
  }

  return( 
    <div className={styles.guideFont}>
      <TitlePoint
        title="Pretendard 굵기 미리보기"
        pointType="underline"
      />
      <div className={styles.preview}>
        <span className={styles.inputItem}>
          <Input 
            placeholder='입력해보세요. 😄'
            className={styles.input}
            changeEvent={handleChange}
          />
        </span>
        <p className={styles.tit}>👈 확인하고 싶은 글 미리보기</p>
      </div>
      <div className={styles.previewText}>
        <ul>
          {Array(9).fill(0).map((_, idx) => (
            <li className={cn(styles.textitem ,idx === 4 && styles.active)} key={idx}>
              <span className={styles.tit}>weight - {(idx+1) * 100}</span>
              <span className={styles.text}>{fontValue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
