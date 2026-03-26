import { CheckBox } from "@/components/element/form/checkbox/CheckBox";
import { SwitchCheck } from "@/components/element/form/checkbox/SwitchCheck";
import { SelectBox } from "@/components/element/form/select/SelectBox";
import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import type { DemoItemType } from "@/types/guide";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import { useState } from "react";
import styles from "../../Detail.module.scss";

const DETAIL_TITLE = "Form Controls";

const EX_CODE = stripIndent(`
  <CheckBox label="약관에 동의합니다." />

  <SwitchCheck />

  <SelectBox
    options={[
      { value: 'apple', label: 'Apple' },
      { value: 'orange', label: 'Orange' },
    ]}
    iniVal="apple"
    changeEvent={(value) => console.log(value)}
  />`);

export const FormDetail = () => {
  const [selectValue, setSelectValue] = useState("apple");
  const [fruitValue, setFruitValue] = useState("orange");

  const demos: Array<DemoItemType & { render: React.ReactNode }> = [
    {
      tit: "CheckBox",
      desc: ["label과 checked 상태를 함께 사용할 수 있는 기본 체크박스입니다."],
      render: (
        <div className={cn(styles.demo, styles.flex)}>
          <CheckBox label="약관에 동의합니다." />
          <CheckBox label="알림 수신 동의" defaultChecked />
        </div>
      ),
    },
    {
      tit: "Switch",
      desc: ["체크박스를 활용한 간단한 on/off 스위치 형태입니다."],
      render: (
        <div className={cn(styles.demo, styles.flex)}>
          <SwitchCheck />
        </div>
      ),
    },
    {
      tit: "SelectBox",
      desc: ["기본 선택 박스", "iniVal과 changeEvent로 현재 선택값을 제어할 수 있습니다."],
      render: (
        <div className={cn(styles.demo, styles.flex)}>
          <SelectBox
            options={[
              { value: "apple", label: "Apple" },
              { value: "orange", label: "Orange" },
              { value: "banana", label: "Banana" },
            ]}
            iniVal={selectValue}
            changeEvent={setSelectValue}
          />
          <SelectBox
            options={[
              { value: "orange", label: "Orange" },
              { value: "grape", label: "Grape" },
              { value: "melon", label: "Melon", disabled: true },
            ]}
            iniVal={fruitValue}
            changeEvent={setFruitValue}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={cn("guide-detail", styles.sectionWrap)}>
      <div className={styles.sectionHeading}>
        <TitlePoint titleTag="p" title={DETAIL_TITLE} pointType="underline" $fontSize={20} className={styles.tit} />
        <p className={styles.desc}>Input을 제외한 체크박스, 스위치, 셀렉트 UI를 정리한 영역입니다.</p>
      </div>

      <div className={styles.sectionLists}>
        {demos.map((demoItem, idx) => (
          <div className={styles.sectionItem} key={idx}>
            <TitlePoint titleTag="p" title={`${DETAIL_TITLE} ${demoItem.tit}`} pointType="underline" className={styles.tit} />
            <div className={styles.demoWrap}>
              {demoItem.desc.map((descItem, descIdx) => (
                <p className={styles.desc} key={descIdx}>{descItem}</p>
              ))}
              {demoItem.render}
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
