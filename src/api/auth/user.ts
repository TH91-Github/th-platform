import { doc, getDoc } from 'firebase/firestore';
import type { UserDataType } from '@/types/auth/auth';
import { fireDB } from '@/firebase';

export const fetchUser = async (uid: string): Promise<UserDataType> => {
  const snap = await getDoc(doc(fireDB, 'userDB', uid));

  if (!snap.exists()) {
    throw new Error('USER_NOT_FOUND');
  }

  return snap.data() as UserDataType;
};
