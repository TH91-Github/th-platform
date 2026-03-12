import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/api/auth/user';

// 🔹 userDB React Query
export const useUserQuery = (uid?: string) => {
  return useQuery({
    queryKey: ['user', uid, 'userDB'], // user 관련 user 통일
    queryFn: () => fetchUser(uid!),
    enabled: !!uid,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};
