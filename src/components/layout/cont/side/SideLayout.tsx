import { useIsMobile } from '@/store/zustand/common/commonStore';
import { IconArrowLeft, IconClose, IconList } from '@/assets/icon';
import { cn } from '@/utils/common';
import styled from '@emotion/styled';
import { bp, media } from '@/assets/style/emotion/variables';

// 🔹 사이드 layout
interface SideLayoutPropsType {
  sideFixed?: boolean, // pc에서 사이드 고정 선택
  $sideW?: number, // 사이드 고정 넓이
  isFold?:boolean, // 고정이 아닌 경우 메뉴 접기 관련
  isMoMenu?:boolean, // mo 상태에서 menu on/off
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
  sideFixed, $sideW, isFold, isMoMenu,
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
    <StyleWrap 
      className={cn(
        'side', 
        innerCont && 'inner',
      )}
      $sideW = {$sideW ?? 250}
    >
      {/* 사이드 메뉴 */}
      <div
        className={cn(
          'menu',
          isFold && 'is-fold',
          isMoMenu && 'is-mo-open',
        )}
      >
        {/* sticky */}
        <div className="menu-inner">
          {menuChildren}
          {(!sideFixed && !isMobile) && (  /* pc 전용 버튼 */
            <button
              type="button"
              className={cn('menu-open', isFold && 'fold')}
              onClick={handleSideMenuFold}
            >
              <span className="icon">
                <IconArrowLeft />
              </span>
            </button>
          )}
        </div>
        {isMobile && (
          <button 
            type="button" 
            className={cn('mo-menu-btn', isMoMenu && 'open')}
            onClick={handleMoSideMenu}
          >
            <span className="icon close"><IconClose /></span>
            <span className="icon list"><IconList /></span>
            <span className="blind">{isMoMenu ? '닫기' : '열기'}</span>
          </button>
        )}
      </div>
      {/* 컨텐츠 */}
      <div className={cn('cont', className?.cont)}>
        {contChildren}
      </div>
    </StyleWrap>
  )
}

type StyleWrapType = { 
  $sideW :number
}
const StyleWrap = styled.div<StyleWrapType>`
  display: flex;
  position:relative;
  width:100%;
  margin:0 auto;
  padding:20px 0 0;
  &.inner{
    max-width:${bp.tablet}px;
    padding: 20px 30px;
  }
  .menu {
    width:100%;
    transition: max-width 0.3s ease;
  }
  .menu-open{
    display:flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    top:20px;
    right:0;
    width:30px;
    height:30px;
    border-radius:50%;
    border:1px solid var(--color-line);
    background-color: var(--color-origin);
    transition: var(--transition-bg), var(--transition-border);
    transform: translateX(50%);
    .icon{
      display:block;
      width:25px;
      height:25px;
      color:var(--color);
      transition: var(--transition-color), var(--transition-transform);
    }
    &.fold{ 
      .icon {
        transform: rotate(180deg);
      }
    }
  }
  .cont{
    flex-grow:1;
    position:relative;
    width:calc(100% - ${({$sideW}) => $sideW}px);
    min-height: calc(var(--min-h) - 20px);
    border-top-left-radius:10px;
    border: 1px solid var(--color-line);
    background-color: var(--color-origin-on);
    box-shadow: var(--box-shadow);
    transition: var(--transition-bg), var(--transition-border);
  }
  .mo-menu-btn{
    display:none;
  }
  ${media.tabletPc}{
    .menu{
      flex-shrink: 0;
      max-width:${({$sideW}) => $sideW}px;
      &.is-fold {
        max-width:70px;
        .menu-inner{
          padding:0;
        }
      }
    }
    .menu-inner{
      position:sticky;
      z-index:2;
      top: calc( var(--header-h));
      max-height: var(--min-h);
      padding:20px 20px 20px 30px;
    }
      
  }

  ${media.mob}{
    padding:0;
    .menu{
      position:absolute;
      z-index:2;
      top:0;
      left:0;
      &.is-mo-open {
        position:fixed;
        z-index:100;
        .menu-inner{
          display:block;
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:1000svh;
          background:#fff;
          padding:20px;
        }
      }
    }
    .menu-inner{
      display:none;
    }
    .mo-menu-btn{
      display:block;
      overflow:hidden;
      position:absolute;
      top:15px;
      right:15px;
      width: 30px;
      height:30px;
      &.open {
        .close{
          transform:translate(-50%, -50%) scale(1);
        }
        .list{
          transform:translate(-50%, -50%) scale(0);
        }
      }
      .icon {
        display:block;
        position:absolute;
        top:50%;
        left:50%;
        width:25px;
        height:25px;
        transform:translate(-50%, -50%);
        transition: var(--transition-transform), var(--transition-color);
        color:var(--color);
      }
      .close{
        transform:translate(-50%, -50%) scale(0);
      }
      .list{
        transform:translate(-50%, -50%) scale(1);
      }
    }
    .cont{
      width:100%;
      border-radius: 0;
    }
  }
`;
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