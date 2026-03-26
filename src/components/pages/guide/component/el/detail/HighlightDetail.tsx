import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { TextHighlight } from "@/components/element/highlight/TextHighlight";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import type { DemoItemType } from "@/types/guide";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import styles from "../../Detail.module.scss";

const DETAIL_TITLE = "Highlight";

const EX_CODE = stripIndent(`
  <TextHighlight
    text="Search highlight example"
    keyword="highlight"
  />

  <CodeHljs
    language="tsx"
    code={'<div className="sample">Hello</div>'}
    isLineNumber={true}
    badgeLang={true}
    isCopied={true}
  />`);

export const HighlightDetail = () => {
  const demos: Array<DemoItemType & { render: React.ReactNode }> = [
    {
      tit: "텍스트 키워드 강조",
      desc: ["지정한 keyword와 일치하는 구간만 강조 표시합니다."],
      render: (
        <p>
          <TextHighlight text="Search highlight example" keyword="highlight" />
        </p>
      ),
    },
    {
      tit: "일치하지 않는 경우",
      desc: ["keyword가 없거나 일치하지 않으면 원문 텍스트 그대로 표시됩니다."],
      render: (
        <p>
          <TextHighlight text="Search highlight example" keyword="missing" />
        </p>
      ),
    },
    {
      tit: "코드 하이라이트",
      desc: ["line number, 언어 배지, 복사 버튼을 함께 사용할 수 있습니다."],
      render: (
        <CodeHljs
          language="tsx"
          code={`<div className="sample">Hello</div>`}
          className={styles.code}
        />
      ),
    },
  ];

  return (
    <div className={cn("guide-detail", styles.sectionWrap)}>
      <div className={styles.sectionHeading}>
        <TitlePoint titleTag="p" title={DETAIL_TITLE} pointType="underline" $fontSize={20} className={styles.tit} />
        <p className={styles.desc}>텍스트 키워드 강조와 코드 하이라이트 표시를 위한 컴포넌트입니다.</p>
      </div>

      <div className={styles.sectionLists}>
        {demos.map((demoItem, idx) => (
          <div className={styles.sectionItem} key={idx}>
            <TitlePoint titleTag="p" title={`${DETAIL_TITLE} ${demoItem.tit}`} pointType="underline" className={styles.tit} />
            <div className={styles.demoWrap}>
              {demoItem.desc.map((descItem, descIdx) => (
                <p className={styles.desc} key={descIdx}>{descItem}</p>
              ))}
              <div className={styles.demo}>
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
