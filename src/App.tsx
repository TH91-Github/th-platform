
import styles from '@/App.module.scss'
import { VercelTest } from '@/components/VercelTest'
import { Header } from './components/layout/header/Header'

function App() {
  return (
    <div className={styles.app}>
      <Header />
     <VercelTest />
    </div>
  )
}

export default App
