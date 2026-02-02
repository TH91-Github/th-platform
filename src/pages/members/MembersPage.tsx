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

export const MembersPage = () => {
  const navigate = useNavigate();
  const isUser = useAppSelector(selectAuthUser);
  // delay css와 맞춰야함 0.1s 빠르게 보이는 모션이 있기 때문.
  const { isRender, isOpen, toggle, } = useDelayRenderToggle({ delay: 1300  }); 

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
        </div>
      </div>
    </div>
  )
}