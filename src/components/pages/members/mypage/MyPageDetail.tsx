import type { MenuTListType, MyMenuListType } from '@/types/member/mypage';
import { HistorySection } from './HistorySection';
import { ProfileSection } from './ProfileSection';
import { SecuritySection } from './SecuritySection';
import styles from './MyPageDetail.module.scss';

// 🔹 mypage 카테고리별 상세 페이지
export const myMenuList: MyMenuListType[] = [
  { id: 'profile', title: '내 프로필'},
  { id: 'security', title: '보안설정'},
  { id: 'history', title: '이력관리'},
];

const detailMatch: Record<MenuTListType, React.ComponentType> = {
  'profile': ProfileSection,
  'security': SecuritySection,
  'history': HistorySection,
};

interface MyPageDetailPropsType {
  selectId: MenuTListType;
  className?: string;
}

export const MyPageDetail = ({ selectId, className }: MyPageDetailPropsType) => {
  const ActiveComponent = detailMatch[selectId] ?? (() => (
    <div className={styles.empty}>
      <p>서비스 준비 중...</p>
    </div>
  ));

  return <ActiveComponent />;
};