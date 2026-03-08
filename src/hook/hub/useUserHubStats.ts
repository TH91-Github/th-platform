import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireDB } from "@/firebase";
import type { UserRoomStats } from "@/types/hub/firebase";
import { isColName } from "@/utils/hun/common";

// hub user 개별 통계 값
export const useUserHubStats = (uid?: string, isGuest: boolean = false) => {
  const [stats, setStats] = useState<UserRoomStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setStats(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    const collection = isColName(isGuest, 'userRooms');
    const ref = doc(fireDB, collection, uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setStats(null);
      } else {
        setStats(snap.data()?.stats || null);
      }
      setIsLoading(false); // 데이터 로딩 완료
    });

    return () => unsub();
  }, [uid, isGuest]);

  return { stats, isLoading };
};
