// 🔹 hub room 타입 지정
type HubCategoryId = 'normal' | 'travel' | 'calendar' | 'memo' | 'cashledger' | 'running'
type HubCategoryCodeKoType = '일반' | '여행' | '달력' | '메모' | '가계부' | '러닝'
 
export interface HubCategoryDataType {
  id:HubCategoryId,
  title: HubCategoryCodeKoType
}
export interface HubItemType {
  id: string,
  title: string,
  desc: string,
  total: number,
}
export interface HubTotalType {
  totalTitle:string,
  totalCategory:string,
  totalLists: HubItemType[]
}