import type { UserRoomStats } from "@/types/hub/firebase";
import type { HubTotalType } from "@/types/hub/hub";

// 🔹 hub 카테고리 유저 total 숫자
export function mergeUserStats(
  defaultStats: UserRoomStats,
  stats: Partial<UserRoomStats>
): UserRoomStats {
  return {
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
}

// 🔹 기본 데이터 + DB(개인별 방 통계) 머지
export function userTotalMerge(
  base: HubTotalType[],
  stats: UserRoomStats
): HubTotalType[] {
  return base.map((group) => {
    if (group.totalCategory === "total") {
      return {
        ...group,
        totalLists: group.totalLists.map((item) => {
          switch (item.id) {
            case "all":
              return { ...item, total: stats.total };

            case "single":
              return { ...item, total: stats.mode.single };

            case "team":
              return { ...item, total: stats.mode.team };

            case "public":
              return { ...item, total: stats.visibility.public };

            case "private":
              return { ...item, total: stats.visibility.private };

            default:
              return item;
          }
        }),
      };
    }

    if (group.totalCategory === "category") {
      return {
        ...group,
        totalLists: group.totalLists.map((item) => ({
          ...item,
          total: stats.category[item.id as keyof typeof stats.category] ?? 0,
        })),
      };
    }

    if (group.totalCategory === "bookmark") {
      return {
        ...group,
        totalLists: group.totalLists.map((item) => {
          switch (item.id) {
            case "all":
              return { ...item, total: stats.bookmark.total };

            case "public":
              return { ...item, total: stats.bookmark.public };

            case "private":
              return { ...item, total: stats.bookmark.private };

            case "non":
              return {
                ...item,
                total: stats.total - stats.bookmark.total,
              };

            default:
              return item;
          }
        }),
      };
    }
    return group;
  });
}

// 🔹 user 전체 목록 category, id별 total 구하기
export const getHubTotal = (
  totalData: HubTotalType[] | null,
  category: string,
  id: string
) => {
  const resultData = totalData
    ?.find(v => v.totalCategory === category)
    ?.totalLists?.find(v => v.id === id)?.total ?? 0;
  return resultData
}

// firebase 
export const defaultStats: UserRoomStats = {
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