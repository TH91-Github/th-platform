// 가이드 페이지 id와 url 접근(새로고침), 순차 접근인지 확인
export interface GuideContextPropsType { 
  id: string
  parentPath: string
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

export interface GuidePopInfoType {
  tit:string,
  desc:string[]
  code: string,
}
// hook, util ... popup 내 정보 사용
interface GuidePopupDetailType {
  popInfo:GuidePopInfoType
}
// hook, util ... popup 정보가 포함된 가이드 데이터에서 사용
export type GuidePopupDataType = GuideDataType & GuidePopupDetailType;

// 가이드 상세 페이지
export interface DemoItemType {
  tit: string,
  desc: string[],
  option?:any // 데모의 경우 모든 컴포넌트의 옵션을 사용하기에 타입 예외 - any
}

// 모달 popup 내 정보 소개 타입
export interface PopupDataType {
  infoData: GuidePopInfoType,
  link: string, // git
}
