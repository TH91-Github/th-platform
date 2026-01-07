import { Hljs } from "@/components/element/highlight/Hljs";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import styles from '../../Detail.module.scss';
import { Input } from "@/components/element/form/input/Input";
import type { DemoItemType } from "@/types/guide";

// 🔹 Input 컴포넌트 설명
const DETAIL_TITLE ='Input';
const DEMO_DATA:DemoItemType[] = [
  {
    tit:`데모`,
    desc:['가장 기본 input style'],
  },
  {
    tit:`Password`,
    desc:['type="password"'],
    option:{
      initVal:'password123',
      type:'password'
    }
  },
  {
    tit:`Placeholder`,
    desc:['placeholder="placeholder 적용"'],
    option:{
      placeholder:'placeholder 적용'
    }
  },
  {
    tit:`초깃값`,
    desc:['initVal="초깃값"'],
    option:{
      initVal:'initVal 초깃값',
    }
  },
  {
    tit:`Disabled`,
    desc:['disabled 속성 disabled={true}'],
    option:{
      initVal:'Disabled 입니다.',
      disabled:true
    }
  },
  {
    tit:`Error`,
    desc:['error={true}'],
    option:{
      initVal:'Error 입니다.',
      error:true
    }
  },
  {
    tit:`Line Style 아래`,
    desc:['$defaultLine="line-bottom"'],
    option:{
      $defaultLine:'line-bottom',
    }
  },
  {
    tit:`Line Style 왼쪽`,
    desc:['$defaultLine="line-left"'],
    option:{
      $defaultLine:'line-left'
    }
  },
  {
    tit:`Line Style X`,
    desc:['$defaultLine="line-none"'],
    option:{
      placeholder:'border 투명 input',
      $defaultLine:'line-none',
      error:true
    }
  },
]
const EX_CODE = stripIndent(`
  <Input />` 
);
export const InputDetail = () => {
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
        <p className={styles.desc}>Input 컴포넌트,</p>
        <p className={styles.desc}>ref, placeholder, initVal, disabled, error, input line style, focus 등 제어</p>
        <p className={styles.desc}></p>
        {/* <ul className={cn(styles.linkLists, 'bullet-lists')}>
          <li>
            <OutLink
              href={'/'}
              title={'url 입력하기'}
            />
          </li>
        </ul> */}
      </div>
      <div className={cn(styles.sectionLists, styles.flex)}>
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
                   <Input {...demoItem.option} />
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
        <Hljs
          code={EX_CODE}
          language={'tsx'}
          className={styles.code}
        />
      </div>
    </div>
  )
}