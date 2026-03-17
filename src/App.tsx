import { Outlet } from 'react-router-dom';
import { HeaderLayout } from '@/components/layout/header/HeaderLayout';
import { RootLayout } from '@/components/layout/rootLayout/RootLayout';
import css from '@/App.module.scss'
import { useScrollToTop } from './hook/layout/useScrollToTop';

function App() {
  useScrollToTop(); // router top
  return (
    <div className={css.app}>
      <HeaderLayout />
      <main className={css.contents}>
        <Outlet />
      </main>
      <RootLayout />
    </div>
  )
}

export default App
