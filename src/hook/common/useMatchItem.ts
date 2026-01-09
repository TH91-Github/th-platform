import { useMemo } from "react";

interface MatchItemPropsType<T, K extends keyof T> {
  data: T[], // 찾을 데이터
  idKey: K, // 찾을 key 값 id, title 등
  findVal: T[K], // idKey와 비교할 값
}

// 🔹 단일 매치 (첫 번째 일치 항목만)
export const useMatchItem = <T, K extends keyof T>({
  data,
  idKey,
  findVal,
}: MatchItemPropsType<T, K>): {
  matchIdx: number;
  matchItem: T | undefined;
} => {
  return useMemo(() => {
    const currentIdx = data.findIndex((item) => item[idKey] === findVal);
    const currentItem = currentIdx !== -1 ? data[currentIdx] : undefined;
    return { matchIdx: currentIdx, matchItem: currentItem };
  }, [data, idKey, findVal]);
};

// 🔹 다중 매치 (모든 일치 항목)
export const useMatchItems = <T, K extends keyof T>({
  data,
  idKey,
  findVal,
}: MatchItemPropsType<T, K>): {
  matchIdxs: number[],
  matchItems: T[],
} => {
  return useMemo(() => {
    const results = data.reduce<{ idxs: number[], items: T[] }>(
      (acc, item, idx) => {
        if (item[idKey] === findVal) {
          acc.idxs.push(idx);
          acc.items.push(item);
        }
        return acc;
      },
      { idxs: [], items: [] }
    );

    return {
      matchIdxs: results.idxs,
      matchItems: results.items
    };
  }, [data, idKey, findVal]);
};