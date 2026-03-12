import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fireDB } from "@/firebase";
import type { UserRoomStats } from "@/types/hub/firebase";
import { isColName } from "@/utils/hun/common";
import { userKeys } from "@/queryKeys/userKeys";

export const useUserHubStats = (uid?: string, isGuest = false) => {
  const queryClient = useQueryClient();

  const colName = isColName(isGuest, "userRooms");

  const query = useQuery({
    queryKey: userKeys.stats(uid!),
    queryFn: () => defaultStats,
    enabled: !!uid,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!uid) return;

    const ref = doc(fireDB, colName, uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        queryClient.setQueryData(userKeys.stats(uid), defaultStats);
        return;
      }

      const data = snap.data();
      const stats = (data?.stats ?? {}) as Partial<UserRoomStats>;

      const nextStats: UserRoomStats = {
        ...defaultStats,
        ...stats,

        visibility: {
          ...defaultStats.visibility,
          ...stats.visibility,
        },

        category: {
          ...defaultStats.category,
          ...stats.category,
        },

        mode: {
          ...defaultStats.mode,
          ...stats.mode,
        },

        bookmark: {
          ...defaultStats.bookmark,
          ...stats.bookmark,
        },

        ym: {
          ...defaultStats.ym,
          ...stats.ym,
        },
      };

      queryClient.setQueryData(userKeys.stats(uid), nextStats);
    });

    return () => unsub();
  }, [uid, colName, queryClient]);

  return {
    statsData: query.data,
    isLoading: query.isLoading,
  };
};

const defaultStats: UserRoomStats = {
  total: 0,

  visibility: {
    public: 0,
    private: 0,
  },

  category: {
    travel: 0,
    memo: 0,
    calendar: 0,
    cashledger: 0,
    running: 0,
  },

  mode: {
    single: 0,
    team: 0,
  },

  bookmark: {
    total: 0,
    public: 0,
    private: 0,
  },

  ym: {},
};