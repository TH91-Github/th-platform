import { useMemo } from "react";
import { NotLoad } from "../NotLoad";
import { InputDetail } from "./view/InputDetail";


interface ElementLoadPropsType {
  id: string,
}
export const ElementLoad = ({id}:ElementLoadPropsType) => {

  // ✅ 일치하는 컴포넌트 로드
  const componentLoad: { [key: string]: React.ReactNode } = useMemo(() => ({
    input: <InputDetail />,

  }), []);


  // 일치하지 않는 경우 NotView 컴포넌트 
  const resultComponent = componentLoad[id] || <NotLoad />;


  // 주소 입력하고 들어온 경우
  // useEffect(() => {
  //   if (!componentLoad[id] && onNotFound) {
  //     onNotFound();
  //   }
  // }, [id, componentLoad, onNotFound]);

  return <>{resultComponent}</>;
}