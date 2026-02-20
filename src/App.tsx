import { Outlet } from 'react-router-dom';
import { HeaderLayout } from '@/components/layout/header/HeaderLayout';
import { RootLayout } from '@/components/layout/rootLayout/RootLayout';
import css from '@/App.module.scss'

function App() {
  return (
    <div className={css.app}>
      <HeaderLayout />
      <div className={css.contents}>
        <Outlet />
      </div>
      <RootLayout />
    </div>
  )
}

export default App
