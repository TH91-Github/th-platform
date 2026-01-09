import { useEffect, useMemo } from "react";
import { NotLoad } from "../NotLoad";
import { ModalDetail } from "./detail/ModalDetail";
import { BtnDetail } from "./detail/BtnDetail";
import { CarouselDetail } from "./detail/CarouselDetail";
import { ToastDetail } from "./detail/ToastDetail";
import { TabButtonDetail } from "./detail/TabButtonDetail";
import { AccordionDetail } from "./detail/AccordionDetail";
import { InputDetail } from "./detail/InputDetail";

// 🔹 상세 페이지 연결 (상세 페이지 예제 하드 코딩)
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