import styles from './HubMenu.module.scss'
import { HiMiniServerStack } from "react-icons/hi2";

// 🔹 hub side menu
export const HubMenu = () =>{
  return (
    <div className={styles.menu}>
      <h2 className={styles.logo}>
        <i className={styles.icon}><HiMiniServerStack /></i>
      </h2>
    </div>
  )
}