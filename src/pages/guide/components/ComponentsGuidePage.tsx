import { cn } from '@/utils/common';
import { Outlet, useNavigationType, useParams } from 'react-router-dom';
import styles from './ComponentsGuidePage.module.scss'
import { useEffect } from 'react';
import { useToggle } from '@/hook/common/useToggle';

export const ComponentsGuidePage = () => {
  const navigationType = useNavigationType();
  const { id } = useParams<{ id?: string }>();
  const [detailsAni, setDetailsAni] = useToggle(false)

  // 직접 URL접근과 리스트에서 접근 시 
  useEffect(() => {
    if(id){ 
      if (navigationType === 'POP') { // POP : 바로 URL 접근 및 새로고침 시
        console.log('새로고침 바로 접근')
        setDetailsAni(false);
      } else { // PUSH : 리스트에서 상세페이지
        console.log('일반 접근')
        setDetailsAni(true);
      }
    }else{ // components lists
      setDetailsAni(true);
    }
  }, [id, navigationType]);

  console.log('components')
  
  return( 
    <div className={cn(styles.components,'guide-cont')}>
      {/* element, module, layout */}
      <Outlet context={{ id, detailsAni }} />
    </div>
  )
}