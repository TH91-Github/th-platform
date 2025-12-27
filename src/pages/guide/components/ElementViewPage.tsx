import { useOutletContext } from "react-router-dom";
import styles from './ElementView.module.scss';
import { cn } from "@/utils/common";
import { ElementLoad } from "@/components/pages/guide/component/el/ElementLoad";
import type { ContextPropsType } from "@/types/guide";

// 상세 페이지
export const ElementViewPage = () => {
  const {id, detailsAni } = useOutletContext<ContextPropsType>();

  console.log(id)
  return (
    <div className={cn(styles.detail, detailsAni && styles.fadeIn)}>
      디테일
      {/* 일치하는 컴포넌트 있으면 on */}
      <ElementLoad id={id ?? ''} />
      {/* 뒤로 가기 버튼 */}
    </div>
  )
}