import { NavLink } from "react-router-dom";
import styles from './LogoIcon.module.scss'

const APP_TITLE = import.meta.env.VITE_APP_TITLE;

export const LogoIcon = () => {
  return (
    <div className={styles.logo}>
      <h1 className="blind">{APP_TITLE}</h1>
      <NavLink to="/">
        <div className={styles.logoWrap} aria-hidden="true">
          {<span className={styles.logoCube}>
            {
              new Array(9).fill('_').map((_,idx) => <span key={idx} className={'cube-'+idx}></span>)
            }
          </span>}
          <div className={styles.logoTitle}>
            <span className={styles.name}>
              <em>T</em>
            </span>
            <span className={styles.name}>
              <em>H</em>
            </span>
          </div>
        </div>
      </NavLink>
    </div>
  )
}