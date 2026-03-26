import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import styles from '../../Detail.module.scss';
import { Accordion } from "@/components/element/accordion/Accordion";
import type { DemoItemType } from "@/types/guide";

// 🔹 Accordion 컴포넌트 설명
interface AccordionDataType extends DemoItemType  {
  lists: {
    title: string,
    desc?: string,
  }[]
}
const DETAIL_TITLE ='Accordion';
const DEMO_DATA:AccordionDataType[] = [
  {
    tit:`데모 - 멀티 활성`,
    desc:['여러개 활성 가능, 모션 없는 가장 기본 형태'],
    lists:[
      {title:"case1",desc:'내용1'},
      {title:"case2",desc:'내용2'},
      {title:"case3",desc:'내용3'},
    ],
  },
  {
    tit:'단일 활성',
    desc:['하나만 확인 가능'],
    lists:[
      {title:"case2",desc:'내용1'},
      {title:"case2",desc:'내용2'},
      {title:"case2",desc:'내용3'},
    ],
    option:{
      mode: 'single'
    }
  },
  {
    tit:'활성 item 지정',
    desc:['초기 원하는 순서 활성화 index 2번 활성 : EX: initActive:number[] - initActive[2,3] / initActive[2]'],
    lists:[
      {title:"case3",desc:'내용1'},
      {title:"case3",desc:'내용2'},
      {title:"case3",desc:'내용3'},
    ],
    option:{
      initActive:[2]
    }
  },
  {
    tit:'부드럽게 open',
    desc:['smoothAni: true'],
    lists:[
      {title:"case4",desc:'부드럽게 on/off 내용'},
      {title:"case4",desc:'내용2'},
      {title:"case4",desc:'내용3'},
    ],
    option:{
      smoothAni:true
    }
  },
  {
    tit:'하위 없는 경우 (버튼, 화살표 아이콘 x)',
    desc:['타이틀만 있고 하위가 없는 경우 타이틀 button 대신 span으로 사용'],
    lists:[
      {title:"case5"},
      {title:"case5"},
      {title:"case5", desc:'내용3'},
    ],
  },
]
const EX_CODE = stripIndent(`
  <Accordion
    data={data}
    defaultActive={[0]}
    onActiveChange={(indexes) => console.log(indexes)}
    renderItem={(accItem, { index, isActive }) => ({ 
      heading: {
        title: 타이틀,
        jsx:(<> // button 자식으로 들어가는 구조
          <span className="tit">타이틀</span>
        </>),
        className: 'className'
      },
      content: (
        jsx 구조 // 펼쳐 졌을 때 확인 영역
      )
    })}
  />` 
);
export const AccordionDetail = () => {

  return ( 
    <div className={cn('guide-detail', styles.sectionWrap)}>
      <div className={styles.sectionHeading}>
        <TitlePoint
          titleTag={'p'}
          title={DETAIL_TITLE}
          pointType="underline"
          $fontSize={20}
          className={styles.tit}
        />
        <p className={styles.desc}>아코디언 메뉴 기능</p>
        <p className={styles.desc}>단일, 멀티, 초기 활성, 부드러운 전환 옵션 지원</p>
        <p className={styles.desc}>renderItem과 active change 콜백으로 확장성을 높였습니다.</p>
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
                  <Accordion
                    data={demoItem.lists} 
                    mode={demoItem.option?.mode ?? 'multiple'}
                    defaultActive={demoItem.option?.initActive ?? undefined}
                    smoothAni={demoItem.option?.smoothAni}
                    className={styles.accordion}
                    onActiveChange={(indexes) => {
                      console.log(`${demoItem.tit}:`, indexes);
                    }}
                    renderItem={(accItem, { index, isActive }) => ({
                      heading: {
                        title: `${accItem.title} - ${index + 1}`,
                        jsx:(<> 
                          <span className="tit">
                            {accItem.title} - {index + 1} {isActive ? '(open)' : ''}
                          </span>
                        </>),
                      },
                      content: 
                        accItem.desc ? (
                          <div>
                            <p>{accItem.desc}</p>
                            <p>{accItem.desc}</p>
                          </div>)
                        : null
                    })}
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
