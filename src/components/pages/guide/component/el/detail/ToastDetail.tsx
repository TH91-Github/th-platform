import { Btn } from "@/components/element/button/Btn";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import { cn } from "@/utils/common";
import styles from '../../Detail.module.scss';
import { Hljs } from "@/components/element/highlight/Hljs";
import { stripIndent } from "@/utils/textUtils";
import { useAddToast } from "@/store/zustand/common/toastStore";

// 🔹 btn 컴포넌트 설명
const DETAIL_TITLE ='Toast';
export const ToastDetail = () => {
  const addToast = useAddToast();

  const exCode = stripIndent(`
    const addToast = useAddToast();
    addToast('Toast Text');
    addToast('Text','success');
    addToast('Text','error');
    addToast('Text','base',5000)`
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
        <p className={styles.desc}>popup, 잠깐 뜨고 사라지는 알림형 popup</p>
        <p className={styles.desc}>base, success, error, timer 옵션</p>
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
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={'Toast 데모'}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>addToast('Text')</p>
            <div className={styles.demo}>
              <Btn
                onClick={() => addToast('Toast Text')}
              >
                <span>Toast 기본</span>
              </Btn>
            </div>    
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={'Success'}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>addToast('Text','success')</p>
            <div className={styles.demo}>
              <Btn
                onClick={() => addToast('Toast Text','success')}
              >
                <span>Success</span>
              </Btn>
            </div>    
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={'Error'}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>addToast('Text','error')</p>
            <div className={styles.demo}>
              <Btn
                onClick={() => addToast('Toast Text','error')}
              >
                <span>Error</span>
              </Btn>
            </div>    
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={'Close Timer'}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>addToast('Text','base',5000)</p>
            <div className={styles.demo}>
              <Btn
                onClick={() => addToast('Toast Text','base',5000)}
              >
                <span>5초 후 닫기</span>
              </Btn>
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