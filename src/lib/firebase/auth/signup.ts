import { auth, fireDB } from '@/firebase';
import type { UserDataType } from '@/types/auth/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, runTransaction, writeBatch } from 'firebase/firestore';

// 🔹 firebase 회원 가입
interface FireBaseSignUpType {
  email: string;
  password: string;
}
export const fireBaseSignUp = async ({ email, password }: FireBaseSignUpType) => {
  let userCredential = null;

  try {
    // firebase auth 생성 후 간편 id 생성 후 등록
    userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    const baseID = email.split('@')[0];

    // ✅ simpleID 생성 _1 숫자로 - 중복 아이디 있는 경우 숫자 증가
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
      return `${baseID}_${nextCount}`;
    });

    // ✅ userDB 저장
    const newUserDocRef = doc(fireDB, 'userDB', uid);
    const now = Date.now();

    const userData: UserDataType = {
      uid,
      email,
      simpleID,
      nickName: simpleID,
      rank: 'basic',
      signupTime: now,
      lastLoginTime: now,
      theme: 'light',
      permission: true,
      profile: '',
    };

    const batch = writeBatch(fireDB);
    batch.set(newUserDocRef, userData);

    // simpleID  email 정보 포함 -> 간편 id 로그인 시 사용
    batch.set(doc(fireDB, 'userSimpleID_list', simpleID), {
      email,
      uid,
      createdAt: now,
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