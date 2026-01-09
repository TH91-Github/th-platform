import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { SideLayout } from "@/components/layout/cont/side/SideLayout";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import styles from '../../Detail.module.scss';

// 🔹 btn 컴포넌트 설명
const DETAIL_TITLE ='Side Layout';
const EX_CODE = stripIndent(`
  <SideLayout>
    <div>...</div> // children menu
    <div>...</div> // children cont
  </SideLayout>` 
);
export const SideLayoutView = () => {
  
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
        <p className={styles.desc}>왼쪽 사이드 메뉴와 오른쪽 컨텐츠로 구성된 layout</p>
        <p className={styles.desc}>옵션에 따라 fixed 사용하고 있기에 최상위 레이아웃으로 사용.</p>
        <p className={styles.desc}>style emotion 사용</p>
        {/* <ul className={cn(styles.linkLists, 'bullet-lists')}>
          <li>
            <OutLink
              href={'/'}
              title={'url 입력하기'}
            />
          </li>
        </ul> */}
      </div>
      <div className={cn(styles.sectionLists)}>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={DETAIL_TITLE + ' 데모'}
            pointType="underline"
            $fontSize={20}
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>sideFixed?: boolean / pc에서 사이드 고정 선택</p>
            <p className={styles.desc}>$sideW?: number / 사이드 고정 넓이</p>
            <p className={styles.desc}>isFold?:boolean / 고정이 아닌 경우 메뉴 접기 관련</p>
            <p className={styles.desc}>innerCont?: boolean / 컨텐츠 1140 가운데 여부</p>
            <p className={styles.desc}>className 지정 className.menu / className.cont</p>
            <p className={styles.desc}>{`onFoldChange?: () => void / menu 간소화 옵션`}</p>
            <p className={styles.desc}>{`onMoSideChange?: () => void / 모바일 Side menu 감지`}</p>
            <div className={styles.demo}>
              <SideLayout >
                <div>
                  <p className={styles.desc}>
                    왼쪽 Sticky 영역<br/>
                    기본 가로 250px
                  </p>
                </div>
                <div>
                  <p className={styles.desc}>
                    오른쪽 Content 영역
                  </p>
                </div>
              </SideLayout>
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