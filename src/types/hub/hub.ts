// 🔹 hub room 타입 지정
type HubCategoryId = 'normal' | 'travel' | 'calendar' | 'memo' | 'cashledger' | 'running';
type HubCategoryCodeKoType = '일반' | '여행' | '달력' | '메모' | '가계부' | '러닝';
type HubVisibility = 'public' | 'private' | 'secret'; // 공개, 비공개, 초대
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

// hub main total 데이터
export interface HubTotalType {
  totalTitle:string,
  totalCategory:string,
  totalLists: HubItemType[]
}

// 목록 타입
export interface HubTableType {
  id: 'visibility' | 'title' | 'category' | 'date' | 'Members',
  title: string,
}

// 🔹 hubRooms/{roomId}/필드 방 타입
export interface HubRoomType { 
  id: string, // doc id
  title: string, // 제목
  desc: string, // 설명
  category: HubCategoryId,
  visibility: HubVisibility, // 공개, 비공개, 초대
  createdAt: number, // 생성일,
  updateAt: number, // 업데이트,
  members:[ // 참여 유저 정보
    {
      uid: string, // uid
      nickName: string, // nickName
      imgSrc: string // storage url 정보 외 url 이미지 경로
      email: string, // 참여자 email
      joinAt: number, // 참여일
      rank: number,
    }
  ]
  maxMember:number, // 방 최대 인원 20 아래로
  owner: { // 개설자 탈퇴하는 경우 다른 사람 랜덤, 방장 수정 가능
    name : string // 개설자 네임
    uid : string // 개설자 uid
  }
}

// 🔹 userRooms : 로그인한 유저별 개설, 참여, 즐겨찾기 방 정보 id(doc 기준) 시간만
export type UserRoomsType = { roomAt : number }

// 🔹 hubStats
export interface HubStatsType {
  totalCount: number, // 전체 방 수
  public: number, // 공개
  private: number, // 비공개
  category: {
    normal: number, // 일반
    travel: number, // 여행
    memo: number, // 메모
    calendar: number, // 일정
    cashledger: number, // 가계부
    running: number // 러닝
  },
  mode: {
    single: number, // 개인
    team: number, // 팀
  },
  ym: Record<string, number>, // "2026-02" : 123
}
