import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/api/auth/user';

// 🔹 userDB React Query
export const useUserQuery = (uid?: string) => {
  return useQuery({
    queryKey: ['user', uid],
    queryFn: () => fetchUser(uid!),
    enabled: !!uid, // uid 있을 때만 실행
    staleTime: 1000 * 60 * 5,
  });
};
