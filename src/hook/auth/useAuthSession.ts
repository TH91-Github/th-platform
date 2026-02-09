import { auth, fireDB } from '@/firebase';
import { actionUserLogin, actionUserLogout } from '@/store/redux/sliceActions';
import { useAddToast } from '@/store/zustand/common/toastStore';
import type { UserDataType } from '@/types/auth/auth';
import { clearSession, isSessionValid, refreshSession, saveSession, SESSION_KEY } from '@/utils/auth/session';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// 🔹 로그인 체크 및 갱신
export const useAuthSession = () => {
  const dispatch = useDispatch();
  const addToast = useAddToast();

  // 로그아웃
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
      // 로그아웃
      if (!firebaseUser) {
        handleLogout();
        return;
      }
      // 세션 확인
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (!sessionData) {
        saveSession(false);
      } else {
        const valid = isSessionValid();
        if (!valid) {
          handleLogout(true); // 세션 만료
          return;
        }
        refreshSession();
      }
      const userRef = doc(fireDB, 'userDB', firebaseUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data() as UserDataType;
        const user: UserDataType = {
          uid: data.uid,
          email: data.email,
          simpleID: data.simpleID,
          nickName: data.nickName,
          rank: data.rank,
          signupTime: data.signupTime,
          lastLoginTime: data.lastLoginTime,
          theme: data.theme,
          permission: data.permission,
          profile: data.profile,
        };
        dispatch(actionUserLogin({ user }));
        console.log('로그인')
      } else {
        // 문서 없는 경우 로그아웃 처리 
        console.error('로그인 정보를 확인할 수 없습니다.')
        handleLogout();
        addToast('로그인 정보를 확인할 수 없어 로그아웃 됩니다.','error');
      }
    });

    return () => unsubscribe();
  }, [dispatch, addToast, handleLogout]);
};
