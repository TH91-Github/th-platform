import { useEffect, useMemo } from "react";
import { NotLoad } from "../NotLoad";
import { FormModuleDetail } from "./detail/FormModuleDetail";
import { SearchModuleDetail } from "./detail/SearchModuleDetail";

// 🔹 상세 페이지 연결
interface ElementLoadPropsType {
  id: string,
  onNotFound?: () => void;
}
export const ModuleLoad = ({id, onNotFound}:ElementLoadPropsType) => {

  // ✅ 일치하는 컴포넌트 로드
  const componentLoad: { [key: string]: React.ReactNode } = useMemo(() => ({
    searchModule: <SearchModuleDetail />,
    formModule: <FormModuleDetail />,
  }), []);

  // 일치하지 않는 경우 NotView 컴포넌트 
  const resultComponent = componentLoad[id] || <NotLoad category="module"/>;

  // 주소 입력하고 들어온 경우
  useEffect(() => {
    if (!componentLoad[id] && onNotFound) {
      onNotFound();
    }
  }, [id, componentLoad, onNotFound]);

  return <>{resultComponent}</>;
}
