import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide, SwiperClass, SwiperProps, SwiperRef } from 'swiper/react';
import { A11y, Autoplay, Mousewheel, Navigation, Pagination, Scrollbar, EffectCreative, Virtual, EffectCards, FreeMode } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';
import styled from 'styled-components';
import { cn } from 'utils/common';
import { colors } from 'assets/style/variables';
import { SvgArrow } from 'assets/svg/Common';

interface CarouselPropsType {
  children: React.ReactNode,
  customClass?: string,
  customClassSlide?:string,
  carouselOpt?: SwiperProps,
  onCarousel?: () => void,
  onChangeEvent?: () => void,
}
interface CarouselRefType {
  getCarouselElement: () => SwiperRef | null,
  carouselSlideTo: (e:number) => void,
  carouselUpdate: () => void,
}

const DEFAULT_OPT: SwiperProps = {
  spaceBetween: 10,
  observer:true,
  observeParents:true,
  watchOverflow: true,
  virtual:false,
};

export default forwardRef<CarouselRefType, CarouselPropsType>(({
  children, 
  customClass = 'carousel',
  customClassSlide,
  carouselOpt, 
  onCarousel, onChangeEvent
}, ref) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); 
  const option = useMemo(() => ({ ...DEFAULT_OPT, ...carouselOpt }), [carouselOpt]);
  const modules = useMemo(() => {
    //기본 모듈
    const baseModules = [Navigation, Pagination, A11y, Autoplay, Virtual, FreeMode, Scrollbar, Mousewheel];
    if (option.effect === 'cards') baseModules.push(EffectCards);
    if (option.effect === 'creative') baseModules.push(EffectCreative);
    return baseModules;
  }, [option.effect]);

  const handleAutoPlay = useCallback(() => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current?.swiper.autoplay.stop();
    } else {
      swiperRef.current?.swiper.autoplay.start();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  const handleChange = (e:SwiperClass) => {
    onChangeEvent && onChangeEvent();
  }

  const handleInit = (swiper:SwiperClass) => {
    // pagination
    if (swiper.params.pagination && typeof swiper.params.pagination === 'object') {
      swiper.params.pagination.el = paginationRef.current;

      if(option.pagination && typeof option.pagination !== 'boolean'){
        swiper.params.pagination.clickable = option.pagination.clickable;
        swiper.params.pagination.type = option.pagination.type;
      }else if(option.pagination && typeof option.pagination === 'boolean'){
        swiper.params.pagination.clickable = true
      }
    }

    // NavigationOptions 타입인 경우에만 
    if (swiper.params.navigation && typeof swiper.params.navigation === "object") {
      swiper.params.navigation.prevEl = prevBtnRef.current || undefined;
      swiper.params.navigation.nextEl = nextBtnRef.current || undefined;
    }
  }
  
  const updateSwiperLockClass = useCallback((swiper: SwiperClass) => {
  const wrapperEl = swiper.el; // swiper root elemen
  if (swiper.isLocked) {
    wrapperEl.classList.add('is-locked');
    wrapperEl.classList.remove('is-unlocked');
  } else {
    wrapperEl.classList.remove('is-locked');
    wrapperEl.classList.add('is-unlocked');
  }
}, []);
  const handleOnSwiper = (e:SwiperClass) => {
     updateSwiperLockClass(e);
    onCarousel && onCarousel();
  }

  useImperativeHandle(ref, () => ({
    getCarouselElement: () => swiperRef.current,
    carouselSlideTo: (idx) =>{
      swiperRef.current?.swiper.slideTo(idx)
    },
    carouselUpdate:()=>{
      swiperRef.current?.swiper.update();
    }
  }));
  return(
    <StyleWrap 
      className={cn(
        'carousel-wrap', 
        option.direction ==='vertical'&& 'vertical', 
        React.Children.toArray(children).length < 2 && 'not-swiper'
      )}
    >
      <div className="carousel-inner">
        <Swiper
          ref={swiperRef}
          modules={modules}
          virtual={option.virtual ? { slides: React.Children.toArray(children) } : undefined}
          onSwiper={handleOnSwiper}
          onBeforeInit={handleInit}
          onSlideChange={handleChange}
          {...option}
          pagination={false} // pagination 예외 onBeforeInit 재할당
          navigation={false} // navigation 예외 onBeforeInit 재할당
          className={customClass}
        >
          {React.Children.toArray(children).map((childEl, index) => (
            <SwiperSlide key={index} className={cn('carousel-item', customClassSlide)}>
              {childEl}
            </SwiperSlide>
          ))}
        </Swiper>
        {(option.navigation || option.autoplay) && (
          <div className="carousel-btns">
            {option.navigation && (
              <>
                <button 
                  ref={prevBtnRef}
                  type="button"
                  className="btn-prev">
                  <span className="icon"><SvgArrow $fill={colors.mSlateBlue}/></span>
                  <span className="blind">이전</span>
                </button>
                <button 
                  ref={nextBtnRef}
                  type="button"
                  className="btn-next">
                  <span className="icon"><SvgArrow $fill={colors.mSlateBlue}/></span>
                  <span className="blind">다음</span>
                </button>
              </>
            )}
            {option.autoplay && (
              <div className="autoplay-btn">
                <button
                  type="button"
                  className={`btn ${isPlaying?'stop':'play'}`}
                  onClick={handleAutoPlay}>
                    <span>{isPlaying? '정지' : '재생'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {option.pagination && (
        <div ref={paginationRef} className="carousel-pagination">
        </div>
      )}
    </StyleWrap>
  );
});

const StyleWrap = styled.div`
overflow:hidden;
position:relative;
width:100%;
.carousel-inner{
  position:relative;
}
&.vertical {
  height:100%;
  .carousel-inner, .swiper{ 
    height:100%;
  }
}
.swiper-wrapper{
  transform-style:initial;
}
.carousel-pagination {
  display:flex;
  justify-content:center;
  gap:5px;
  position:relative;
  width:100%;
  margin-top:15px;
  &.swiper-pagination-progressbar{
    .swiper-pagination-progressbar-fill{
      background:${colors.mSlateBlue};
    }
  }
  .swiper-pagination-bullet {
    margin:0;
    background:${colors.gray};
    opacity:0.7;
  }
  .swiper-pagination-bullet-active {
    background: ${colors.mSlateBlue};
    opacity:1;
  }
}
.carousel-btns{
  & > button {
    display:block;
    position:absolute;
    z-index:1;
    top:50%;
    width:30px;
    height:30px;
    transform: translateY(-50%);
  }
  .btn-prev {
    left:0;
    svg{
      transition: stroke var(--transition)
    }
  }
  .btn-next{
    right:0;
    .icon{
      transform:scaleX(-1);
    }
  }
  .swiper-button-lock {
    display:none;
  }
  .swiper-button-disabled{
    svg {
      stroke: ${colors.gray};
    }
  }
  .icon{
    display:block;
  }
}
`;