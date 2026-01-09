import { Outlet } from 'react-router-dom';

// 🔹 디자인 
export const DesignGuidePage = () => {
  return( 
    <div className="guide-cont">
      <div className="guide-inner">
        <Outlet />
      </div>
    </div>
  )
}