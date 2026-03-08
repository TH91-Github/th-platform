import type { UserRoomStats } from "@/types/hub/firebase";
import type { HubTotalType } from "@/types/hub/hub";

// 🔹 기본 데이터 + DB(개인별 방 통계) 머지
export const userTotalMerge = (
  base: HubTotalType[],
  stats?: UserRoomStats | null
): HubTotalType[] => {

  if (!stats) return base;
  return base.map((section) => {
    // 전체 
    if (section.totalCategory === "total") {
      return {
        ...section,
        totalLists: section.totalLists.map((item) => {

          switch (item.id) {
            case "all":
              return { ...item, total: stats.total ?? 0};

            case "single":
              return { ...item, total: stats.single ?? 0 };

            case "team":
              return { ...item, total: stats.team ?? 0 };

            case "public":
              return { ...item, total: stats.public ?? 0};

            case "private":
              return { ...item, total: stats.private ?? 0 };

            default:
              return item;
          }
        }),
      };
    }
    // 카테고리
    if (section.totalCategory === "category") {
      return {
        ...section,
        totalLists: section.totalLists.map((item) => ({
          ...item,
          total: stats.category?.[item.id as keyof typeof stats.category] ?? 0,
        })),
      };
    }
    // 즐겨찾기
    if (section.totalCategory === "bookmark") {
      return {
        ...section,
        totalLists: section.totalLists.map((item) => {

          switch (item.id) {
            case "all":
              return { ...item, total: stats.bookmark?.total ?? 0 };

            case "public":
              return { ...item, total: stats.bookmark?.public ?? 0 };

            case "private":
              return { ...item, total: stats.bookmark?.private ?? 0 };

            default:
              return item;
          }
        }),
      };
    }
    return section;
  });
};