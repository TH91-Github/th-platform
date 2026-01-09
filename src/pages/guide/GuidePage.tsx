import { IconCubeTransparent } from '@/assets/icon';
import { Breadcrumb } from '@/components/element/breadcrumb/Breadcrumb';
import { SideLayout } from '@/components/layout/cont/side/SideLayout';
import { GuideAbout } from '@/components/pages/guide/GuideAbout';
import { GuideContHeader } from '@/components/pages/guide/GuideContHeader';
import { GuideNav } from '@/components/pages/guide/GuideNav';
import { useToggle } from '@/hook/common/useToggle';
import { breadcrumbLists, cn } from '@/utils/common';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './GuidePage.module.scss';
import { useIsMobile } from '@/store/zustand/common/commonStore';

// 🔹 guide
export const GuidePage = () => {
  const location = useLocation();
  const showGuide = location.pathname === "/guide" || location.pathname === "/guide/";
  const [isFold, setIsFold] = useToggle(false);
  const [isMoMenuOpen, setIsMoMenuOpen] = useToggle(false);
  const isMobile = useIsMobile();
  
  return (
    <div className={styles.guide}>
      <SideLayout
        isFold={isFold}
        onFoldChange={setIsFold}
        onMoMenuChange={setIsMoMenuOpen}
      >
        <div className={cn(styles.guideNav, isFold && styles.fold)}>
          <h2>
            <NavLink to="/guide" className={styles.titleLink}>
              <span className={styles.icon}>
                <IconCubeTransparent />
              </span>
              <span className={styles.title}>가이드</span>
            </NavLink>
          </h2>
          <div className={styles.guideLists}>
            {
              (isMoMenuOpen || !isMobile) &&
              <GuideNav 
                isFold={isFold}
              />
            }
          </div>
        </div>
        {showGuide
          ? <GuideAbout />
          : <>
            <div className={styles.breadcrumbWrap}>
              <Breadcrumb data={breadcrumbLists(location.pathname)} />
            </div>
            <GuideContHeader />
            <Outlet />
          </>}
      </SideLayout>
    </div>
  )
}