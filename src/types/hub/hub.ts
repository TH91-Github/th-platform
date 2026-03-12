// 🔹 hub room 타입 지정
export type HubCategoryId = 'travel' | 'calendar' | 'memo' | 'cashledger' | 'running';
export type HubCategoryCodeKoType = '여행' | '달력' | '메모' | '가계부' | '러닝';
export type HubVisibility = 'public' | 'private' | 'secret'; // 공개, 비공개, 초대
// 카테고리 data
export interface HubCategoryDataType {
  id:HubCategoryId,
  title: HubCategoryCodeKoType
}
// hub main total item
export interface HubItemType {
  id: string,
  title: string,
  desc: string,
  total: number,
}

// user total room list 타입
export interface HubTableType {
  id: 'visibility' | 'title' | 'category' | 'date' | 'Members',
  title: string,
}

// hub main total 데이터
export interface HubTotalType {
  totalTitle:string,
  totalCategory:string,
  totalLists: HubItemType[]
}

// 방 데이터
export interface RoomBaseType {
  id: string, // doc id 
  title: string, // 제목
  desc: string, // 설명
  category: HubCategoryId,
  visibility: HubVisibility, // 공개, 비공개, 초대
  createdAt: number, // 생성일,
  owner: { // 개설자 탈퇴 시 유지 - rank로 방 유지 수정
    name : string // 개설자 네임
    uid : string // 개설자 uid
  },
}

// 멤버 리스트
export interface MembersType {
  uid: string, // uid
  nickName: string, // nickName
  imgSrc: string // storage url 정보 외 url 이미지 경로
  email: string, // 참여자 email
  joinAt: number, // 참여일
  rank: number,
}

export interface MemberPreviewType { // 미리보기 멤버 간략하게
  uid: string
  nickName: string
  imgSrc: string
}
