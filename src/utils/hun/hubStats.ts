import type { UserRoomStats } from "@/types/hub/firebase";
import type { HubTotalType } from "@/types/hub/hub";
import type { HubStatsType } from "@/types/hub/hubDB";

// 🔹 기본 데이터 + DB(개인별 방 통계) 머지
export const userTotalMerge = (
  baseData: HubTotalType[],
  statsData?: HubStatsType | null
): HubTotalType[] => {

  if (!statsData) return baseData;

  return baseData.map(section => ({
    ...section,
    totalLists: section.totalLists.map(item => {

      let total = 0;

      if (section.totalCategory === "total") {
        switch (item.id) {
          case "all":
            total = statsData.totalCount;
            break;
          case "single":
            total = statsData.mode.single;
            break;
          case "team":
            total = statsData.mode.team;
            break;
          case "public":
            total = statsData.visibility.public;
            break;
          case "private":
            total = statsData.visibility.private;
            break;
        }
      }

      if (section.totalCategory === "category") {
        total =
          statsData.category[
            item.id as keyof HubStatsType["category"]
          ] ?? 0;
      }

      if (section.totalCategory === "bookmark") {
        if (item.id === "all") {
          total = statsData.bookmark.total;
        } else {
          total =
            statsData.bookmark[
              item.id as keyof HubStatsType["bookmark"]
            ] ?? 0;
        }
      }

      return {
        ...item,
        total
      };
    })
  }));
};