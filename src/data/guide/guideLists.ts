interface RouterDataType {
  id: string,
  path: string,
  title: string,
}

export interface GuideChildrenType extends RouterDataType {
  desc:string[],
  linkLists?:{
    title: string,
    link: string,
  }[],
}

interface GuideListsType extends RouterDataType {
  children?: GuideChildrenType[]
}

export const guideLists : GuideListsType[] = [
  {
    id: "design",
    path: "design",
    title: "디자인",
    children: [
      {
        id: "icon",
        path: "icon",
        title: "아이콘",
        desc:[
          'React-icons 라이브러리 사용',
          '일관된 아이콘 사용을 위해 사용하는 아이콘 정리',
          '/assets/icon/index.ts 관리, 네이밍 IconName',
        ],
        linkLists:[
          {
            title:'React-icons',
            link:'https://react-icons.github.io/react-icons/',
          },
          {
            title:'react-icons - github',
            link:'https://github.com/react-icons/react-icons',
          }
        ]
      },
      {
        id: "colors",
        path: "colors",
        title: "색상",
        desc:[
          ':root 지정 값으로 주로 사용',
          '사용하는 색상의 일관성을 유지하기 위해 정의',
          'scss module & emotion 함께 사용',
          '/assets/style/common/ <- scss 관리',
          '/assets/style/emotion/ <- emotion 관리',
        ]
      },
      {
        id: "fonts",
        path: "fonts",
        title: "글자",
        desc:[
          '용하는 글꼴 스타일을 쉽게 확인하고 사용하기 위해',
          'Pretendard 프리텐다드 사용: PretendardVariable',
          'Size : 12px ~ 20px: 2px씩 증가 / 20px 이상: 4px씩 증가 (20, 24, 28, 32...)',
          'weight: 100씩 증가 / 기본 500'
        ]
      },
      {
        id: "breakpoints",
        path: "breakpoints",
        title: "브레이크 포인트",
        desc:[
          'scss : @include key {...} / 사용 예 : @include mob {...}',
          'emotion : ${media.key} / 사용 예 : ${media.mob} {...}'
        ]
      },
    ],
  },
  {
    id: "components",
    path: "components",
    title: '컴포넌트',
    children: [
      {
        id: "element",
        path: "element",
        title: "기능",
        desc:[
          'UI를 구성하는 기본 단위의 독립적인 컴포넌트',
          '다른 컴포넌트에 의존하지 않고 재사용 가능한 최소 단위 컴포넌트',
          'Input, Button, carousel, accordion 등'
        ]
      },
      {
        id: "module",
        path: "module",
        title: "모듈",
        desc:[
          '여러 개의 element(component)를 조합해 구성된 복합 컴포넌트',
          '검색 모듈, 폼 섹션 등 특정 기능 레이아웃 구현',
          'UI 구조와 기능 단위로 묶여 재사용하는 컴포넌트',
        ]
      },
      {
        id: "layout",
        path: "layout",
        title: "레이아웃",
        desc:[
          '페이지 또는 화면의 전체 구조와 배치를 정의하는 컴포넌트',
          '공통 레이아웃 관련 재사용이 가능한 구조',
          '헤더, 푸터, 사이드바 등'
        ]
      },
    ]
  },
  {
    id: "hooks",
    path: "hooks",
    title: "커스텀 훅",
  },
  {
    id: "utils",
    path: "utils",
    title: "유틸 함수",
  },
]