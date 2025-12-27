import { useIsMobile } from '@/store/zustand/common/commonStore';
import styles from './SideLayout.module.scss';
import { IconArrowLeft, IconClose, IconList } from '@/assets/icon';
import { cn } from '@/utils/common';

interface SideLayoutPropsType {
  sideFixed?: boolean, // pc에서 사이드 고정 선택
  isFold?:boolean, // 고정이 아닌 경우 메뉴 접기 관련
  isMoSide?:boolean,
  innerCont?: boolean, // 컨텐츠 1140 가운데 여부
  className?: {
    menu:string,
    cont:string,
  }
  children: [React.ReactNode, React.ReactNode], // menu, cont children 전달
  onFoldChange?: () => void,
  onMoSideChange?: () => void,
}

export const SideLayout = ({
  sideFixed, isFold, isMoSide,
  innerCont, className, children,
  onFoldChange, onMoSideChange
}: SideLayoutPropsType) => {
  const isMobile = useIsMobile();
  const [menuChildren, contChildren] = children;

  // pc - menu 접기/펼치기
  const handleSideMenuFold = () => {
    onFoldChange?.()
  }
  // mo - side on/off
  const handleMoSideMenu = () => {
    onMoSideChange?.();
  }
  return (
    <div 
      className={cn(
        styles.side, 
        innerCont && styles.inner,
      )}
    >
      {/* 사이드 메뉴 */}
      <div
        className={cn(
          styles.menu, className?.menu,
          isFold && styles.isFold,
          isMoSide && styles.isMoSide
        )}
      >
        {/* sticky */}
        <div className={styles.menuInner}>
          {menuChildren}
          {(!sideFixed && !isMobile) && (  /* pc 전용 버튼 */
            <button
              type="button"
              className={cn(styles.menuOpen, isFold && styles.fold)}
              onClick={handleSideMenuFold}
            >
              <span className={styles.icon}>
                <IconArrowLeft />
              </span>
            </button>
          )}
        </div>
        {isMobile && (
          <button 
            type="button" 
            className={cn(styles.moMenuBtn, isMoSide && styles.open)}
            onClick={handleMoSideMenu}
          >
            <span className={cn(styles.icon, styles.close)}><IconClose /></span>
            <span className={cn(styles.icon, styles.list)}><IconList /></span>
            <span className="blind">{isMoSide ? '닫기' : '열기'}</span>
          </button>
        )}
      </div>
      {/* 컨텐츠 */}
      <div className={cn(styles.cont, className?.cont)}>
        {contChildren}
      </div>
    </div>
  )
}

/*
사용 방법
<SideLayout>
  <div>
  
  </div>
  <div>
    cont contChildren
  
  </div> 
</SideLayout>

*/