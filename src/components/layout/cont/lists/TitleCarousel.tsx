
import { Carousel, type CarouselOptType } from '@/components/element/carousel/Carousel';
import styles from './TitleCarousel.module.scss';
import { cn } from '@/utils/common';

// 🔹 TC(Title Carousel) 타이틀 + 캐러셀
interface TitleCarouselPropsType {
  title?: string,
  desc?: string,
  titleClass?: string,
  descClass?: string,
  carouselClass?: string,
  carouselMode?: 'inner' | 'full' | 'full-cont',
  carouselOpt?: CarouselOptType;
  children: React.ReactNode, // 슬라이드
}

export const TitleCarousel = ({
  title, desc, 
  titleClass, descClass, carouselClass,
  carouselMode, carouselOpt, children 
}: TitleCarouselPropsType) => {
  return (
    <div className={styles.titleCarousel}>
      <div className={cn(styles.heading, titleClass)}>
        <h3 className="title">{title}</h3>
        {desc && <p className={cn(styles.desc, descClass)}>{desc}</p>}
      </div>
      <div className={cn(
        carouselMode === 'full' && styles.full,
        carouselMode === 'full-cont' && styles.fullCont,
        styles['tc-carousel'])}
      >
        <Carousel
          carouselOpt={carouselOpt && carouselOpt}
          swiperClassName={cn(styles.carousel)}
        >
          {children}
        </Carousel>
      </div>
    </div>
  )
}