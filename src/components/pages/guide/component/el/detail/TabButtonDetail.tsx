import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { TabBtns } from "@/components/element/tab/TabBtns";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import type { DemoItemType } from "@/types/guide";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import { useState } from "react";
import styles from '../../Detail.module.scss';

// 🔹 btn 컴포넌트 설명
type CaseKey = 'case1' | 'case2';
const DETAIL_TITLE ='TabButton'
const DEMO_DATA:DemoItemType[] = [
  {
    tit:`데모`,
    desc:['기본 : data / changeEvent 함수'],
  },
  {
    tit:`Password`,
    desc:['옵션 : isAll="en" / tabType="moving"'],
    option:{
      isAll:"en",
      tabType:"moving" 
    }
  },
]

const EX_CODE = stripIndent(`
  <TabBtns
    data={data} 
    changeEvent={(e) => handleTabOnChange(val)}
  />` 
);

export const TabButtonDetail = () => {
  const tabBtns = ['tab-1','tab-2','tab-3']
  const [tabBtnsVal, setTabBtnsVal] = useState<Record<CaseKey, string>>({
    case1: '',
    case2: '',
  });


  const handleTabOnChange = (val:string, caseNum:number) => {
    const key = `case${caseNum}`;

    setTabBtnsVal((prev) => ({
      ...prev,
      [key]: val,
    }));
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
        <p className={styles.desc}>Tab Style</p>
        <p className={styles.desc}>data - string[] 전달 탭 버튼 생성</p>
        <p className={styles.desc}>전체,All 선택 및 active 탭 활성 모션</p>
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
          DEMO_DATA.map((demoItem, demoIdx:number) => {
            const caseKey = `case${demoIdx + 1}` as CaseKey;
            return <div className={styles.sectionItem} key={demoIdx}>
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
                <p className={styles.desc}>선택 : {tabBtnsVal[caseKey]}</p>
                <div className={styles.demo}>
                  <TabBtns
                    data={tabBtns} 
                    changeEvent={(e) => handleTabOnChange(e, demoIdx+1)}
                    {...demoItem.option}
                  />
                </div>
              </div>
            </div>
          })
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