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
import styles from "./Carousel.module.scss";

export type CarouselOptType = SwiperProps;
// 🔹 carousel
interface CarouselPropsType {
  ref?: React.Ref<CarouselRefType>,
  children: React.ReactNode, // slide item
  carouselOpt?: CarouselOptType, // carouse 옵션
  className?:string,
  onCarousel?: (e:SwiperClass) => void;
  onChangeEvent?: () => void;
}

export interface CarouselRefType { // ref 옵션
  getCarouselElement: () => SwiperRef | null;
  carouselSlideTo: (index: number) => void;
  carouselUpdate: () => void;
}

// 기본 옵션 설정
const DEFAULT_OPT: CarouselOptType = {
  spaceBetween: 10,
  observer: true,
  observeParents: true,
  watchOverflow: true,
  virtual: false
};

export const Carousel = ({
  ref,
  children,
  carouselOpt,
  className,
  onCarousel,
  onChangeEvent,
}: CarouselPropsType) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const option = useMemo(() => ({ ...DEFAULT_OPT, ...carouselOpt }), [carouselOpt]);

  const modules = useMemo(() => {
    const base = [Navigation, Pagination, A11y, Autoplay, Virtual, FreeMode, Scrollbar, Mousewheel];
    if (option.effect === "cards") base.push(EffectCards);
    if (option.effect === "creative") base.push(EffectCreative);
    return base;
  }, [option.effect]);

  const handleAutoPlay = useCallback(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;

    isPlaying ? swiper.autoplay.stop() : swiper.autoplay.start();
    setIsPlaying(prev => !prev);
  }, [isPlaying]);

  const handleChange = () => {
    onChangeEvent && onChangeEvent();
  };

  const handleOnSwiper = (swiper:SwiperClass) => {
    onCarousel && onCarousel(swiper);
  }

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

  console.log(option )
  
  return (
    <div 
      className={cn(
        styles.carouselWrap, 
        option.direction ==='vertical'&& styles.vertical, 
        React.Children.toArray(children).length < 2 && styles['not-swiper']
      )}
    >
      <div className={styles.inner}>
        <Swiper
          ref={swiperRef}
          modules={modules}
          virtual={option.virtual ? { slides: React.Children.toArray(children) } : undefined}
          slidesPerView={option.slidesPerView}
          {...option}
          navigation={false} // 초기 사용 x 옵션 판단 후 재지정
          pagination={false} // 초기 사용 x 옵션 판단 후 재지정
          onSwiper={handleOnSwiper}
          onSlideChange={handleChange}
          className={cn(styles.carousel, className)}
        >
          {React.Children.toArray(children).map((childEl, index) => (
            <SwiperSlide key={index} className={cn(styles.slide)}>
              {childEl}
            </SwiperSlide>
          ))}
        </Swiper>
        {(option.navigation) && (
          <div className={styles.navigation}>
            <button 
              ref={prevBtnRef}
              type="button"
              className={cn(styles.btn, styles.prev)}>
              <span className={styles.icon}><IconArrowLeft /></span>
              <span className="blind">이전</span>
            </button>
            <button 
              ref={nextBtnRef}
              type="button"
              className={cn(styles.btn, styles.next)}>
              <span className={styles.icon}><IconArrowRight /></span>
              <span className="blind">다음</span>
            </button>
          </div>
        )}
      </div>
      {/* pagination, autoplay */}
      {(option.pagination || option.autoplay) && (
        <div className={styles.control}>
          {option.pagination && (
            <div ref={paginationRef} className={styles.pagination}>
            </div>
          )}
          {option.autoplay && (
            <div className={styles.autoplay}>
              <button
                type="button"
                className={cn(styles.btn, styles[isPlaying?'stop':'play'])}
                onClick={handleAutoPlay}>
                  {
                    isPlaying
                      ? <>
                        <span className={styles.icon}>
                          <IconPause />
                        </span>
                        <span className="blind">정지</span>
                      </>
                      : <>
                        <span className={styles.icon}>
                          <IconPlay />
                        </span>
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
