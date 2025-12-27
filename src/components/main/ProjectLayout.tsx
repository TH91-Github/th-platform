
import { TitleCarousel } from '../layout/cont/lists/TitleCarousel';
import styles from './ProjectLayout.module.scss';

export const ProjectLayout = () => {
  return (
    <div className={styles.project}>
      {/* 큰 박스 리스트 */}
      <div className={`${styles.portfolio}`}>
        <TitleCarousel 
          title="test"
          desc="tset"
          carouselMode="full-cont"
          carouselOpt={{
            navigation: true,
            pagination: {
              clickable: true
            },
          }}
        >
          {Array(5).fill(0).map((_, idx) => (
            <li key={idx}>
              <div className={styles.box}>
                <p className={`tit`}>Title</p>
                <p className="text">TEST TEXT TEST TEXT</p>
              </div>
            </li>
          ))}
        </TitleCarousel>
      </div>
      {/* 리스트 + 상세 정보 레이아웃  */}
      <div className={styles.client}>
         <TitleCarousel 
          title="test2"
          desc="test2"
          carouselMode="full-cont"
          carouselOpt={{
            slidesPerView: 'auto',
          }}
        >
          {Array(10).fill(0).map((_, idx) => (
            <li key={idx}>
              <div className={styles.box}>
                <p className={`tit`}>Title</p>
                <p className="text">TEST TEXT TEST TEXT</p>
              </div>
            </li>
          ))}
        </TitleCarousel>
        <div className={styles.detail}>
          <div className={styles.info}>
            정보
          </div>
          <div className={styles.history}>
            이력
          </div>
        </div>
      </div>

    </div>
  )
}