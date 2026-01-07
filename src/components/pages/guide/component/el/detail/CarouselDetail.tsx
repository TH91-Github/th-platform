import { Carousel } from "@/components/element/carousel/Carousel";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import { cn } from "@/utils/common";
import styled from "@emotion/styled";
import styles from '../../Detail.module.scss';
import { Hljs } from "@/components/element/highlight/Hljs";
import { stripIndent } from "@/utils/textUtils";

// 🔹 Carousel 컴포넌트 설명
const DETAIL_TITLE ='Btn';
export const CarouselDetail = () => {
  const exCode = stripIndent(`
    <Carousel>
      {data.map((item, idx) => (
        <div key={idx}>
          <span>item</span>
        </div>
      ))}
    </Carousel>`
    );

  return ( 
    <div className={cn('guide-detail',styles.sectionWrap)}>
      <div className={styles.sectionHeading}>
        <TitlePoint
          titleTag={'p'}
          title={DETAIL_TITLE}
          pointType="underline"
          $fontSize={20}
          className={styles.tit}
        />
        <p className={styles.desc}>가로 크기, 정렬, 자동 닫기, 모달 중첩, 포커스 이동 및 이탈 방지 기능이 포함되어 있습니다.</p>
        {/* <ul className={cn(styles.linkLists, 'bullet-lists')}>
          <li>
            <OutLink
              href={'/'}
              title={'url 입력하기'}
            />
          </li>
        </ul> */}
      </div>
      <div className={styles.sectionLists}>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} 데모`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>기본 Carousel, 추가 옵션 x</p>
            <p className={styles.desc}>lists item 1개일 경우 동작 x</p>
            <p className={styles.desc}>default view : 1 / spaceBetween : 10</p>
            <div className={styles.demo}>
              <Carousel>
                {Array(3).fill('_').map((_, listIdx) => (
                  <StyleSlideItem key={listIdx}>
                    <span>case{'-'+(listIdx+1)}</span>
                  </StyleSlideItem>
                ))}
              </Carousel>
            </div>    
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} 좌우 네비게이터 및 페이지네이션`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>좌우 버튼 및 하단 페이지네이션</p>
            <p className={styles.desc}>pagination:{`{clickable:true}`} / navigation : true</p>
            <div className={styles.demo}>
              <Carousel
                carouselOpt={{
                  pagination: {
                    clickable: true
                  },
                  navigation: true
                }}
              >
                {Array(3).fill('_').map((_, listIdx) => (
                  <StyleSlideItem key={listIdx}>
                    <span>case{'-'+(listIdx+1)}</span>
                  </StyleSlideItem>
                ))}
              </Carousel>
            </div>    
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} 무한, 자동 플레이`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>default view : 4 / loop : true / autoplay: {`{delay:2000}`}</p>
            <div className={styles.demo}>
              <Carousel
                carouselOpt={{
                  slidesPerView: 4,
                  loop:true,
                  autoplay: {
                    delay: 2000,
                  }
                }}
              >
                {Array(8).fill('_').map((_, listIdx) => (
                  <StyleSlideItem key={listIdx}>
                    <span>case{'-'+(listIdx+1)}</span>
                  </StyleSlideItem>
                ))}
              </Carousel>
            </div>    
          </div>
        </div>

        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} Progressbar`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>좌우 버튼 및 하단 페이지네이션</p>
            <p className={styles.desc}>pagination:{`{clickable:true, type:'progressbar'}`}, navigation: true,</p>
            <div className={styles.demo}>
              <Carousel
                carouselOpt={{
                  pagination:{
                    clickable:true,
                    type:'progressbar'
                  },
                  navigation:true, 
                }}
              >
                {Array(3).fill('_').map((_, listIdx) => (
                  <StyleSlideItem key={listIdx}>
                    <span>case{'-'+(listIdx+1)}</span>
                  </StyleSlideItem>
                ))}
              </Carousel>
            </div>    
          </div>
        </div>

        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} Effect 옵션 Creative`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>effect:'creative' / centeredSlides: true / loop: true / creativeEffect:{`{prev:{...},next:{...}}`}</p>
            <div className={styles.demo}>
              <Carousel
                carouselOpt={{
                  centeredSlides: true, 
                  loop:true,
                  effect:'creative',
                  creativeEffect:{
                    prev: {
                      translate: [0, 0, 120],
                      scale: 1.5,
                      opacity: 0,
                      origin: 'center',
                      shadow: true,
                    },
                    next: {
                      translate: [0, -20, -120],
                      scale: 0.6,
                      opacity: 0.4,
                      origin: 'center',
                      shadow: true,
                    },
                  }
                }}
              >
                {Array(5).fill('_').map((_, listIdx) => (
                  <StyleSlideItem key={listIdx}>
                    <span>case{'-'+(listIdx+1)}</span>
                  </StyleSlideItem>
                ))}
              </Carousel>
            </div>    
          </div>
        </div>
      </div>
      <div className={styles.codeWrap}>
        <TitlePoint
          titleTag={'p'}
          title={`${DETAIL_TITLE} 사용 예`}
          pointType="underline"
          className={styles.tit}
        />
        <Hljs
          code={exCode}
          language={'tsx'}
          className={styles.code}
        />
      </div>
    </div>
  )
}

const StyleSlideItem = styled.div`
  display:flex;
  justify-content:center;
  align-items: center;
  border:1px solid var(--color-point);
  height:150px;
  background-color:var(--color-bg);
`;