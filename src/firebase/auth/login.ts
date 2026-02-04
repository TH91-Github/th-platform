import { auth, fireDB } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// 🔹 firebase login
interface FireBaseLoginType {
  loginId: string;
  password: string;
}

export const fireBaseLogin = async ({ loginId, password }: FireBaseLoginType) => {
  let email = loginId;

  // ✅ simpleID 로그인 시도 (@ 없는 경우) : 간편 아이디 체크 및 email 불러오기
  if (!loginId.includes('@')) {
    const simpleId = loginId.trim(); 
    const simpleRef = doc(fireDB, 'userSimpleID_list', simpleId);
    const snap = await getDoc(simpleRef);

    if (!snap.exists()) {
      throw new Error('SIMPLE_ID_NOT');
    }
    email = snap.data().email;
  }

  // ✅ email 기반 로그인
  const userCredential = await signInWithEmailAndPassword(auth, email, password );
  const { uid } = userCredential.user;

  // ✅ lastLoginTime 업데이트
  const userRef = doc(fireDB, 'userDB', uid);
  await setDoc( userRef, {
    lastLoginTime: Date.now(),
  },{ merge: true });
  
  return userCredential.user;
};
