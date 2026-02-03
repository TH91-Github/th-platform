import { colors, colorsText } from '@/assets/style/emotion/variables';
import { Login } from '@/components/pages/members/Login';
import { SignUp } from '@/components/pages/members/SignUp';
import { RotatingSphere } from '@/components/ui/effect/RotatingSphere';
import { useAppSelector } from '@/hook/store/useRedux';
import { selectAuthUser } from '@/store/redux/store';
import { cn } from '@/utils/common';
import { useNavigate } from 'react-router-dom';
import styles from './MembersPage.module.scss';
import { useDelayRenderToggle } from '@/hook/common/useDelayRenderToggle';
import { useEffect } from 'react';
import { useIsMobile } from '@/store/zustand/common/commonStore';

export const MembersPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isUser = useAppSelector(selectAuthUser);
  const delay = !isMobile ? 1300 : 300; // mobile cover 사용 x
  // delay css와 맞춰야함 0.1s 빠르게 보이는 모션이 있기 때문.
  const { isRender, isOpen, toggle, } = useDelayRenderToggle({ delay: delay }); 

  // 로그인 상태에서 잘못 접근했을 경우
  useEffect(() => {
    if (isUser) {
      navigate('/');
    }
  }, [isUser, navigate]);

  if (isUser) {
    return null; // or <></>
  }

  return (
    <div className={cn(styles.membersWrap, isOpen ? styles.signup : styles.login)}>
      <div className={styles.inner}>
        <div className={cn(styles.memberForm, styles.loginWrap)}>
          {!isRender && <Login modeChange={toggle} /> }
        </div>
        <div className={cn(styles.memberForm, styles.signupWrap)}>
          {isRender && <SignUp modeChange={toggle} /> }
        </div>
        { !isMobile && ( 
          <div className={styles.cover}>
            <div className={styles.heading}>
              <RotatingSphere
                dotColor={isRender ? colors.yellow : colors.green}
                canvasSize={150}
                pointCount={150}
                rotateY={0.003}
                rotateX={0.0008}
                text={isRender ? 'Sign up' : 'Sign in'}
                textColor={colorsText.titleW}
              />
            </div>
            <div className={styles.textWrap}>
              <p className={styles.title}>소중한 순간을 함께 기록하세요.</p>
              <p className={styles.desc}>
                혼자서도, 함께해도 좋은 기록 공간<br />
                로그인하고 여행 기록, 가계부를 공유하고<br />
                개인 일정과 기록도 체계적으로 관리할 수 있어요.
              </p>
              <p className={styles.desc}>지금 시작해보세요.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}