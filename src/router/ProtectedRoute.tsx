import { useAppSelector } from "@/hook/store/useRedux";
import { selectAuthUser } from "@/store/redux/store";
import { Navigate, Outlet } from "react-router-dom";

// 🔹 로그인(유저 정보 있는 경우)된 상태에서만 접근 가능.
export const UserProtectedRoute = () => {
  const user = useAppSelector(selectAuthUser);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

// 🔹 로그인 안 한 사람만 접근 가능
export const GuestOnlyRoute = () => {
  const user = useAppSelector(selectAuthUser);
  if (user) {
    // 이미 로그인했으면 홈(또는 마이페이지 등)으로 보내기
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};