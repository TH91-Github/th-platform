import { SideLayout } from '@/components/layout/cont/side/SideLayout';
import { useToggle } from '@/hook/common/useToggle';
import { cn } from '@/utils/common';
import styles from './GuidePage.module.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { GuideNav } from '@/components/pages/guide/GuideNav';
import { IconCubeTransparent } from '@/assets/icon';
import { GuideContHeader } from '@/components/pages/guide/GuideContHeader';
import { GuideAbout } from '@/components/pages/guide/GuideAbout';

export const GuidePage = () => {
  const location = useLocation();
  const showGuide = location.pathname === "/guide" || location.pathname === "/guide/";
  const [isFold, setIsFold] = useToggle(false);
  const [isMoSide, setIsMoSide] = useToggle(false);

  return (
    <div className={styles.guide}>
      <SideLayout
        isFold={isFold}
        isMoSide={isMoSide}
        onFoldChange={setIsFold}
        onMoSideChange={setIsMoSide}
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
            <GuideNav isFold={isFold} />
          </div>
        </div>
        <div className={cn(styles.guidCont)}>
          {
            showGuide 
            ? <GuideAbout />
            : <>
               <GuideContHeader />
               <Outlet />
            </>
          }
        </div> 
      </SideLayout>
    </div>
  )
}