import { auth } from '@/firebase';
import { actionUserLogin, actionUserLogout } from '@/store/redux/sliceActions';
import { useAddToast } from '@/store/zustand/common/toastStore';
import { clearSession, isSessionValid, refreshSession, saveSession, SESSION_KEY } from '@/utils/auth/session';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// 🔹 로그인 체크 및 갱신
export const useAuthSession = () => {
  const dispatch = useDispatch();
  const addToast = useAddToast();

  const handleLogout = useCallback(async (isSessionExpired = false) => {
    try {
      dispatch(actionUserLogout());
      clearSession();
      await signOut(auth);

      if (isSessionExpired) {
        addToast('세션이 만료되었습니다.');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      addToast('로그아웃 중 오류가 발생했습니다.', 'error');
    }
  }, [dispatch, addToast]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        handleLogout();
        return;
      }

      // 🔹 세션 확인
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (!sessionData) {
        saveSession(false);
      } else {
        const valid = isSessionValid();
        if (!valid) {
          handleLogout(true);
          return;
        }
        refreshSession();
      }

      // uid, email 업데이트 후 query 통해 유저 정보 업데이트
      dispatch(actionUserLogin({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        }
      }));

    });

    return () => unsubscribe();
  }, [dispatch, addToast, handleLogout]);
};

