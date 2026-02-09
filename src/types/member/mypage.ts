// member mypage
export type MenuTListType = 'profile' | 'security' | 'history';
export interface MyMenuListType {
  id: MenuTListType;
  title: string;
  component?: React.ComponentType;
}
