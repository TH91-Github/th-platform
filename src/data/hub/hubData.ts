import type { HubCategoryDataType, HubTableType, HubTotalType } from "@/types/hub/hub";

// 🔹 default 카테고리 ko, en 정보
export const hubCategoryData: HubCategoryDataType[] = [
  {id:'travel', title:'여행'},
  {id:'calendar', title:'달력'},
  {id:'memo', title:'메모'},
  {id:'cashledger', title:'가계부'},
  {id:'running', title:'러닝'},
]
// 🔹 hub 카테고리 유저 total default
export const hubTotalData : HubTotalType[] = [
  {
    totalTitle:'전체',
    totalCategory:'total',
    totalLists:[
      {
        id:'all',
        title:'전체',
        desc:'개설/참여하고 있는 모든 방을 안내하고 있어요.',
        total:0,
      },
      {
        id:'single',
        title:'나만의 방',
        desc:'1인 구성으로 이루어진 방을 안내하고 있어요.',
        total:0,
      },
      {
        id:'team',
        title:'함께',
        desc:'2인 이상 팀을 이루어진 방을 안내하고 있어요.',
        total:0,
      },
      {
        id:'public',
        title:'공개',
        desc:'공개로 되어 있는 방을 안내하고 있어요.',
        total:0,
      },
      {
        id:'private',
        title:'비공개',
        desc:'비공개로 되어 있는 방을 확인할 수 있어요.',
        total:0,
      }
    ],
  },
  {
    totalTitle:'카테고리',
    totalCategory:'category',
    totalLists:[
      {
        id:'travel',
        title:'여행',
        desc:'가족, 친구들과 여행 일정, 정산 등 확인하고 초대해보세요.',
        total:0,
      },
      {
        id:'calendar',
        title:'일정',
        desc:'일정을 등록하고 일정을 공유해보세요.',
        total:0,
      },
      {
        id:'memo',
        title:'메모',
        desc:'메모, 체크리스트 등을 기록하고 사용하세요.',
        total:0,
      },
      {
        id:'cashledger',
        title:'가계부',
        desc:'지출, 수입, 투자 등 꼼꼼하게 기록하고 확인하세요.',
        total:0,
      },
      {
        id:'running',
        title:'러닝',
        desc:'매일 러닝 하고 기록하고 공유해보세요.',
        total:0,
      },
    ]
  },
  {
    totalTitle:'즐겨찾기',
    totalCategory:'bookmark',
    totalLists:[
      {
        id:'all',
        title:'모든 즐겨찾기',
        desc:'즐겨찾기 되어 있는 방을 확인할 수 있어요.',
        total:0,
      },
      {
        id:'non',
        title:'즐겨찾지 않는 방',
        desc:'즐겨찾기 등록이 안 된 방을 확인할 수 있어요.',
        total:0,
      },
      {
        id:'public',
        title:'공개 즐겨찾기',
        desc:'즐겨찾기 러닝 즐겨찾기 방 수3',
        total:0,
      },
      {
        id:'private',
        title:'비공개 즐겨찾기',
        desc:'즐겨찾기 러닝 즐겨찾기 방 수3',
        total:0,
      },
    ]
  },
];

// 목록
export const hubTable:HubTableType[] = [
  {
    id: 'visibility',
    title:'공개/비공개'
  },
  {
    id:'title',
    title:'제목',
  },
  {
    id:'category',
    title:'구분',
  },
  {
    id:'date',
    title:'개설일',
  },
  {
    id:'Members',
    title:'참여자'
  }
]
