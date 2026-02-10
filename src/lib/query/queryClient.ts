import { QueryClient } from '@tanstack/react-query';
// 🔹 TanStack Query 기본 설정
// main.tsx QueryClientProvider 사용
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { // 읽기
      staleTime: 1000 * 60 * 5, // 재요청 방지 - 5분
      gcTime: 1000 * 60 * 10, // 10분 캐시 유지 
      refetchOnWindowFocus: false, // 창 포커스 
      refetchOnReconnect: false, // 네트워크 재연결 자동 refetch 방지
      refetchOnMount: false, 
      retry: 1, // 읽기 실패 시 재요청 수
    },
    mutations: { // 쓰기 
      retry: 0, // 쓰기 실패 시 재요청 수, 중복 요청 방지
    },
  },
});
