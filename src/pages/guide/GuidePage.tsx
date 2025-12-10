import { SideLayout } from '@/components/layout/cont/side/SideLayout';
import { useToggle } from '@/hook/common/useToggle';
import { cn } from '@/utils/common';
import styles from './GuidePage.module.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { GuideNav } from '@/components/pages/guide/GuideNav';

export const GuidePage = () => {
  const [isFold, setIsFold] = useToggle(false);

  return (
    <div className={styles.guide}>
      <SideLayout
        isFold={isFold}
        onFoldChange={setIsFold}
      >
        <div className={cn(isFold && styles.fold)}>
          <h2 className="title">
            <NavLink to="guide">
              <span>가이드</span>
            </NavLink>
          </h2>
          <div>
            <p className="tit">목록</p>
            <GuideNav />
          </div>
        </div>
        <div>
          cont contChildren
          <Outlet />
        </div> 
      </SideLayout>
    </div>
  )
}