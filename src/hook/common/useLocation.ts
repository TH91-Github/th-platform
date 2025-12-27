// 📍 location 기준 Hook
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

interface UseLocationPathReturnType<T> {
  locationIdx: number;
  locationItem: T | undefined;
  locationPath: string[];
  currentPath: string;
}

// 🔹 location path 데이터 비교
export const useLocationPath = <T,>(
  data: T[], // 비교 데이터
  idKey: keyof T, // id, title 찾을 키 값 설정
  index?: number // 몇 번째 인덱스를 사용할지
): UseLocationPathReturnType<T> => {
  const location = useLocation();
  return useMemo(() => {
    const pathArr = location.pathname.split("/").filter(Boolean);
    const targetId = pathArr[index || 1];
    const currentIdx = data.findIndex((item) => item[idKey] === targetId);
    const currentItem = currentIdx !== -1 ? data[currentIdx] : undefined;

    return {
      locationIdx:currentIdx, 
      locationItem:currentItem, 
      locationPath:pathArr,
      currentPath:pathArr[pathArr.length - 1] // 마지막(현재) path name
    }; // idx, obj, path
  }, [location.pathname, data, idKey, index]);
};

// ✅ EX) const { locationItem, locationPath } = useLocationPath(guideLists, 'id');