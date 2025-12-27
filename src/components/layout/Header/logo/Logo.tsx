import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const APP_TITLE = import.meta.env.VITE_APP_TITLE ?? 'Platform';

export const Logo = () => {
  return (
    <h1 className={styles.logo}>
      <Link to="/">
        <span>{APP_TITLE}</span>
      </Link>
    </h1>
  )
}