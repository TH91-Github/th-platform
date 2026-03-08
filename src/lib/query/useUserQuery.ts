import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/api/auth/user';

// 🔹 userDB React Query
export const useUserQuery = (uid?: string) => {
  return useQuery({
    queryKey: ['user', uid],
    queryFn: () => fetchUser(uid!),
    enabled: !!uid,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};
