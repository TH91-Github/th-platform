import { Btn } from "@/components/element/button/Btn";
import { Modal } from "@/components/element/modal/Modal";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import { cn } from "@/utils/common";
import { useState } from "react";
import styles from '../../Detail.module.scss';
import { Hljs } from "@/components/element/highlight/Hljs";
import { stripIndent } from "@/utils/textUtils";

// 🔹 modal 컴포넌트 설명
interface DemoItemType {
  case1: boolean;
  case2: boolean;
  caseSub2: boolean;
  case3: boolean;
};
const DETAIL_TITLE ='Modal';
export const ModalDetail = () => {
  const [demo, setDemo] = useState<DemoItemType>({
    case1:false,
    case2:false,
    caseSub2:false,
    case3:false,
  });
  
  const handleModalClick = (key: keyof DemoItemType) => {
    setDemo(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const exCode = stripIndent(`
    <Modal onClose={handlePopupClick}>
      <p>Modal Test</p>
    </Modal>`
  );
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
      <div className={cn(styles.sectionLists, styles.flex)}>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} 데모`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>기본 Modal onClose 필수 props</p>
            <div className={styles.demo}>
              <Btn
                title="modal Demo 보기"
                onClick={() => handleModalClick('case1')}>
                <span>Modal</span>
              </Btn>
              { demo.case1 && (
                <Modal onClose={() => handleModalClick('case1')}>
                  <p className="tit">Madal Test</p>
                </Modal>
              )}
            </div>    
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} 중첩`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>Modal 내 Modal 실행</p>
            <div className={styles.demo}>
              <Btn
                title="modal Demo 보기"
                onClick={() => handleModalClick('case2')}>
                <span>중첩</span>
              </Btn>
              { demo.case2 && (
                <Modal onClose={() => handleModalClick('case2')} isUnder={demo.caseSub2}>
                  <div className={styles.case2}>
                    <p className="tit">Madal Test2-1</p><br />
                    <Btn
                      bType="primary"
                      title="modal Demo2 보기"
                      onClick={() => handleModalClick('caseSub2')}>
                      <span>모달 2-2 열기</span>
                    </Btn>
                  </div>
                  { demo.caseSub2 && (
                    <Modal onClose={() => handleModalClick('caseSub2')} isDimmed={false}>
                      <p className="tit">Madal Test2-2</p>
                    </Modal>
                  )}
                </Modal>
              )}
            </div>
          </div>
        </div>
        <div className={styles.sectionItem}>
          <TitlePoint
            titleTag={'p'}
            title={`${DETAIL_TITLE} 자동 닫기`}
            pointType="underline"
            className={styles.tit}
          />
          <div className={styles.demoWrap}>
            <p className={styles.desc}>실행 후 설정 시간 후 닫기</p>
            <div className={styles.demo}>
              <Btn
                title="modal Demo 보기"
                onClick={() => handleModalClick('case3')}>
                <span>자동 닫기</span>
              </Btn>
              { demo.case3 && (
                <Modal 
                  autoCloseSecond={3000}
                  onClose={() => handleModalClick('case3')}
                >
                  <p className="tit">Madal 3초 후 닫기</p>
                </Modal>
              )}
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