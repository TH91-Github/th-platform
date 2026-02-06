import { ParticleNetwork } from "@/components/isolated/particle-network/ParticleNetwork";
import styles from './ParticleHeading.module.scss';

interface ParticleHeadingPropsType { 
  title: string;
  desc?: string;
}
export const ParticleHeading = ({
  title, desc
}:ParticleHeadingPropsType) => {
  return (
    <div className={styles.headWrap}>
      <ParticleNetwork />
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
        {desc && <p className={styles.desc}>{desc}</p>}
      </div>
    </div>
  )
}