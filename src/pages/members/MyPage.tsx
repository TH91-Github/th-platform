import { ThemeToggle } from "@/components/common/theme/ThemeToggle";
import { ParticleHeading } from "@/components/layout/cont/heading/ParticleHeading";
import { myMenuList, MyPageDetail } from "@/components/pages/members/mypage/MyPageDetail";
import { IconMatch } from "@/components/ui/icon/IconMatch";
import { useAuthUser } from "@/hook/auth/useAuthUser";
import type { MenuTListType } from "@/types/member/mypage";
import { cn } from "@/utils/common";
import { useState } from "react";
import styles from './MyPage.module.scss';

// 🔹 마이페이지
export const MyPage = () => {
  const user = useAuthUser();
  const [activeTab, setActiveTab] = useState<MenuTListType>('profile');

  if(!user) return null
  return(
    <div className={styles.wrap}>
      <ParticleHeading title="My Page" desc="환영합니다." />
      <div className={styles.inner}>
        <div className={styles.cont}>
          <div className={styles.sideMenu}>
            <div className={styles.profile}>
              <div className={cn(styles.profileImg, !user.profile && styles.notImg)}>
                { styles.profile ? (
                  <img src={user.profile} alt={user.nickName + '프로필 사진'} />
                  ) : (
                    <i className={styles.icon}><IconMatch id={'icon-user'} /></i>
                  )}
              </div>
              <p className={styles.name}>{user.nickName}</p>
            </div>
            <div className={styles.menuWrap}>
              <ul className={styles.menu}>
                {myMenuList.map(menuItem => (
                  <li key={menuItem.id}>
                    <button
                      className={cn(
                        styles.menuBtn,
                        activeTab === menuItem.id && styles.active
                      )}
                      onClick={() => setActiveTab(menuItem.id)}
                    >
                      <span>{menuItem.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className={styles.bottomMenu}>
                <ThemeToggle 
                  modeTheme="text"
                  afterText="테마 변경"
                />
              </div>
            </div>
          </div>
          <div className={styles.detail}>
             <MyPageDetail selectId={activeTab} />
          </div>
        </div>
      </div>
    </div>
  )
}