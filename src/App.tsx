
import styles from '@/App.module.scss'
import { VercelTest } from '@/components/VercelTest'
import { HeaderTest } from './components/layout/header/HeaderTest'

function App() {
  return (
    <div className={styles.app}>
      <HeaderTest />
      <VercelTest />
    </div>
  )
}

export default App
