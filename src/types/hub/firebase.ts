import type { MemberPreviewType, MembersType, RoomBaseType } from "./hub";

/*
  ⭐ hubRooms
  📘 hubRooms/{roomId}/필드 방 타입
*/
export interface HubRoomType extends RoomBaseType { 
  // id : rooms doc id 
  updateAt: number, // 업데이트,
  maxMember:number, // 방 최대 인원 20 아래로
  members:MembersType[], // 참여 유저 정보
}

/*
  ⭐ userRooms : 로그인한 유저별 방 개설 정보
*/

// 📘 userRooms/{uid}/필드 값 해당 유저 전체 통계
export interface UserRoomStats extends HubStatsType {
  // ... 
  bookmark: {
    total: number;
    public: number;
    private: number;
  }
}

// 📘 userRooms/{uid}/rooms/{roomdId} : 유저의 개별 방 정보

export interface UserRoomsType extends RoomBaseType{
  role: 'owner' | 'member', // 내가 만들었는지 여부
  memberCount: number, // 미리보기 멤버 수 
  memberPreview: MemberPreviewType[], 
  favorite:boolean, // 즐겨찾기 여부
}


// -------------------------------------------------------------
/*
  ⭐ hubStats : 모든 유저 전체 통계 ()
  📘 
*/
export interface HubStatsType {
  total: number, // 전체 방 수
  visibility: {
    public: number // 공개
    private: number // 비공개
  }
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





// /*
//   🟦 memo/{년도 or 월별}

// */
// export interface MemoInfoType {

// }

// /*
//   🟦 cashledger/{년도 or 월별}

// */
// export interface MemoInfoType {
  
// }

// /*
//   🟦 travel/{autoId}

// */
// export interface MemoInfoType {
  
// }

// /*
//   🟦 calendar/{년도 or 월별}

// */
// export interface MemoInfoType {
  
// }
// /*
//   🟦 running/{년도 or 월별}

// */
// export interface MemoInfoType {
  
// }