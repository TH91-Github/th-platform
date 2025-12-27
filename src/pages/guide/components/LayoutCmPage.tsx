import { GuideSearch } from '@/components/pages/guide/GuideSearch';
import { useRestoreFocus } from '@/hook/common/useCommon';
import type { ContextPropsType } from '@/types/guide';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
export const LayoutCmPage = () => {
  const {id, detailsAni } = useOutletContext<ContextPropsType>();
  const navigate = useNavigate();
  
  const {beforeFocus, resetFocus} = useRestoreFocus();

  const handleItemClick = (pathID:string) => {
    beforeFocus(pathID);
    navigate(`element/${pathID}`);
  }

  return( 
    <div >
      {/* 검색 모듈  */}
      <GuideSearch title='컴포넌트 키워드를 검색하세요 🔎 ' />
      {/* 검색 이후 나오는 viewp */}
      <Outlet context={{ id, detailsAni }} />
    </div>
  )
}