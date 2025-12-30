import { Outlet } from 'react-router-dom';
import { RootLayout } from '@/components/layout/rootLayout/RootLayout';
import styles from '@/App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      {/* <HeaderLayout /> */}
      <div className={styles.contents}>
        <Outlet />
      </div>
      <RootLayout />
    </div>
  )
}

export default App
