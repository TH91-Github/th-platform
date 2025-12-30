import { GuideSearch } from '@/components/pages/guide/GuideSearch';
import styles from './ModulesCmPage.module.scss';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import type { ContextPropsType } from '@/types/guide';
import { useRestoreFocus } from '@/hook/common/useCommon';
export const ModulesCmPage = () => {
  const {id, detailsAni } = useOutletContext<ContextPropsType>();
  const navigate = useNavigate();
  const {beforeFocus, resetFocus} = useRestoreFocus();

  const handleItemClick = (pathID:string) => {
    beforeFocus(pathID);
    navigate(`element/${pathID}`);
    if(false){
      resetFocus()
    }
  }

  return( 
    <div className={styles.modules}>
      {/* 검색 모듈  */}
      <GuideSearch title='컴포넌트 키워드를 검색하세요 🔎 ' />
      {/* 검색 이후 나오는 viewp */}
      <Outlet context={{ id, detailsAni }} />
      <button onClick={() => handleItemClick('d')}>test </button>
    </div>
  )
}