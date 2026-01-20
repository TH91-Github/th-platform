import { ParticleNetwork } from '@/components/isolated/particle-network/ParticleNetwork';
import { SplitText } from '../../ui/text/SplitText';
import { TextChageUI } from '../../ui/text/TextChageUI';
import styles from './MainVisual.module.scss';


const APP_TITLE = import.meta.env.VITE_APP_TITLE;
const MAIN_SUB_TEXT = [
  ['기록 공유 플랫폼 서비스','개발 가이드','메모, 가계부, 일정, 여행'],
  ['로그인/회원 가입 후','디자인부터 컴포넌트 등','기록 서비스 준비 중'],
  ['기록을 저장하고 공유!','확인부터 사용까지 일관성 있게 사용하기','개발 진행 중'],
]
export const MainVisual = () => {
  return (
    <div className={styles.visual}>
      {/* 비주얼 요소 */}
      <ParticleNetwork />
      <div className={styles.center}>
        <h2 className={styles.title}>
          <SplitText
            value={APP_TITLE}
            animationName="fadeIn"
            animationOpt={{
              delay: 1,
              speed: 3,
              delayStep: 1
            }}
          />
        </h2>
        <div className={styles.subText}>
          {MAIN_SUB_TEXT.map((textItem, textIdx) => (
            <TextChageUI
              textData={textItem}
              align='right'
              animationOpt={{
                speed: 4,
                delay: Number(`${3}.${textIdx}`),
              }}
              color="sub"
              key={textIdx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}