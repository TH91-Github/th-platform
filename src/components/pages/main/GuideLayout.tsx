import { useIntersection } from '@/hook/common/useIntersectionObserver';
import styles from './GuideLayout.module.scss';
import { cn } from '@/utils/common';

const mainGuideText = ['Component','Modules','Layout','Hook','Utils','Design','ETC','Guide']
export const GuideLayout = () => {
  const { observerRef, observerVisible } = useIntersection<HTMLDivElement>({
    threshold: 0.3,
    freezeOnceVisible: true,
  });

  return(
    <div 
      ref={observerRef} 
      className={cn(styles.guideLayout)}
      data-observer={observerVisible}
    >
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h3 className={styles.title}>개발 가이드</h3>
          <p className={styles.desc}>
            관된 개발 경험을 위한 디자인 시스템과 코드 가이드.<br />
            색상, 타이포그래피부터 재사용 가능한 <br className="mo-only" />컴포넌트와 유틸리티까지 <br />
            효율적이고 일관된 개발을 위한 통합 가이드
          </p>
        </div>
      </div>
      <div className={styles.objectSquare}>
        {mainGuideText.map((text,idx) => (
          <div className={styles.objectItem} key={idx} >
            <p className={styles.objText}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}