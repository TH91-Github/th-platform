import { hubTotalData } from "@/data/hub/hubData";
import { fireDB } from "@/firebase";
import { actionClearHubState, actionHubStateUpdate } from "@/store/redux/hubSlice";
import type { AppDispatch, RootState } from "@/store/redux/store";
import type { UserRoomStats } from "@/types/hub/firebase";
import { unflatten } from "@/utils/firebaseStore";
import { isColName } from "@/utils/hun/common";
import { defaultStats, mergeUserStats, userTotalMerge } from "@/utils/hun/hubStats";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// 🔹 user stats
export const useUserHubStats = (uid?: string, isGuest = false) => {
  const dispatch = useDispatch<AppDispatch>();
  const colName = isColName(isGuest, "userRooms");
  const defaultTotalData = userTotalMerge(hubTotalData, defaultStats);

  useEffect(() => {
    if (!uid) {
      dispatch(actionClearHubState()); // total 초기화 
      return;
    }
    const ref = doc(fireDB, colName, uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        dispatch(actionHubStateUpdate(defaultTotalData)); // 기본 값 
      } else {
        const data = snap.data();
        const stats = unflatten<UserRoomStats>(data, "stats."); // .(dot 구조 변환)
        const nextStats = mergeUserStats(defaultStats, stats); // 초깃값 객체 total 합산
        // 기본 + db merge
        const mergeData = userTotalMerge(hubTotalData, nextStats);
        dispatch(actionHubStateUpdate(mergeData));
      }
    });
    return () => unsub();
  }, [uid, colName]);

  return useSelector((state: RootState) => state.hub);
};