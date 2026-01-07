// 가이드 페이지 id와 url 접근(새로고침), 순차 접근인지 확인
export interface ContextPropsType { 
  id: string
  detailsAni: boolean
}
// 가이드에 사용하는 데이터 구조 - 검색 가능한 데이터 
export interface GuideDataType {
  id: string,
  title: string,
  desc: string,
  category: string,
  keyword: string[],
  link: string
}

// 가이드 상세 페이지
export interface DemoItemType {
  tit: string;
  desc: string[];
  option?:any
}