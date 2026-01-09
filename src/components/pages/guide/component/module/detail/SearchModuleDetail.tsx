import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { SearchModule } from "@/components/modules/search/SearchModule";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import type { SearchResultType } from "@/types/common";
import type { DemoItemType } from "@/types/guide";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import styles from '../../Detail.module.scss';

// 🔹 SearchModule 컴포넌트 설명
const DETAIL_TITLE ='Search Module';
const TEST_KEYWORD = [
  { id: '1', keyword: ['모듈1', '테스트 모듈2 입니다'] },
  { id: '2', keyword: ['키워드1', '키워드3'] },
  { id: '3', keyword: ['검색목록','회사'] },
]
const DEMO_DATA:DemoItemType[] = [
  {
    tit:`데모`,
    desc:['기본 검색 모듈','모듈, 기본, 키워드 배열로 검색 목록 전달'],
  },
  {
    tit:`버튼 기능 없이 아이콘만`,
    desc:['버튼 기능이 없는 검색 모듈 enter로 실행','isBtn:false'],
    option:{
      isBtn:false,
    }
  },
  {
    tit:`미리보기 X`,
    desc:['일치하는 검색어 미리보기 끄기','onPreview:false'],
    option:{
      onPreview:false,
    }
  },
  {
    tit:`Placeholder`,
    desc:['placeholder 입력',`placeholder:'검색어를 입력해주세요.'`],
    option:{
      placeholder:'검색어를 입력해주세요.',
    }
  },
  
]
const EX_CODE = stripIndent(`
  <SearchModule 
    data={ [ { id: string, keyword: string[] }, ... ] }
    onConfirm={ function(e:SearchResultType) } // 일치하는 결과 받기
  />` 
);
export const SearchModuleDetail = () => {
  const searchResult = (e:SearchResultType) => {
    console.log(e)
  }
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
        <p className={styles.desc}>컴포넌트 2개 이상 조합 검색 모듈 컴포넌트</p>
        <p className={styles.desc}>Input, PreviewText 사용</p>
        <p className={styles.desc}>input 스타일 및 아이콘, 검색 일치하는 목록 미리보기 등</p>
        <p className={styles.desc}><span className="color">data(검색 목록) : {`[{id:string, keyword: string[]}]`}</span></p>
        <p className={styles.desc}>onConfirm - text: '검색 값', matchIds: 일차 하는 id 배열</p>
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
        {
          DEMO_DATA.map((demoItem, demoIdx) => (
            <div className={styles.sectionItem} key={demoIdx}>
              <TitlePoint
                titleTag={'p'}
                title={`${DETAIL_TITLE} ${demoItem.tit}`}
                pointType="underline"
                className={styles.tit}
              />
              <div className={styles.demoWrap}>
                {demoItem.desc.map((descItem, descIdx) => (
                  <p className={styles.desc} key={descIdx}>{descItem}</p>
                ))}
                <div className={styles.demo}>
                  <SearchModule 
                    data={TEST_KEYWORD}
                    onConfirm={searchResult}
                    {...demoItem.option}
                  />
                </div>
              </div>
            </div>
          ))
        }
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