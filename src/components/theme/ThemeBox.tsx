import { useTheme } from '../../hook/theme/useTheme';
import css from './ThemeBox.module.scss';

export function ThemeBox() {
  const { theme, toggleTheme } = useTheme();
  console.log(theme)

  return (
    <div className={css.box}>
      <button onClick={toggleTheme} style={{ marginTop: 16 }}>
        테마 전환
      </button>
    </div>
  );
}
