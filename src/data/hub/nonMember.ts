import type { HubStatsType } from "@/types/hub/hub"

/*
  🔹 비회원 기본 더미 데이터 - firebase 기준 데이터 구조
  **hubRooms
  **userRooms
  **hubStats
*/ 
export const nonHubRoomData = [
  {
    id: 'docId',
    title: '테스트 방-1',
    desc: '비회원 방입니다.',
    category: 'normal',
    visibility: 'public',
    createdAt: 0,
    updateAt: 0,
    members:[ 
      {
        uid: 'uid',
        nickName: '비회원 참가자',
        imgSrc: '',
        email: 'test@naver.com', 
        joinAt: 0, // 참여일
        rank: 1,
      },
      {
        uid: 'uid2',
        nickName: '비회원 참가자',
        imgSrc: '',
        email: '2@naver.com', 
        joinAt: 0, // 참여일
        rank: 1,
      },
      {
        uid: 'uid3',
        nickName: '비회원 참가자',
        imgSrc: '',
        email: '3@naver.com', 
        joinAt: 0, // 참여일
        rank: 1,
      },
      {
        uid: 'uid4',
        nickName: '비회원 참가자',
        imgSrc: '',
        email: '4@naver.com', 
        joinAt: 0, // 참여일
        rank: 1,
      }
    ],
    maxMember: 5,
    owner: {
      name : '비회원 참가자',
      uid : 'uid'
    }
  },
  {
    id: 'docId-2',
    title: '테스트 방-2',
    desc: '비회원 방입니다.',
    category: 'calendar',
    visibility: 'public',
    createdAt: 0,
    updateAt: 0,
    members:[ 
      {
        uid: 'uid',
        nickName: '비회원 참가자',
        imgSrc: '',
        email: 'test@naver.com', 
        joinAt: 0, // 참여일
        rank: 1,
      },
      {
        uid: 'uid2',
        nickName: '비회원 참가자',
        imgSrc: '',
        email: '2@naver.com', 
        joinAt: 0, // 참여일
        rank: 1,
      },
      {
        uid: 'uid3',
        nickName: '비회원 참가자',
        imgSrc: '',
        email: '3@naver.com', 
        joinAt: 0, // 참여일
        rank: 1,
      },
      {
        uid: 'uid4',
        nickName: '비회원 참가자',
        imgSrc: '',
        email: '4@naver.com', 
        joinAt: 0, // 참여일
        rank: 1,
      }
    ],
    maxMember: 5,
    owner: {
      name : '비회원 참가자',
      uid : 'uid'
    }
  }
]

// 비회원 hub 통계 데이터
export const nonHubStats :HubStatsType[]= [
  {
    totalCount: 0, // 전체 방 수
    public: 0, // 공개
    private: 0, // 비공개
    category: {
      normal: 0, // 일반
      travel: 0, // 여행
      memo: 0, // 메모
      calendar: 0, // 일정
      cashledger: 0, // 가계부
      running: 0 // 러닝
    },
    mode: {
      single: 0, // 개인
      team: 0, // 팀
    },
    ym: {},
  }
]