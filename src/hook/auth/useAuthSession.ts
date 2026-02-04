import { auth, fireDB } from '@/firebase';
import { actionUserLogin, actionUserLogout } from '@/store/redux/sliceActions';
import type { UserDataType } from '@/types/auth/auth';
import { clearSession, isSessionValid, refreshSession, saveSession, SESSION_KEY } from '@/utils/auth/session';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// 로그인 체크 및 갱신
export const useAuthSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // 로그아웃 상태
      if (!firebaseUser) {
        clearSession();
        dispatch(actionUserLogout());
        return;
      }

      const sessionData = localStorage.getItem(SESSION_KEY);
      // 세션 확인
      if (!sessionData) {
        // 최초 로그인
        saveSession(false);
      } else {
        const valid = isSessionValid();
        // 지난 경우 로그아웃 및 clear
        if (!valid) {
          await signOut(auth);
          clearSession();
          dispatch(actionUserLogout());
          return;
        }
        // 갱신 
        refreshSession();
      }

      const userRef = doc(fireDB, 'userDB', firebaseUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        // type 안정을 위해 데이터 재입력
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
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};
