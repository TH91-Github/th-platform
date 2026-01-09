import { Btn } from "@/components/element/button/Btn";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import { cn } from "@/utils/common";
import styles from '../../Detail.module.scss';
import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { stripIndent } from "@/utils/textUtils";
import { useAddToast } from "@/store/zustand/common/toastStore";
import type { DemoItemType } from "@/types/guide";

// 🔹 btn 컴포넌트 설명
const DETAIL_TITLE ='Toast';
const DEMO_DATA:DemoItemType[] = [
  {
    tit:`데모`,
    desc:[`addToast('Text')`],
    option:{
      text: 'Text',

    }
  },
  {
    tit:`Success`,
    desc:[`addToast('Toast 성공','success')`],
    option:{
      text: 'Toast 성공',
      type: 'success'
    }
  },
  {
    tit:`Error`,
    desc:[`addToast('Toast Error','error')`],
    option:{
      text: 'Toast 에러',
      type: 'error'
    }
  },
  {
    tit:`Close Timer`,
    desc:[`addToast('Text','base',5000)`],
    option:{
      text: '5초 후 닫기',
      type: 'base',
      timer:5000,
    }
  },
]
const EX_CODE = stripIndent(`
  const addToast = useAddToast();
    addToast('Toast Text');
    addToast('Text','success');
    addToast('Text','error');
    addToast('Text','base',5000)`
);

export const ToastDetail = () => {
  const addToast = useAddToast();
  
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
        <p className={styles.desc}>사용은 <span className="color">useAddToast store action</span>으로 사용</p>
        <p className={styles.desc}>popup, 잠깐 뜨고 사라지는 알림형 popup</p>
        <p className={styles.desc}>base, success, error, timer 옵션</p>
        <p className={styles.desc}>기본 2초, 시간 조절 가능</p>
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
                   <Btn
                      onClick={() => addToast(
                        demoItem.option.text, demoItem.option?.type, demoItem.option?.timer
                      )}
                    >
                      <span>{demoItem.tit}</span>
                    </Btn>
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