import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, writeBatch, serverTimestamp, runTransaction, } from 'firebase/firestore';
import { auth, fireDB } from '@/firebase';
import type { UserDataType } from '@/types/auth/auth';

// 🔹 firebase 회원 가입
interface SignUpParamsType {
  email: string;
  password: string;
}
export const signUpWithEmail = async ({ email, password }: SignUpParamsType) => {
  let userCredential = null;

  try {
    // firebase auth 생성 후 간편 id 생성 후 등록
    userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    const baseID = email.split('@')[0];

    // ✅ simpleID 생성 #1 숫자로 - 중복 아이디 있는 경우 숫자 증가
    const counterRef = doc(fireDB, 'userSimpleID', baseID);
    const simpleID = await runTransaction(fireDB, async (transaction) => {
      const snap = await transaction.get(counterRef);

      let nextCount = 1;

      if (!snap.exists()) {
        transaction.set(counterRef, { currentCount: 1 });
      } else {
        const currentCount = snap.data().currentCount ?? 1;
        nextCount = currentCount + 1;
        transaction.update(counterRef, {
          currentCount: nextCount,
        });
      }

      return `${baseID}#${nextCount}`;
    });

    // ✅ userDB 저장
    const userCollectionRef = collection(fireDB, 'userDB');
    const newUserDocRef = doc(userCollectionRef);

    const userData: UserDataType = {
      id: newUserDocRef.id,
      uid,
      email,
      simpleID,
      nickName: simpleID,
      rank: 'basic',
      signupTime: serverTimestamp() as any,
      lastLoginTime: serverTimestamp() as any,
      theme: 'light',
      permission: true,
      profile: '',
    };

    const batch = writeBatch(fireDB);
    batch.set(newUserDocRef, userData);

    // simpleID  email 정보 포함 -> 간편 id 로그인 시 사용
    const simpleIDMapRef = doc(fireDB, 'userSimpleID_list', simpleID);
    batch.set(simpleIDMapRef, { 
      email, uid, createdAt: serverTimestamp() 
    });

    await batch.commit();

    return userData;

  } catch (error) {
    // auth 생성 후 DB 등록 에러 시 auth 아이디 삭제
    if (userCredential?.user) {
      await userCredential.user.delete();
    }
    throw error;
  }
};