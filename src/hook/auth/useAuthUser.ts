import { selectAuthUser } from "@/store/redux/store";
import { useAppSelector } from "../store/useRedux";

// 🔹 user 체크 후 user 반환
export const useAuthUser = () => {
  const user = useAppSelector(selectAuthUser);
  if (!user) {
    throw new Error("user 정보가 없습니다.");
  }
  return user;
};