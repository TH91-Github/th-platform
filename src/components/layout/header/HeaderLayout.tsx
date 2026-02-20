
import { MoreBtn } from '@/components/element/button/MoreBtn';
import { LogoIcon } from '@/components/ui/icon/LogoIcon';
import { useHeaderMenu } from '@/hook/layout/useHeaderMenu';
import { useHeaderScrollState } from '@/hook/layout/useHeaderScrollState';
import { useIsMobile } from '@/store/zustand/common/commonStore';
import { cn } from '@/utils/common';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { GnbMenu } from './gnbMenu/GnbMenu';
import styles from './HeaderLayout.module.scss';
import { ToolMenu } from './toolMenu/ToolMenu';

// 🔹 header 
export const HeaderLayout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isScrolled = useHeaderScrollState();
  const { isMenuOpen, handleMenuToggle } = useHeaderMenu({
    isMobile,
    pathname: location.pathname,
  });
  
  // header bg 투명 필요한 url
  const transparentUrl = ['/', '/mypage', '/notice']
  const isTransparent = transparentUrl.includes(location.pathname) && !isScrolled;

  return (
    <header 
      className={cn(
        styles.header, 
        isTransparent && styles.transparent, 
        isScrolled && styles.scroll,
        isMenuOpen && styles.open
      )}
    >
      <div className={styles.inner}>
        <LogoIcon />
        <GnbMenu isOpen={isMenuOpen} />
        <ToolMenu />
        {isMobile && (
          <MoreBtn 
            isTransparent={isTransparent}
            isOpen={isMenuOpen}
            onClick={handleMenuToggle} 
          />
        )}
      </div>
    </header>
  );
};
