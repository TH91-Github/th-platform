import { getUserRooms } from "@/api/firebase/hub/userRooms";
import { isColName } from "@/utils/hun/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryDocumentSnapshot, type DocumentData } from "firebase/firestore";

export const useUserRooms = (uid: string, isGuest: boolean = false, limit: number = 10) => {
  const colName = isColName(isGuest, "userRooms");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    // userRooms : 유저 방 리스트
    queryKey: ['user', uid, colName],
    queryFn: ({ pageParam }: { pageParam: QueryDocumentSnapshot<DocumentData> | null }) =>(
      getUserRooms(uid, colName, pageParam, limit)
    ),
    initialPageParam: null as QueryDocumentSnapshot<DocumentData> | null,
    getNextPageParam: (lastPage) => (
      lastPage.lastDoc ?? undefined
    ),
    enabled: !!uid,
  });

  const roomData = data?.pages.flatMap(page => page.rooms) ?? [];
  return {
    roomData,
    fetchMore: fetchNextPage,
    hasMore: !!hasNextPage, 
    isLoading, // 초기 로딩
    isFetching,
    loadingMore: isFetchingNextPage, // 다음 페이지 로딩
  };
};