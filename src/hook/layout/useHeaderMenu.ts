// /hook/layout/useHeaderMenu.ts
import { useEffect } from 'react';
import { useToggle } from '@/hook/common/useToggle';
import { useBodyScrolLock } from '@/hook/common/useCommon';

// 🔹 메뉴 토글, scroll lock
interface Props {
  isMobile: boolean;
  pathname: string;
}

export const useHeaderMenu = ({ isMobile, pathname }: Props) => {
  const [isMenuOpen, setToggle] = useToggle();
  const { lockScroll, unlockScroll } = useBodyScrolLock();

  // 라우터 이동 시 메뉴 닫기
  useEffect(() => {
    setToggle.off();
    unlockScroll();
  }, [pathname]);

  // PC 전환 시 강제 닫기
  useEffect(() => {
    if (!isMobile) {
      setToggle.off()
      unlockScroll();
    }
  }, [isMobile]);

  const handleMenuToggle = () => {
    isMenuOpen ? unlockScroll() : lockScroll();
    setToggle.toggle();
  };

  return {
    isMenuOpen,
    handleMenuToggle,
  };
};
