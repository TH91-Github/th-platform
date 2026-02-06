import { ParticleHeading } from '@/components/layout/cont/heading/ParticleHeading';
import styles from './NoticePage.module.scss';
// 🔹 공지사항 및 게시판 
export const NoticePage = () => {
  return (
    <div className={styles.noticePage}>
      <ParticleHeading title="공지사항" />
    </div>
  )
}