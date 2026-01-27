import { IconLogin, IconLogout } from '@/assets/icon';
import { useCloseAniToggle } from '@/hook/common/useCloseAniToggle';
import { useAppDispatch, useAppSelector } from '@/hook/store/useRedux';
import { actionUserLogout } from '@/store/redux/sliceActions';
import { selectAuthUser } from '@/store/redux/store';
import { cn } from '@/utils/common';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './LoginBtn.module.scss';

export const LoginBtn = () => {
  const isUser = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    isRender,
    isOpen,
    isClosing,
    toggle,
    containerRef
  } = useCloseAniToggle();

  // 로그인 페이지로
  const handleLoginClick = () => {
    console.log(isUser)
    if(!isUser){
      navigate('/members');
    }else{

    }
  }

  // 로그아웃
  const handleLogout = () => {
    if(isUser){
      dispatch(actionUserLogout());
      navigate('/');
    }
  }
  return (
    <div className={styles.loginBtnWrap}>
      { !isUser ? (
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
            <span>{'ㅇ'} 님</span>
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
                <NavLink
                  to={'/members/mypage'}
                  className={styles.navLink}
                >
                  <i><IconLogin /></i>
                  <span>My 페이지</span>
                </NavLink>
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
        )
      }
      
    </div>
  )
}