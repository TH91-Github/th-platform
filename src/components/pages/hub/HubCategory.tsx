import { Carousel } from '@/components/element/carousel/Carousel';
import { hubTotalData } from '@/data/hub/hubData';
import { cn } from '@/utils/common';
import { capitalizeWords } from '@/utils/textUtils';
import styles from './HubCategory.module.scss';
import { HubCategoryIconMap } from './HubCategoryIconMap';
import { TitlePoint } from '@/components/ui/text/TitlePoint';
import { Count } from '@/components/element/count/Count';
import { useAuthUser } from '@/hook/auth/useAuthUser';

// 🔹 카테고리 - 클릭 시 ContLists 필터 적용하여 보여진다
export const HubCategory = () => {
  const { data: user } = useAuthUser();
  // DB 연동 후 토탈 값 적용 필요.
  const filterData = hubTotalData;

  return (
    <div className={styles.hubCategory}>
      <Carousel
        carouselOpt={{
          slidesPerView: 'auto',
          freeMode: true,
        }}
        slideClaseeName={styles.categoryItem}
      >
        { filterData.map((totalItem, totalIdx) => (
          <div className={styles.totalItem} key={totalIdx}>
            <span className={styles.categoryTag}>{totalItem.totalTitle}</span>
            <Carousel
              className="total-carousel"
              enableAfterInit={500}
              carouselOpt={{
                slidesPerView: 1,
                spaceBetween: 0,
                touchRatio: 0,
                navigation : true,
                effect: "creative",
                creativeEffect: {
                  prev: {
                    translate: [0, 0, 0],
                    scale: 1.1,
                    opacity: 0,
                    origin: "center",
                  },
                },
              }}
            >
              { totalItem.totalLists.map((listItem) => (
                <div className={cn(styles.listsBox, 'list-box')} key={listItem.id}>
                  <TitlePoint 
                    pointType="underline"
                    title={listItem.title}
                    $fixFontSize={18}
                  />
                  <div className={styles.totalNum}>
                    <i>{HubCategoryIconMap[`${totalItem.totalCategory}${capitalizeWords(listItem.id)}`]}</i>
                    <span className={styles.num}>
                      <Count end={listItem.total} useComma={true} />
                    </span>
                  </div>
                  <p className={styles.desc}>{listItem.desc}</p>
                </div>
              ))}
            </Carousel>
          </div>
        ))}
      </Carousel>
    </div>
  )
}