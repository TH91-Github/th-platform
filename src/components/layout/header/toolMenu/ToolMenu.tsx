
import { ThemeToggle } from '@/components/common/theme/ThemeToggle';
import { LoginBtn } from '@/components/common/auth/LoginBtn';
import styles from './ToolMenu.module.scss';

export const ToolMenu = () => {

  return (
    <div className={styles.toolMenu}>
      {/* 로그인 */}
      <LoginBtn />
      {/* 다크/라이트 */}
      <ThemeToggle />
    </div>
  )
}