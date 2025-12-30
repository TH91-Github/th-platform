
import styles from '@/App.module.scss'
import { VercelTest } from '@/components/VercelTest'
import { HeaderLayout } from './components/layout/HeaderLayout'

function App() {
  return (
    <div className={styles.app}>
      <HeaderLayout />
      <VercelTest />
    </div>
  )
}

export default App
