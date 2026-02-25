// components/ThemeToggle.tsx
import { IconMoon, IconSunny } from '@/assets/icon';
import { useTheme, useToggleTheme } from '@/store/zustand/common/commonStore';
import { cn } from '@/utils/common';
import styles from './ThemeToggle.module.scss';
interface ThemeTogglePropsType {
  modeTheme?: 'icon' | 'text';
  className?: string;
  afterText?: string; // dark/ligh 이후 추가 텍스트
}

export function ThemeToggle({ modeTheme = 'icon', className, afterText }: ThemeTogglePropsType) {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  return (
    <div
      className={cn(
        styles.theme,
        modeTheme === 'icon' ? styles.iconMode : styles.textMode,
        className
      )}
    >
      <button 
        type="button" 
        className={styles.btn}
        title={afterText ?? `${theme} Theme 변경`} 
        onClick={toggleTheme}
      >
        <span className={cn(styles.textWrap, theme === 'dark' ? styles.dark : styles.light)}>
          <span className={styles.text}>Dark</span>
          <span className={styles.text}>Light</span>
          <span className="blind">모드 중 {theme === 'dark' ? 'dark' : 'light'}선택 됨</span>
        </span>
        {modeTheme === 'icon' && (
          <span className={styles.modeIcon}>
            <span className={`${styles.icon} ${styles.light}`}>
              <IconSunny />
            </span>
            <span className={`${styles.icon} ${styles.dark}`}>
              <IconMoon />
            </span>
          </span>
        )}
        {afterText && (<span className={styles.text}>{afterText}</span>)}
      </button>
    </div>
  );
}