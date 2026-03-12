import { IconUser } from "@/assets/icon";
import type { MemberPreviewType, MembersType } from "@/types/hub/hub";
import styles from './MemberProfileIcon.module.scss';
// 🔹 멤버 프로필 아이콘
interface MemberProfileIconPropsType {
  data: MemberPreviewType,
  isReadonly?:boolean,
} 
export const MemberProfileIcon = ({data, isReadonly=true}: MemberProfileIconPropsType ) => {
  const memberClick = () => {
    alert(isReadonly)
  }

  // 이미지 경로 없이 배경색인 경우
  const getBackgroundColor = (imgSrc: string) => (
    imgSrc?.includes('#') ? imgSrc : '#E1D9BC'
  );
  // 이미지 url 있는 경우
  const isImageUrl = (imgSrc: string) => (
    imgSrc && !imgSrc.includes('#')
  )
  return (
    <button 
      className={styles.member}
      type="button"
      disabled={isReadonly}
      onClick={memberClick}
    >
      <div className={styles.profile}>
        { isImageUrl(data.imgSrc)
        ? (
          <div className={styles.img}>
            <img src={data.imgSrc} alt={`${data.nickName} Profile`} />
          </div>
        ) : (
          <div className={styles.icon} style={{backgroundColor: getBackgroundColor(data.imgSrc)}}>
            <i><IconUser /></i>
          </div>
        )}
      </div>
      <span className={styles.name}>{data.nickName}</span>
    </button>
  )
}