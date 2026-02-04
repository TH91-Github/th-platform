import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "@/firebase";
import type { UserDataType } from "@/types/auth/auth";

// user DB getDoc
export const getUserDoc = async (uid: string):Promise<UserDataType | null> => {
  try {
    const userDocRef = doc(fireDB, "userDB", uid);
    const snapshot = await getDoc(userDocRef);
    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as UserDataType;
  } catch (error) {
    console.error("유저 조회 실패:", error);
    return null;
  }
};

