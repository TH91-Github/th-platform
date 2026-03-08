import type { HubCategoryId, HubVisibility, MembersType } from "./hub"

// 🔹 firebase 실제 data type
interface RoomBaseType {
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
/*
  ⭐ hubRooms
  📘 hubRooms/{roomId}/필드 방 타입
*/
export interface HubRoomType extends RoomBaseType { 
  // id : rooms doc id 
  members:MembersType[], // 참여 유저 정보
  maxMember:number, // 방 최대 인원 20 아래로
  updateAt: number, // 업데이트,
}

/*
  🟦 memo/{년도 or 월별}

*/
export interface MemoInfoType {

}

/*
  🟦 cashledger/{년도 or 월별}

*/
export interface MemoInfoType {
  
}

/*
  🟦 travel/{autoId}

*/
export interface MemoInfoType {
  
}

/*
  🟦 calendar/{년도 or 월별}

*/
export interface MemoInfoType {
  
}
/*
  🟦 running/{년도 or 월별}

*/
export interface MemoInfoType {
  
}
// -------------------------------------------------------------

/*
  ⭐ userRooms : 로그인한 유저별 방 개설 정보
  📘 userRooms/{uid}/rooms/{roomdId}/
*/
export interface UserRoomsType extends RoomBaseType{
  // id : user uid
  role: 'owner' | 'member', // 내가 만들었는지 여부
  memberCount: number, // 미리보기 멤버 수 
  memberPreview: { // 미리보기 멤버 간략하게
    uid: string
    nickName: string
    imgSrc?: string
  }[]
  favorite:boolean, // 즐겨찾기 여부
}


// -------------------------------------------------------------
/*
  ⭐ hubStats : 전체 통계
  📘 
*/
export interface HubStatsType {
  totalCount: number, // 전체 방 수
  public: number, // 공개
  private: number, // 비공개
  category: {
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

