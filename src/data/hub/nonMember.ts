import type { HubStatsType } from "@/types/hub/hubDB"

/*
  🔹 비회원 기본 더미 데이터 - firebase 기준 데이터 구조
  hubRooms: 실제 방 데이터 
  userRooms: 유저 참여 방 정보 
  hubStats: 전체 방 통계
*/ 
// userRooms/{uid}/rooms/{아래 정보}
export const nonUserRoomsData = [
  {
    id: 'xmzAwD0gwQA2zY31angV',
    title: '테스트 방-1',
    desc: '비회원 방입니다.',
    category: 'cashledger',
    visibility: 'public',
    createdAt: 1771809048448,
    members:[ 
      {
        uid: 'uid',
        nickName: '비회원 참가자',
        imgSrc: '#F0F0DB',
        email: 'test@naver.com', 
        joinAt: 1771809048448, // 참여일
        rank: 1,
      },
      {
        uid: 'uid2',
        nickName: '비회원 참가자2',
        imgSrc: '#E1D9BC',
        email: '2@naver.com', 
        joinAt: 1771809048448, // 참여일
        rank: 1,
      },
      {
        uid: 'uid3',
        nickName: '비회원 참가자3',
        imgSrc: '#30364F',
        email: '3@naver.com', 
        joinAt: 1771809048448, // 참여일
        rank: 1,
      },
      {
        uid: 'uid4',
        nickName: '비회원 참가자4',
        imgSrc: '#ACBAC4',
        email: '4@naver.com', 
        joinAt: 1771809048448, // 참여일
        rank: 1,
      }
    ],
    owner: {
      name : '비회원 참가자',
      uid : 'uid'
    },
    favorite:false
  },
]
// 방상세 hubRooms/{autoId}/
export const nonHubRoomsData = [
  {
    id:'xmzAwD0gwQA2zY31angV',
    title: '테스트 방-1', // 제목
    category:'cashledger',
    desc: '비회원 방입니다.',
    visibility: '공개',
    createdAt: 1771809048448,
    updateAt: 1771809048448,
    maxMember:20,
    members:[
      {
        uid: 'uid',
        nickName: '비회원 참가자',
        imgSrc: '#F0F0DB',
        email: 'test@naver.com', 
        joinAt: 1771809048448,
        rank: 1,
      },
      {
        uid: 'uid2',
        nickName: '비회원 참가자2',
        imgSrc: '#E1D9BC',
        email: '2@naver.com', 
        joinAt: 1771809048448,
        rank: 1,
      },
      {
        uid: 'uid3',
        nickName: '비회원 참가자3',
        imgSrc: '#30364F',
        email: '3@naver.com', 
        joinAt: 1771809048448,
        rank: 1,
      },
      {
        uid: 'uid4',
        nickName: '비회원 참가자4',
        imgSrc: '#ACBAC4',
        email: '4@naver.com', 
        joinAt: 1771809048448,
        rank: 1,
      }
    ],
    owner: { 
      name : '비회원 참가자',
      uid : 'uid'
    },
  }
]


// 비회원 hub 통계 데이터
export const nonHubStats :HubStatsType[]= [
  {
    totalCount: 0, // 전체 방 수
    public: 0, // 공개
    private: 0, // 비공개
    category: {
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