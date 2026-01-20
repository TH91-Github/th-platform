import { useIsLogin } from '@/store/zustand/auth/authStore'
import { IconLogin } from '@/assets/icon';
import styles from './AuthBtn.module.scss'

export const AuthBtn = () => {
  const isLogin = useIsLogin();

  const handleLoginClick = () => {
    // 로그인 페이지로
    alert('준비중')
  }
  return (
    <div className={styles.auth}>
      { !isLogin
        ? (
          <button
            type="button"
            className={styles.btn}
            onClick={handleLoginClick}
          >
            <IconLogin />
          </button>
        )
        : '로그아웃'
      }
    </div>
  )
}