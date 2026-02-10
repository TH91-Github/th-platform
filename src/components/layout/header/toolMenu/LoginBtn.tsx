import { IconLogin, IconLogout } from '@/assets/icon';
import { auth } from '@/firebase';
import { useAuthUser } from '@/hook/auth/useAuthUser';
import { useCloseAniToggle } from '@/hook/common/useCloseAniToggle';
import { useAppDispatch } from '@/hook/store/useRedux';
import { actionUserLogout } from '@/store/redux/sliceActions';
import { clearSession } from '@/utils/auth/session';
import { cn } from '@/utils/common';
import { signOut } from 'firebase/auth';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginBtn.module.scss';

// 로그인 이동, 로그아웃, 마이페이지 이동
export const LoginBtn = memo(() => {
  const { data: user } = useAuthUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isRender, isOpen, isClosing, toggle, close, containerRef } = useCloseAniToggle();

  const handleLoginClick = useCallback(() => {
    if (!user) navigate('/members');
  }, [user]);

  const handleLogout = useCallback(async () => {
    if (user) {
      dispatch(actionUserLogout());
      await signOut(auth);
      clearSession();
      close();
      navigate('/');
    }
  }, [user, dispatch, close]);

  const handleMyPage = useCallback(() => {
    close();
    navigate('/mypage');
  }, [close]); 

  return (
    <div className={styles.loginBtnWrap}>
      { !user ? (
        <button
          type="button"
          className={styles.btn}
          title="로그인 하기"
          onClick={handleLoginClick}
        >
          <IconLogin />
        </button>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => toggle()}
          >
            <span>{user.nickName ?? '회원'}님</span>
          </button>
        </div>
      )}
      {isRender && (
        <div 
          ref={containerRef}
          className={cn(
            styles.menu,
            isOpen && styles.open,
            isClosing && styles.off
          )}
        >
          <ul>
            <li>
              <button 
                type="button" 
                className={styles.navLink} 
                onClick={handleMyPage}
              >
                <i><IconLogin /></i>
                <span>My 페이지</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={styles.navLink}
                title="로그아웃 하기"
                onClick={handleLogout}
              >
                <i><IconLogout /></i>
                <span>로그아웃</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      
    </div>
  )
});
LoginBtn.displayName = 'LoginBtn';