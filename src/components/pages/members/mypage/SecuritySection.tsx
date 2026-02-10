import { useAuthUser } from '@/hook/auth/useAuthUser';
import styles from './MyPageDetail.module.scss'

export const SecuritySection = () =>{
  const { data: user } = useAuthUser();

  return( 
    <div className={styles.sectionWrap}>
      SecuritySection
      비밀번호,
      간편 아이디 로그인
      패스키 관리
      2단계 인증
      접속 위치
      해외 로그인 차단
    </div>
  )
}