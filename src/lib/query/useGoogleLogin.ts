import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fireBaseGoogleLogin } from '../firebase/auth/googleLogin';

// 🔹 구글 로그인 기능 비동기 상태 관리, 로그인 시 사용자 정보 최신화
export const useGoogleLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fireBaseGoogleLogin,
    onSuccess: (user) => {
      queryClient.invalidateQueries({
        queryKey: ['user', user.uid],
      });
    },
  });
};
