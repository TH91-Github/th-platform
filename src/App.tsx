import { Outlet } from 'react-router-dom';
import '@/assets/style/common/index.scss';
import css from '@/App.module.scss'

function App() {
  return (
    <div className={css.app}>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
