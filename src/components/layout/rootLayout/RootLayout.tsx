import { Toasts } from "@/components/element/popup/Toasts";
import { usePageTitle } from "@/hook/common/usePageTitle";
import { useMobileHandle } from "@/hook/common/useMobileHandle"

// 🔹 최상위 선언
export const RootLayout = () => {
   // 🔹 title 변경
  usePageTitle();
  // 🔹 mobile check
  useMobileHandle();
  return(
    <>
      <Toasts />
    </>
  )
}