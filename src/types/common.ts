// input 
export interface InputKeyboardValType {
  e?:React.KeyboardEvent<HTMLInputElement>,
  val?:string
}

// textarea
export interface TextareaKeyboardValType {
  e?:React.KeyboardEvent<HTMLTextAreaElement>,
  val?:string
}

// search 
// ✅ 검색 : 데이터 값에 id와 keyword 필수
export interface EssentialSearchType {
  // 필수 타입
  id: string;
  keyword: string[];
}
export interface SearchResultType {
  text: string;
  matchIds: string[];
}