import { IconBack } from "@/assets/icon";
import { Btn } from "@/components/element/button/Btn";
import { ElementLoad } from "@/components/pages/guide/component/el/ElementLoad";
import { LayoutLoad } from "@/components/pages/guide/component/layout/LayoutLoad";
import { ModuleLoad } from "@/components/pages/guide/component/module/ModuleLoad";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import type { GuideContextPropsType } from "@/types/guide";
import { capitalizeWords } from "@/utils/textUtils";
import { useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from './ViewPage.module.scss';

// 🔹 component 상세 페이지 Load
export const DetailViewPage = () => {
  const { parentPath, id } = useOutletContext<GuideContextPropsType>();
  const navigate = useNavigate();

  const handleGoBackClick = () => {
    // url 주소 입력 시 바로 들어오는 경우를 포함하기 위해 전체 주소 입력
    navigate(`/guide/components/${parentPath}`);
  }

  // ✅ 일치하는 컴포넌트 로드
  const detailViewLoad: { [key: string]: React.ReactNode } = useMemo(() => ({
    element: <ElementLoad id={id} />,
    module: <ModuleLoad id={id} />,
    layout: <LayoutLoad id={id} />,
  }), []);

  return (
    <div className={styles.viewWrap}>
      <TitlePoint
        titleTag={'h3'}
        title={capitalizeWords(id)}
        $fontSize={32}
        className={styles.title}
      />
      {detailViewLoad[parentPath]}
      {/* 뒤로 가기 버튼 */}
      <Btn
        className={styles.backBtn}
        onClick={handleGoBackClick}
      >
        <span className={styles.icon}><IconBack /></span>
      </Btn>
    </div>
  )
}