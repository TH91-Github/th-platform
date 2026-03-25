import { auth } from "@/firebase";
import { useUserQuery } from "@/lib/query/useUserQuery";
import { useAuthUser as useAuthUserStore } from "@/store/zustand/auth/authStore";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

// 🔹 유저 간단 정보는 store, userDB 데이터는 query 역할 분리.
export const useAuthUser = () => {
  const authUser = useAuthUserStore();
  const query = useUserQuery(authUser?.uid);

  // 🔹 userDB 없으면 로그아웃
  useEffect(() => {
    if (query.error instanceof Error) {
      if (query.error.message === "USER_NOT_FOUND") {
        signOut(auth);
      }
    }
  }, [query.error]);

  return {
    authUser,
    ...query,
  };
};
