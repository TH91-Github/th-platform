import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { Pagination } from "@/components/element/pagination/Pagination";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import type { DemoItemType } from "@/types/guide";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import { useState } from "react";
import styles from "../../Detail.module.scss";

type PaginationDemoOption = {
  totalPages: number;
  viewCount?: number;
  pageBtnCount?: number;
  center?: boolean;
};

interface PaginationDemoItem extends DemoItemType {
  option: PaginationDemoOption;
}

const DETAIL_TITLE = "Pagination";

const DEMO_DATA: PaginationDemoItem[] = [
  {
    tit: "기본",
    desc: [
      "기본 페이지네이션 형태입니다.",
      "현재 page 기준으로 페이지 묶음이 이동합니다.",
    ],
    option: {
      totalPages: 42,
      viewCount: 5,
    },
  },
  {
    tit: "활성 가운데 정렬",
    desc: [
      "center: true",
      "현재 활성 번호를 기준으로 양옆 페이지를 보여줍니다.",
    ],
    option: {
      totalPages: 42,
      viewCount: 5,
      pageBtnCount: 5,
      center: true,
    },
  },
  {
    tit: "버튼 개수 축소",
    desc: [
      "pageBtnCount: 3",
      "좁은 영역에서 더 단순한 페이지 버튼 구성을 만들 수 있습니다.",
    ],
    option: {
      totalPages: 42,
      viewCount: 5,
      pageBtnCount: 3,
      center: true,
    },
  },
  {
    tit: "페이지당 노출 수 변경",
    desc: [
      "viewCount: 10",
      "전체 데이터 수는 같아도 페이지 수가 달라집니다.",
    ],
    option: {
      totalPages: 42,
      viewCount: 10,
      pageBtnCount: 5,
    },
  },
  {
    tit: "긴 목록",
    desc: [
      "전체 데이터가 많은 경우 ... 버튼과 마지막 페이지 이동이 함께 표시됩니다.",
      "center와 조합하면 대량 목록에서도 현재 위치 파악이 쉽습니다.",
    ],
    option: {
      totalPages: 128,
      viewCount: 5,
      pageBtnCount: 7,
      center: true,
    },
  },
];

const EX_CODE = stripIndent(`
  <Pagination
    page={page}
    totalPages={42}
    viewCount={5}
    pageBtnCount={5}
    center={true}
    onChange={setPage}
  />`);

const PaginationDemo = ({ option }: { option: PaginationDemoOption }) => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      page={page}
      totalPages={option.totalPages}
      viewCount={option.viewCount}
      pageBtnCount={option.pageBtnCount}
      center={option.center}
      onChange={setPage}
    />
  );
};

export const PaginationDetail = () => {
  return (
    <div className={cn("guide-detail", styles.sectionWrap)}>
      <div className={styles.sectionHeading}>
        <TitlePoint
          titleTag="p"
          title={DETAIL_TITLE}
          pointType="underline"
          $fontSize={20}
          className={styles.tit}
        />
        <p className={styles.desc}>목록 데이터를 페이지 단위로 나눠 이동할 때 사용하는 컴포넌트입니다.</p>
        <p className={styles.desc}>기본형, 가운데 정렬, 버튼 개수, 데이터 수 변화에 따라 동작을 비교해볼 수 있습니다.</p>
      </div>

      <div className={styles.sectionLists}>
        {DEMO_DATA.map((demoItem, demoIdx) => (
          <div className={styles.sectionItem} key={demoIdx}>
            <TitlePoint
              titleTag="p"
              title={`${DETAIL_TITLE} ${demoItem.tit}`}
              pointType="underline"
              className={styles.tit}
            />
            <div className={styles.demoWrap}>
              {demoItem.desc.map((descItem, descIdx) => (
                <p className={styles.desc} key={descIdx}>{descItem}</p>
              ))}
              <div className={styles.demo}>
                <PaginationDemo option={demoItem.option} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.codeWrap}>
        <TitlePoint
          titleTag="p"
          title={`${DETAIL_TITLE} 사용 예`}
          pointType="underline"
          className={styles.tit}
        />
        <CodeHljs code={EX_CODE} language="tsx" className={styles.code} />
      </div>
    </div>
  );
};
