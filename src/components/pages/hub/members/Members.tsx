
import type { MemberPreviewType, MembersType } from "@/types/hub/hub"
import { MemberProfileIcon } from "./MemberProfileIcon";
import { cn } from "@/utils/common";
import styles from './Members.module.scss';

// 🔹 멤버 리스트 (아이콘, 리스트)
interface MembersPropsType {
  data: MemberPreviewType[],
  viewType?: 'icon' | 'lists', // 아이콘 또는 리스트형식
  isReadonly?: boolean, // 읽기 전용, 유저 클릭 막기
  maxView?: number, // 최대 유저 보여주는 수
}

export const Members = ({
  data,
  viewType = 'icon',
  isReadonly=true,
  maxView = 4,
}: MembersPropsType) => {
  const visibleMembers = data?.slice(0, maxView); 

  return(
    <div className={styles.members}>
      <ul className={cn(viewType ==='icon' ? styles.icons : styles.lists)}>
        {visibleMembers.map((member,index) => (
          <li 
            key={member.uid}
            style={{zIndex: maxView - index}}>
            <MemberProfileIcon data={member} isReadonly={isReadonly}/>
          </li>
        ))}
      </ul>
    </div>
  )
}