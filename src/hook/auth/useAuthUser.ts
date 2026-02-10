import { selectAuthUser } from "@/store/redux/store";
import { useAppSelector } from "../store/useRedux";
import { useUserQuery } from "@/lib/query/useUserQuery";

// 🔹 user 체크 후 user 정보 반환
export const useAuthUser = () => {
  const authUser = useAppSelector(selectAuthUser);
  const query = useUserQuery(authUser?.uid);

  return {
    authUser,
    ...query, // data, isLoading
  };
};