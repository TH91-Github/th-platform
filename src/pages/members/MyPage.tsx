import { IconUser } from "@/assets/icon";
import { ParticleNetwork } from "@/components/isolated/particle-network/ParticleNetwork";
import { useAppSelector } from "@/hook/store/useRedux";
import { selectAuthUser } from "@/store/redux/store";
import { cn } from "@/utils/common";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './MyPage.module.scss';
import { AccountMenu } from "@/components/pages/members/mypage/AccountMenu";

export const MyPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectAuthUser);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  if(!user) return null
  return(
    <div className={styles.myPageWrap}>
      <div className={styles.headWrap}>
        <ParticleNetwork />
        <div className={styles.heading}>
          <h2 className={styles.title}>My Page</h2>
          <p className={styles.desc}>환영합니다.</p>
        </div>
      </div>
      <div className={styles.contWrap}>
        <div className={styles.userInfo}>
          <div className={styles.profile}>
            <div className={cn(styles.profileImg, !user.profile && styles.notImg)}>
              { styles.profile ? (
                <img src={user.profile} alt={user.nickName + '프로필 사진'} />
                ) : (
                  <i className={styles.icon}><IconUser /></i>
                )}
            </div>
            <p className={styles.name}>{user.nickName}</p>
          </div>
          <div className={styles.menu}>
            <AccountMenu />
          </div>
        </div>
        <div className={styles.detail}>
          서비스 준비 중...
        </div>
      </div>
    </div>
  )
}