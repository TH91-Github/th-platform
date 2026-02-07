
import { ThemeToggle } from '@/components/common/theme/ThemeToggle';
import { LoginBtn } from '@/components/layout/header/toolMenu/LoginBtn';
import styles from './ToolMenu.module.scss';
import { memo } from 'react';

export const ToolMenu = memo(() => (
  <div className={styles.toolMenu}>
    <LoginBtn />
    <ThemeToggle />
  </div>
));
ToolMenu.displayName = 'ToolMenu';