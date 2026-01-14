import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { A11y, Autoplay, EffectCards, EffectCreative, FreeMode, Mousewheel, Navigation, Pagination, Scrollbar, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide, type SwiperClass, type SwiperProps, type SwiperRef } from 'swiper/react';
import { IconArrowLeft, IconArrowRight, IconPause, IconPlay } from '@/assets/icon';
import { cn } from '@/utils/common';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';

import styles from "./Carousel.module.scss";

export type CarouselOptType = SwiperProps;
// 🔹 carousel
interface CarouselPropsType {
  ref?: React.Ref<CarouselRefType>,
  children: React.ReactNode, // slide item
  carouselOpt?: CarouselOptType, // carouse 옵션
  className?: string, // swiper(carousel)
  swiperClassName?: string, // wrap 전체
  slideClaseeName?: string, // swiper-slide
  onCarousel?: (e: SwiperClass) => void;
  onChangeEvent?: (e: SwiperClass) => void;
}

export interface CarouselRefType { // ref 옵션
  getCarouselElement: () => SwiperRef | null;
  carouselSlideTo: (index: number) => void;
  carouselUpdate: () => void;
}

// 기본 옵션 설정
const DEFAULT_OPT: CarouselOptType = {
  slidesPerView: 1,
  spaceBetween: 10,
  watchOverflow: true,
  observer: false,
  observeParents: false,
};

export const Carousel = ({
  ref,
  children,
  carouselOpt,
  className,
  swiperClassName,
  slideClaseeName,
  onCarousel,
  onChangeEvent,
}: CarouselPropsType) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const option = useMemo<CarouselOptType>(() => {
    return { ...DEFAULT_OPT, ...carouselOpt };
  }, [carouselOpt]);

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  const modules = useMemo(() => {
    const result = [A11y];

    if (option.navigation) result.push(Navigation);
    if (option.pagination) result.push(Pagination);
    if (option.autoplay) result.push(Autoplay);
    if (option.freeMode) result.push(FreeMode);
    if (option.scrollbar) result.push(Scrollbar);
    if (option.mousewheel) result.push(Mousewheel);
    if (option.virtual) result.push(Virtual);
    if (option.effect === 'cards') result.push(EffectCards);
    if (option.effect === 'creative') result.push(EffectCreative);

    return result;
  }, [
    option.navigation,
    option.pagination,
    option.autoplay,
    option.freeMode,
    option.scrollbar,
    option.mousewheel,
    option.virtual,
    option.effect
  ]);

  useEffect(() => {
    if (!option.autoplay) {
      setIsPlaying(false);
    }
  }, [option.autoplay]);

  const handleAutoPlay = useCallback(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;

    if (!swiper.autoplay) return;
    if (isPlaying) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setIsPlaying(prev => !prev);
  }, [isPlaying]);

  const updateScrollableState = useCallback((swiper: SwiperClass) => {
    const isScrollable = !swiper.isLocked;

    // swiper.el === .swiper
    swiper.el.dataset.scrollable = String(isScrollable);
  }, []);

  const handleChange = useCallback((swiper: SwiperClass) => {
    onChangeEvent?.(swiper);
  }, [onChangeEvent]);

  const handleOnSwiper = useCallback((swiper: SwiperClass) => {
    onCarousel?.(swiper);
    updateScrollableState(swiper);
  }, [onCarousel, updateScrollableState]);



  useEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;

    // Navigation 초기화 및 재지정 
    if (option.navigation && swiper.params.navigation && typeof swiper.params.navigation === "object") {
      swiper.params.navigation.prevEl = prevBtnRef.current || undefined;
      swiper.params.navigation.nextEl = nextBtnRef.current || undefined;
      swiper.navigation.init();
      swiper.navigation.update();
    }

    // Pagination 초기화 및 재지정
    if (option.pagination && paginationRef.current && swiper.params.pagination && typeof swiper.params.pagination === 'object') {
      swiper.params.pagination.el = paginationRef.current;
      if (typeof option.pagination !== 'boolean') {
        swiper.params.pagination.clickable = option.pagination.clickable ?? true;
        if (option.pagination.type) swiper.params.pagination.type = option.pagination.type;
        if (option.pagination.dynamicBullets !== undefined) {
          swiper.params.pagination.dynamicBullets = option.pagination.dynamicBullets;
        }
      } else {
        swiper.params.pagination.clickable = true;
      }
      swiper.pagination.destroy();
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    }
  }, [option.navigation, option.pagination]);

  useImperativeHandle(ref, () => ({
    getCarouselElement: () => swiperRef.current,
    carouselSlideTo: index => swiperRef.current?.swiper.slideTo(index),
    carouselUpdate: () => swiperRef.current?.swiper.update()
  }));


  return (
    <div
      className={cn(
        'carousel-wrap',
        styles.carouselWrap,
        className,
        option.direction === 'vertical' && styles.vertical,
        childrenArray.length < 2 && styles['not-swiper']
      )}
    >
      <div className={styles.inner}>
        <Swiper
          ref={swiperRef}
          modules={modules}
          className={cn(styles.carousel, swiperClassName)}
          {...option}
          virtual={option.virtual ? { slides: childrenArray } : undefined}
          navigation={false} // 초기 사용 x 옵션 판단 후 재지정
          pagination={false} // 초기 사용 x 옵션 판단 후 재지정
          onSwiper={handleOnSwiper}
          onSlideChange={handleChange}
          onResize={updateScrollableState}
          onUpdate={updateScrollableState}
        >
          {!option.virtual && childrenArray.map((childEl, index) => (
            <SwiperSlide key={index} className={cn(styles.slide, slideClaseeName)}>
              {childEl}
            </SwiperSlide>
          ))}
        </Swiper>
        {(option.navigation) && (
          <div className={cn(styles.navigation, 'carousel-navigation')}>
            <button
              ref={prevBtnRef}
              type="button"
              className={cn(styles.btn, styles.prev, 'btn prev')}>
              <i className={styles.icon}><IconArrowLeft /></i>
              <span className="blind">이전</span>
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              className={cn(styles.btn, styles.next, 'btn next')}>
              <i className={styles.icon}><IconArrowRight /></i>
              <span className="blind">다음</span>
            </button>
          </div>
        )}
      </div>
      {/* pagination, autoplay */}
      {option.pagination && (
        <div className={cn(styles.control, 'carousel-control')}>
          {option.pagination && (
            <div ref={paginationRef} className={cn(styles.pagination, 'carousel-pagination')}>
            </div>
          )}
          {(option.pagination && option.autoplay) && (
            <div className={cn(styles.autoplay, 'carousel-autoplay')}>
              <button
                type="button"
                className={cn(styles.btn, styles[isPlaying ? 'stop' : 'play'])}
                onClick={handleAutoPlay}>
                {isPlaying
                  ? <>
                    <i className={styles.icon}>
                      <IconPause />
                    </i>
                    <span className="blind">정지</span>
                  </>
                  : <>
                    <i className={styles.icon}>
                      <IconPlay />
                    </i>
                    <span className="blind">재생</span>
                  </>
                }
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
