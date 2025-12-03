
import { ThemeToggle } from '@/components/common/theme/ThemeToggle';
import styles from './ToolMenu.module.scss';
import { AuthBtn } from '@/components/common/auth/AuthBtn';

export const ToolMenu = () => {
  
  return (
    <div className={styles['tool-menu']}>
      {/* 로그인 */}
      <AuthBtn />
      {/* 다크/라이트 */}
      <ThemeToggle />
    </div>
  )
}