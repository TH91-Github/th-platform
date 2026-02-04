import { Toasts } from "@/components/element/popup/Toasts";
import { usePageTitle } from "@/hook/common/usePageTitle";
import { useMobileHandle } from "@/hook/common/useMobileHandle"
import { useAuthSession } from "@/hook/auth/useAuthSession";

// 🔹 최상위 선언
export const RootLayout = () => {
   // 🔹 title 변경
  usePageTitle();
  // 🔹 mobile check
  useMobileHandle();
  // 🔹 로그인 상태 체크 및 유지
  useAuthSession();
  
  return(
    <>
      <Toasts />
    </>
  )
}