import { useAuthStatus } from "@/store/zustand/auth/authStore";
import { Navigate, Outlet } from "react-router-dom";

// 🔹 로그인(유저 정보 있는 경우)된 상태에서만 접근 가능.
export const UserProtectedRoute = () => {
  const { user, isAuthReady } = useAuthStatus();
  if (!isAuthReady) {
    return null;
  }
  if (!user) {
    // 유저 정보 없는 경우 홈으로
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

// 🔹 로그인 안 한 사람만 접근 가능
export const GuestOnlyRoute = () => {
  const { user, isAuthReady } = useAuthStatus();
  if (!isAuthReady) {
    return null;
  }
  if (user) {
    // 로그인 시 홈으로
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
