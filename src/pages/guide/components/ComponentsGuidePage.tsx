import { Outlet } from 'react-router-dom';

export const ComponentsGuidePage = () => {

  return( 
    <div className="guide-cont">
      <div className="guide-inner">
        {/* gate(element, module, layout) */}
        <Outlet />
      </div>
    </div>
  )
}