import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { FormModule, type FormInputType } from "@/components/modules/form/FormModule";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import type { DemoItemType } from "@/types/guide";
import { cn } from "@/utils/common";
import { stripIndent } from "@/utils/textUtils";
import { useState } from "react";
import styles from "../../Detail.module.scss";

const DETAIL_TITLE = "Form Module";

const EX_CODE = stripIndent(`
  <FormModule
    inputs={inputs}
    requiredText="* 필수 입력"
    btnTitle="확인"
    confirm={(values) => console.log(values)}
  />`);

const BASE_INPUTS: FormInputType[] = [
  { id: "email", label: "이메일", required: true, placeholder: true, desc: "이메일을 입력해주세요." },
  { id: "password", label: "비밀번호", type: "password", required: true, placeholder: true },
];

const RESET_INPUTS: FormInputType[] = [
  { id: "loginId", label: "아이디", required: true, placeholder: true },
  { id: "password", label: "비밀번호", type: "password", required: true, placeholder: true },
];

export const FormModuleDetail = () => {
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const demos: Array<DemoItemType & { render: React.ReactNode }> = [
    {
      tit: "기본",
      desc: ["여러 Input과 submit 버튼을 한 번에 묶어 공통 폼 형태를 만들 수 있습니다."],
      render: (
        <>
          <FormModule
            inputs={BASE_INPUTS}
            requiredText="* 필수 입력"
            btnTitle="확인"
            confirm={(values) => setResult(values)}
          />
          {result && (
            <p className={styles.desc}>결과: {JSON.stringify(result)}</p>
          )}
        </>
      ),
    },
    {
      tit: "초기화",
      desc: ["resetKey가 바뀌면 내부 Input을 다시 마운트해 초기 상태로 되돌릴 수 있습니다."],
      render: (
        <>
          <FormModule
            inputs={RESET_INPUTS}
            btnTitle="로그인"
            resetKey={resetKey}
            confirm={(values) => setResult(values)}
          />
          <div className={cn(styles.demo, styles.flex)}>
            <button type="button" onClick={() => setResetKey((prev) => prev + 1)}>폼 초기화</button>
          </div>
        </>
      ),
    },
    {
      tit: "비활성 버튼",
      desc: ["disabled를 사용하면 제출 버튼만 비활성화한 상태를 쉽게 만들 수 있습니다."],
      render: (
        <FormModule
          inputs={BASE_INPUTS}
          btnTitle="대기 중"
          disabled={true}
          confirm={() => {}}
        />
      ),
    },
  ];

  return (
    <div className={cn("guide-detail", styles.sectionWrap)}>
      <div className={styles.sectionHeading}>
        <TitlePoint titleTag="p" title={DETAIL_TITLE} pointType="underline" $fontSize={20} className={styles.tit} />
        <p className={styles.desc}>여러 Input과 제출 버튼을 묶어 공통 폼 구조를 빠르게 구성하는 모듈입니다.</p>
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
