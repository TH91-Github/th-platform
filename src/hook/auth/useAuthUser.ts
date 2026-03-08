import { auth } from "@/firebase";
import { useAppSelector } from "@/hook/store/useRedux";
import { useUserQuery } from "@/lib/query/useUserQuery";
import { selectAuthUser } from "@/store/redux/store";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

// 🔹 redux : 유저 간단 정보만, query: data 역할 분리.
export const useAuthUser = () => {
  const authUser = useAppSelector(selectAuthUser);
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