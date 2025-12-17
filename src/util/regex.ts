// 특수문자
export function hasSpecialCharacters(text: string): boolean {
  // const regex = /^[^\s\p{P}]+$/u;
  const regex = /^[a-zA-Z가-힣0-9\s]+$/;
  return !regex.test(text);
}

// 띄어쓰기 스페이스 바 감지
export function spacesCheck(text: string): boolean {
  const regex = /\s/;
  return regex.test(text);
}

// 영문 대/소문자와 숫자만 허용
export function enNumberCheck(text: string): boolean {
  // 영문자가 포함되어 있는지 확인하는 정규식
  const containsLetter = /[A-Za-z]/.test(text);
  // 영문 대/소문자와 숫자만으로 구성되어 있는지 확인하는 정규식
  const isAlphaNumeric = /^[A-Za-z0-9]+$/.test(text);
  return containsLetter && isAlphaNumeric;
}

