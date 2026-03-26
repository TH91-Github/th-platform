import { useEffect, useMemo } from "react";
import { NotLoad } from "../NotLoad";
import { AccordionDetail } from "./detail/AccordionDetail";
import { BreadcrumbDetail } from "./detail/BreadcrumbDetail";
import { BtnDetail } from "./detail/BtnDetail";
import { CalendarDetail } from "./detail/CalendarDetail";
import { CarouselDetail } from "./detail/CarouselDetail";
import { CountDetail } from "./detail/CountDetail";
import { FormDetail } from "./detail/FormDetail";
import { HighlightDetail } from "./detail/HighlightDetail";
import { InputDetail } from "./detail/InputDetail";
import { ModalDetail } from "./detail/ModalDetail";
import { PaginationDetail } from "./detail/PaginationDetail";
import { TabButtonDetail } from "./detail/TabButtonDetail";
import { ToastDetail } from "./detail/ToastDetail";

// 🔹 상세 페이지 연결 (상세 페이지 예제 하드 코딩)
// componentData.ts
interface ElementLoadPropsType {
  id: string,
  onNotFound?: () => void;
}
export const ElementLoad = ({id, onNotFound}:ElementLoadPropsType) => {
  // ✅ 일치하는 컴포넌트 로드
  const componentLoad: { [key: string]: React.ReactNode } = useMemo(() => ({
    btn: <BtnDetail />,
    modal: <ModalDetail />,
    carousel: <CarouselDetail />,
    toast: <ToastDetail />,
    tabButton: <TabButtonDetail />,
    accordion: <AccordionDetail />,
    input: <InputDetail />,
    calendar:<CalendarDetail />,
    breadcrumb: <BreadcrumbDetail />,
    count: <CountDetail />,
    form: <FormDetail />,
    highlight: <HighlightDetail />,
    pagination: <PaginationDetail />,
  }), []);

  // 일치하지 않는 경우 NotView 컴포넌트 
  const resultComponent = componentLoad[id] || <NotLoad category="element" />;

  // 주소 입력하고 들어온 경우
  useEffect(() => {
    if (!componentLoad[id] && onNotFound) {
      onNotFound();
    }
  }, [id, componentLoad, onNotFound]);

  return <>{resultComponent}</>;
}
