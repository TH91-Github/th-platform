import { useTheme } from '../hook/theme/useTheme';
import css from './ThemeBox.module.scss';

export function ThemeBox() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={css.box}>
      <div className={css.title}>확인{theme}</div>

      <button onClick={toggleTheme} style={{ marginTop: 16 }}>
        테마 전환
      </button>
    </div>
  );
}
