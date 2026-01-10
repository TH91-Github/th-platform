import { RunIntro } from '@/components/pages/run/RunIntro';
import styles from './RunPage.module.scss';
import { useState } from 'react';
import { RunMain } from '@/components/pages/run/RunMain';

export const RunPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  console.log('사라진다')
  return (
    <div className={styles.run}>
      {/* intro */}
     {showIntro && (
        <RunIntro onExitComplete={() => setShowIntro(false)} />
      )}
      <RunMain />
      {/* RunPulse */}
      {/* 뛰었다면 충분해 */}
    </div>
  )
}