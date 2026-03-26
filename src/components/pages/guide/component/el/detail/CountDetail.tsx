import { Btn } from "@/components/element/button/Btn";
import { Count } from "@/components/element/count/Count";
import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import type { DemoItemType } from "@/types/guide";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import { useState } from "react";
import styles from "../../Detail.module.scss";

const DETAIL_TITLE = "Count";

interface CountDemoItem extends DemoItemType {
  render: React.ReactNode;
}

const EX_CODE = stripIndent(`
  <Count
    start={0}
    end={1200}
    duration={800}
    useComma={true}
  />

  <Count
    end={50000}
    duration={1200}
    useComma={true}
    resetZero={true}
  />`);

export const CountDetail = () => {
  const [value, setValue] = useState(1200);
  const [sales, setSales] = useState(50000);

  const demos: CountDemoItem[] = [
    {
      tit: "기본",
      desc: ["기본 숫자 증가 애니메이션입니다.", "end 값이 바뀌면 이전 값부터 자연스럽게 이어집니다."],
      render: (
        <>
          <p className={styles.desc}><Count end={value} duration={800} useComma={true} /></p>
          <Btn onClick={() => setValue((prev) => prev + 325)}><span>숫자 증가</span></Btn>
        </>
      ),
    },
    {
      tit: "0부터 다시 시작",
      desc: ["resetZero: true", "값이 변경될 때마다 0부터 다시 카운트됩니다."],
      render: (
        <>
          <p className={styles.desc}><Count end={sales} duration={1200} useComma={true} resetZero={true} /></p>
          <Btn onClick={() => setSales((prev) => prev + 10000)}><span>매출 증가</span></Btn>
        </>
      ),
    },
    {
      tit: "콤마 없는 짧은 카운트",
      desc: ["useComma를 끄면 단순 숫자 출력에 적합합니다."],
      render: <p className={styles.desc}><Count start={10} end={75} duration={600} /></p>,
    },
  ];

  return (
    <div className={cn("guide-detail", styles.sectionWrap)}>
      <div className={styles.sectionHeading}>
        <TitlePoint titleTag="p" title={DETAIL_TITLE} pointType="underline" $fontSize={20} className={styles.tit} />
        <p className={styles.desc}>숫자를 자연스럽게 증가시키는 카운트 애니메이션 컴포넌트입니다.</p>
      </div>

      <div className={styles.sectionLists}>
        {demos.map((demoItem, idx) => (
          <div className={styles.sectionItem} key={idx}>
            <TitlePoint titleTag="p" title={`${DETAIL_TITLE} ${demoItem.tit}`} pointType="underline" className={styles.tit} />
            <div className={styles.demoWrap}>
              {demoItem.desc.map((descItem, descIdx) => (
                <p className={styles.desc} key={descIdx}>{descItem}</p>
              ))}
              <div className={cn(styles.demo, styles.flex)}>
                {demoItem.render}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.codeWrap}>
        <CodeHljs code={EX_CODE} language="tsx" className={styles.code} />
      </div>
    </div>
  );
};
