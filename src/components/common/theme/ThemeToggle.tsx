import { useTheme } from '@/hook/theme/useTheme';
import styles from './ThemeToggle.module.scss';
import { IconMoon, IconSunny } from '@/assets/icon';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={styles.theme}>
      <button
        type="button"
        className={styles['theme-btn']}
        onClick={toggleTheme}
      >
        <span className={styles['theme-text']}>
          <span className={styles.text}>
            Dark
          </span>
          <span className={styles.text}>
            Light
          </span>
          <span className="blind">모드 중 {theme === 'dark' ? 'dark' : 'light'}선택 됨</span>
        </span>
        <span className={styles['mode-icon']}>
          <span className={`${styles.icon} ${styles.light}`}>
            <IconSunny />
          </span>
          <span className={`${styles.icon} ${styles.dark}`}>
            <IconMoon />
          </span>
        </span>
      </button>
    </div>
  );
}
