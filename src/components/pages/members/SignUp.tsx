import styles from './SignUp.module.scss';

interface SignUpPropsType {
  modeChange : () => void
}
export const SignUp = ({modeChange}: SignUpPropsType) => {
  return(
    <div className={styles.signup}>
      <span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span>
       <span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span> <span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span> <span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span> <span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span> <span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span><span>"로그인"</span>
      <button 
          type="button"
          title="로그인 하기"
          className={styles.signupBtn}
          onClick={modeChange}
        >
          <span>"로그인"</span>
        </button>
    </div>
  )
}