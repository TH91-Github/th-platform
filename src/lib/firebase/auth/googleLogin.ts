import { auth, fireDB, provider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, runTransaction, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore';

// 🔹 google 회원가입 & 로그인
export const fireBaseGoogleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  const { uid, email } = result.user;

  if (!email) throw new Error('not google');

  const userRef = doc(fireDB, 'userDB', uid);
  const userSnap = await getDoc(userRef);

  // ✅ 이미 가입된 구글 계정은 로그인 시도
  if (userSnap.exists()) {
    await updateDoc(userRef, {
      lastLoginTime: serverTimestamp(),
    });

    return result.user;
  }

  // ✅ 구글 계정 신규 가입인 경우
  const baseID = email.split('@')[0];
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
  const now = Date.now();
  const userData = {
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
  batch.set(userRef, userData);
  
  const simpleIDMapRef = doc(fireDB, 'userSimpleID_list', simpleID);
  batch.set(simpleIDMapRef, {
    email,
    uid,
    createdAt: now,
  });

  await batch.commit();

  return result.user;
};
