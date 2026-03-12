import { ParticleNetwork } from "@/components/isolated/particle-network/ParticleNetwork"
import styles from './MainBgFixed.module.scss';

export const MainBgFixed = () => {
  return (
    <div className={styles.fixedBg}>
      {/* 비주얼 요소 */}
      <ParticleNetwork />
    </div>
  )
}