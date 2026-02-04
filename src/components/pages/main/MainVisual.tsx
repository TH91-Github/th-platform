import { ParticleNetwork } from '@/components/isolated/particle-network/ParticleNetwork';
import { SplitText } from '../../ui/text/SplitText';
import { TextChageUI } from '../../ui/text/TextChageUI';
import styles from './MainVisual.module.scss';


const APP_TITLE = import.meta.env.VITE_APP_TITLE;
const MAIN_SUB_TEXT = [
  ['Customer Satisfaction','Communication','Contact Us'],
  ['Teamwork Spirit','FE/BE','서울시 강남구 학동로3길 10'],
  ['Professional Mind','Design','T 02-2017-2501'],
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
              delay: 0.5,
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