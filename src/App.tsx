import { Outlet } from 'react-router-dom';
import { HeaderLayout } from './components/layout/Header/HeaderLayout';
import { RootLayout } from './components/layout/RootLayout/RootLayout';
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
