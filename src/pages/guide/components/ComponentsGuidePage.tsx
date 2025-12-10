import { Outlet } from 'react-router-dom';
import styles from './ComponentsGuidePage.module.scss';
export const ComponentsGuidePage = () => {
  return( 
    <div >
      Components Pages
      <Outlet />
    </div>
  )
}