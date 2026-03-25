import { hubTotalData } from "@/data/hub/hubData";
import { fireDB } from "@/firebase";
import { useHubStore, useUserHub } from "@/store/zustand/hub/hubStore";
import type { UserRoomStats } from "@/types/hub/firebase";
import { unflatten } from "@/utils/firebaseStore";
import { isColName } from "@/utils/hun/common";
import { defaultStats, mergeUserStats, userTotalMerge } from "@/utils/hun/hubStats";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo } from "react";

// 🔹 user stats
export const useUserHubStats = (uid?: string, isGuest = false) => {
  const colName = isColName(isGuest, "userRooms");
  const defaultTotalData = useMemo(
    () => userTotalMerge(hubTotalData, defaultStats),
    []
  );

  useEffect(() => {
    if (!uid) {
      useHubStore.getState().clearHubState(); // total 초기화
      return;
    }
    const ref = doc(fireDB, colName, uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        useHubStore.getState().setHubState(defaultTotalData); // 기본 값
      } else {
        const data = snap.data();
        const stats = unflatten<UserRoomStats>(data, "stats."); // .(dot 구조 변환)
        const nextStats = mergeUserStats(defaultStats, stats); // 초깃값 객체 total 합산
        // 기본 + db merge
        const mergeData = userTotalMerge(hubTotalData, nextStats);
        useHubStore.getState().setHubState(mergeData);
      }
    });
    return () => unsub();
  }, [uid, colName, defaultTotalData]);

  return useUserHub();
};
