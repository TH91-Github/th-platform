import type { MembersType } from "@/types/hub/hub";
import styles from './MemberProfileIcon.module.scss';
import { IconUser } from "@/assets/icon";
// 🔹 멤버 프로필 아이콘
interface MemberProfileIconPropsType {
  data: MembersType,
  isReadonly?:boolean,
} 
export const MemberProfileIcon = ({data, isReadonly=true}: MemberProfileIconPropsType ) => {
  
  const memberClick = () => {
    alert(isReadonly)
  }
  return (
    <button 
      className={styles.member}
      type="button"
      disabled={isReadonly}
      onClick={memberClick}
    >
      <div className={styles.profile}>
        { data.imgSrc.includes('#')
          ? (
            <div className={styles.icon} style={{backgroundColor:data.imgSrc}}>
              <i><IconUser /></i>
            </div>
          ) : (
            <div className={styles.img}>
              <img src={styles.img} alt={`${data.nickName} Profile`} />
            </div>
          )
        }
      </div>
      <span className={styles.name}>{data.nickName}</span>
    </button>
  )
}