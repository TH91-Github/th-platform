import styles from './SwitchCheck.module.scss';

// 🔹 checkbox 활용 토글 switch
export const SwitchCheck = () => {
  return (
    <label className={styles.switch}>
      <input 
        type="checkbox" 
        className={styles.input}
      />
      <span className={styles.switchBtn}>
        <span className={styles.switchMode}>
          
        </span>
      </span>
    </label>
  )
}
