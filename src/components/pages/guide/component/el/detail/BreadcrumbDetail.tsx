import { Breadcrumb } from "@/components/element/breadcrumb/Breadcrumb";
import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import type { DemoItemType } from "@/types/guide";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import styles from "../../Detail.module.scss";

const DETAIL_TITLE = "Breadcrumb";

interface BreadcrumbDemoItem extends DemoItemType {
  data: string[];
}

const DEMO_DATA: BreadcrumbDemoItem[] = [
  {
    tit: "기본 경로",
    desc: [
      "4개 이하 경로는 모두 노출됩니다.",
      "현재 위치를 단순하게 보여주는 기본형입니다.",
    ],
    data: ["Guide", "Components", "Element", "Breadcrumb"],
  },
  {
    tit: "긴 경로",
    desc: [
      "5개 이상 경로는 중간 항목을 축약해 드롭다운으로 처리합니다.",
      "깊은 구조에서도 레이아웃이 무너지지 않도록 설계되어 있습니다.",
    ],
    data: ["Home", "Guide", "Components", "Element", "Navigation", "Breadcrumb"],
  },
];

const EX_CODE = stripIndent(`
  <Breadcrumb
    data={['Guide', 'Components', 'Element', 'Breadcrumb']}
  />

  <Breadcrumb
    data={['Home', 'Guide', 'Components', 'Element', 'Navigation', 'Breadcrumb']}
  />`);

export const BreadcrumbDetail = () => {
  return (
    <div className={cn("guide-detail", styles.sectionWrap)}>
      <div className={styles.sectionHeading}>
        <TitlePoint titleTag="p" title={DETAIL_TITLE} pointType="underline" $fontSize={20} className={styles.tit} />
        <p className={styles.desc}>현재 위치를 경로 형태로 보여주는 네비게이션 컴포넌트입니다.</p>
        <p className={styles.desc}>경로 수가 늘어나면 자동으로 중간 경로를 축약해 표시합니다.</p>
      </div>

      <div className={styles.sectionLists}>
        {DEMO_DATA.map((demoItem, idx) => (
          <div className={styles.sectionItem} key={idx}>
            <TitlePoint titleTag="p" title={`${DETAIL_TITLE} ${demoItem.tit}`} pointType="underline" className={styles.tit} />
            <div className={styles.demoWrap}>
              {demoItem.desc.map((descItem, descIdx) => (
                <p className={styles.desc} key={descIdx}>{descItem}</p>
              ))}
              <div className={styles.demo}>
                <Breadcrumb data={demoItem.data} />
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
