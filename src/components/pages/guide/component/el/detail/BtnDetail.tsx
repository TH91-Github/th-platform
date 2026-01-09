import { Btn } from "@/components/element/button/Btn";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import { cn } from "@/utils/common";
import styles from '../../Detail.module.scss';
import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { stripIndent } from "@/utils/textUtils";

// 🔹 btn 컴포넌트 설명
const DETAIL_TITLE ='Btn';
const EX_CODE = stripIndent(`
  <Btn>
    <span>Btn</span>
  </Btn>`
);
export const BtnDetail = () => {
  
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
        <p className={styles.desc}>버튼 컴포넌트 (목적에 맞는 스타일 제공)</p>
        <p className={styles.desc}>bType: 버튼 스타일 / border(border 우선),disabled,skeleton : boolean</p>
        <p className={styles.desc}><span className="color">필수 구조</span>: button {`>`} span</p>
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
            title={`${DETAIL_TITLE} Default`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>기본 인터랙션 상태 제공 (default, hover, focus, disabled, skeleton, style)</p>
            <p className={styles.desc}>배경색 없이 최소한의 스타일을 가진 버튼</p>
            <div className={cn(styles.demo, styles.flex)}>
              <Btn bType="base"><span>btn</span></Btn>
              <Btn bType="base" ghost ={true}><span>색 반전</span></Btn>
              <Btn disabled={true}><span>btn disabled</span></Btn>
              <div className={styles.w100}>
                <Btn ellipsis={true}><span>btn ellipsis Test</span></Btn>
              </div>
              <Btn skeleton={true}><span>btn skeleton-item</span></Btn>
              <div className={styles.itemfull}>
                <Btn size="full"><span>btn full-item</span></Btn>
              </div>
            </div>      
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} Primary`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>배경색이 있는 버튼, 시각적 우선 순위 버튼</p>
            <p className={styles.desc}>확인 등 화면 내 결정하는 버튼으로 사용</p>
            <p className={styles.desc}>bType="<span className="color">primary</span>"</p>
            <div className={cn(styles.demo, styles.flex)}>
              <Btn bType="primary"><span>btn</span></Btn>
              <Btn bType="primary" ghost ={true}><span>색 반전</span></Btn>
              <Btn bType="primary" disabled={true}><span>btn disabled</span></Btn>
              <div className={styles.w100}>
                <Btn bType="primary" ellipsis={true}><span>btn ellipsis Test</span></Btn>
              </div>
              <Btn bType="primary" skeleton={true}><span>btn skeleton-item</span></Btn>
              <div className={styles.itemfull}>
                <Btn bType="primary" size="full"><span>btn full-item</span></Btn>
              </div>
            </div>         
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} Point`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>Point 배경색 버튼</p>
            <p className={styles.desc}>서비스 내 브랜드 포인트 컬러를 사용하는 버튼</p>
            <p className={styles.desc}>Primary와는 다른 일반 포인트 버튼으로 사용</p>
            <p className={styles.desc}>bType="<span className="color">point</span>"</p>
            <div className={cn(styles.demo, styles.flex)}>
              <Btn bType="point"><span>btn</span></Btn>
              <Btn bType="point" ghost ={true}><span>색 반전</span></Btn>
              <Btn bType="point" disabled={true}><span>btn disabled</span></Btn>
              <div className={styles.w100}>
                <Btn bType="point" ellipsis={true}><span>btn ellipsis Test</span></Btn>
              </div>
              <Btn bType="point" skeleton={true}><span>btn skeleton-item</span></Btn>
              <div className={styles.itemfull}>
                <Btn bType="point" size="full"><span>btn full-item</span></Btn>
              </div>
            </div>     
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} Line`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>배경 없이 border로만 강조된 버튼</p>
            <p className={styles.desc}>Default 버튼보다 시각적 구분이 필요한 경우</p>
            <p className={styles.desc}>Primary 버튼의 보조 또는 반대 버튼으로도 사용</p>
            <p className={styles.desc}>bType="<span className="color">line</span>"</p>
            <div className={cn(styles.demo, styles.flex)}>
              <Btn bType="line"><span>btn</span></Btn>
              <Btn bType="line" ghost ={true}><span>색 반전</span></Btn>
              <Btn bType="line" disabled={true}><span>btn disabled</span></Btn>
              <div className={styles.w100}>
                <Btn bType="line" ellipsis={true}><span>btn ellipsis Test</span></Btn>
              </div>
              <Btn bType="line" skeleton={true}><span>btn skeleton-item</span></Btn>
              <div className={styles.itemfull}>
                <Btn bType="line" size="full"><span>btn full-item</span></Btn>
              </div>
            </div>       
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} Gray`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>Gray 배경색 버튼</p>
            <p className={styles.desc}>Primary와 대비되는 의미의 액션에 사용</p>
            <p className={styles.desc}>덜 강조되어야 하는 기능, 부정/보조 선택에 적합</p>
            <p className={styles.desc}>bType="<span className="color">gray</span>"</p>
            <div className={cn(styles.demo, styles.flex)}>
              <Btn bType="gray"><span>btn</span></Btn>
              <Btn bType="gray" ghost ={true}><span>색 반전</span></Btn>
              <Btn bType="gray" disabled={true}><span>btn disabled</span></Btn>
              <div className={styles.w100}>
                <Btn bType="gray" ellipsis={true}><span>btn ellipsis Test</span></Btn>
              </div>
              <Btn bType="gray" skeleton={true}><span>btn skeleton-item</span></Btn>
              <div className={styles.itemfull}>
                <Btn bType="gray" size="full"><span>btn full-item</span></Btn>
              </div>
            </div>     
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} Red`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>Red 배경색 버튼</p>
            <p className={styles.desc}>삭제, 취소, 차단 등 버튼으로 사용</p>
            <p className={styles.desc}>bType="<span className="color">red</span>"</p>
            <div className={cn(styles.demo, styles.flex)}>
              <Btn bType="red"><span>btn</span></Btn>
              <Btn bType="red" ghost ={true}><span>색 반전</span></Btn>
              <Btn bType="red" disabled={true}><span>btn disabled</span></Btn>
              <div className={styles.w100}>
                <Btn bType="red" ellipsis={true}><span>btn ellipsis Test</span></Btn>
              </div>
              <Btn bType="red" skeleton={true}><span>btn skeleton-item</span></Btn>
              <div className={styles.itemfull}>
                <Btn bType="red" size="full"><span>btn full-item</span></Btn>
              </div>
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
        <CodeHljs
          code={EX_CODE}
          language={'tsx'}
          className={styles.code}
        />
      </div>
    </div>
  )
}