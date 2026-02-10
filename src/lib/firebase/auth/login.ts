import { auth, fireDB } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// 🔹 firebase login
interface FireBaseLoginType {
  loginId: string;
  password: string;
}

export const fireBaseLogin = async ({ loginId, password }: FireBaseLoginType) => {
  let email = loginId;

  // ✅ simpleID 로그인 시도
  if (!loginId.includes('@')) {
    const simpleId = loginId.trim(); 
    const simpleRef = doc(fireDB, 'userSimpleID_list', simpleId);
    const snap = await getDoc(simpleRef);

    if (!snap.exists()) {
      throw new Error('SIMPLE_ID_NOT');
    }
    email = snap.data().email;
  }

  // ✅ 이메일 로그인
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const { uid } = userCredential.user;

  // ✅ lastLoginTime 업데이트
  const userRef = doc(fireDB, 'userDB', uid);
  await updateDoc(userRef, {
    lastLoginTime: Date.now()
  });

  return userCredential.user;
};
