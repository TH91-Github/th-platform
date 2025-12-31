import type { GuideDataType } from "@/types/guide"

export const elementData: GuideDataType[] = [
  {
    id: 'modal',
    title: 'Modal',
    desc: '공통 모달 컴포넌트',
    category: 'Overlay',
    keyword: ['Modal', '딤드', '알럿', 'alert', '모달'],
    link: ''
  },
  {
    id: 'carousel',
    title: 'Carousel',
    desc: '캐러셀, 슬라이드 컴포넌트',
    category: 'Carousel',
    keyword: ['Carousel', '슬라이드', 'swiper', '캐러셀'],
    link: ''
  },
  {
    id: 'toast',
    title: 'Toast',
    desc: '메시지를 보여주는 팝업 형태 UI',
    category: 'Overlay',
    keyword: ['Toast', '간단 팝업', '팝업', '토스트', '오버레이'],
    link: ''
  },
  {
    id: 'tabButton',
    title: 'Tab Button',
    desc: 'Tab 버튼 컴포넌트',
    category: 'Tab',
    keyword: ['Tab button', 'Tab', 'Tabs', 'Tab Button', '탭 버튼', 'Tab Head', '탭 헤더'],
    link: ''
  },
  {
    id: 'accordion',
    title: 'Accordion Menu',
    desc: '아코디언 메뉴 컴포넌트',
    category: 'Accordion',
    keyword: ['Accordion Menu', '아코디언', '리스트메뉴', '메뉴 숨기기 UI', '버튼 메뉴'],
    link: ''
  },
  {
    id: 'input',
    title: 'Input Text, Password',
    desc: '인풋 컴포넌트',
    category: 'Input',
    keyword: ['Input', '입력', '인풋', '텍스트 입력', '비밀번호 입력', 'form', '폼', '입력폼'],
    link: ''
  },
]

export const moduleData: GuideDataType[] = [
  {
    id: 'search',
    title: 'Search',
    desc: '공통 검색 모듈',
    category: 'Module',
    keyword: ['search', 'module', '검색', '하이라이트', 'input', '찾기', '써치', '모듈', '공통'],
    link: ''
  },
]

export const layoutData: GuideDataType[] = [
  {
    id: 'layout',
    title: 'layout',
    desc: 'layout',
    category: 'Module',
    keyword: ['search', 'module', '검색', '하이라이트', 'input', '찾기', '써치', '모듈', '공통'],
    link: ''
  },
]


export const componentData = [...elementData, ...moduleData, ...layoutData]