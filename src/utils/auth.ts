import { hasSpecialCharacters, spacesCheck } from "./regex";

// email 체크 : 한글 @ 포함 확인 / .포함 / id 4글자:{4,} .이후 2글자:{2,} 
export function isInvalidEmail (email:string):boolean{
  const regex = /^[A-Za-z0-9._%+-]{4,}@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
  return !regex.test(email)
}

// 🔹 도메인 체크
export const domainChkMessage  = (email: string) => {
  const validDomains = ['naver.com', 'nate.com', 'daum.net'];
  const domain = email.split('@')[1] ?? '';

  if (domain === 'gmail.com') {
    return '구글 아이디로 로그인으로 가능해요! 😁';
  }
  if (domain && !validDomains.includes(domain)) {
    return `${validDomains.join(', ')} 👈 이메일을 이용해주세요.. 😅`;
  }
  return '';
};

// 🔹 아이디, 비밀번호 체크
export const validIDPW = (val: string, typeCheck:'ID'|'PW') =>{
  const isID = typeCheck === 'ID'
  if (val.length < (isID ? 4 : 6) || val.length > 20) return `${isID ? 4 : 6}~20자로 입력해주세요..!`;
  if ( hasSpecialCharacters(val) || spacesCheck(val)) {
    return `${(isID ? '아이디' : '비밀번호')}를 다시 확인해주세요 😯`;
  }
  return '';
}

// email 유효성 체크
export const validateEmail = (email: string): string => {
  const trimmedEmail = email.trim();

  if (trimmedEmail.length === 0) {
    return '이메일을 입력해주세요.';
  }

  if (isInvalidEmail(trimmedEmail)) {
    return '유효하지 않은 이메일 형식이에요. 🤔';
  }

  const domainMsg = domainChkMessage(trimmedEmail);
  if (domainMsg) {
    return domainMsg;
  }

  return '';
};

export const validateLoginId = (val: string): string => {
  const trimmed = val.trim();

  // 선택 요소 → 빈 값 통과
  if (trimmed.length === 0) return '';

  if (trimmed.length < 4 || trimmed.length > 20) {
    return '4~20자로 입력해주세요.';
  }

  if (hasSpecialCharacters(trimmed) || spacesCheck(trimmed)) {
    return '아이디 형식을 다시 확인해주세요.';
  }

  return '';
};

export const validateNickName = (val: string): string => {
  const trimmed = val.trim();

  // 선택 요소 → 빈 값 통과
  if (trimmed.length === 0) return '';

  if (trimmed.length > 10) {
    return '닉네임은 10자 이하로 입력해주세요.';
  }

  if (hasSpecialCharacters(trimmed) || spacesCheck(trimmed)) {
    return '특수기호, 띄어쓰기 제외 문자를 입력해주세요.';
  }

  return '';
};



export const validatePassword = (val: string): string => {
  const trimmed = val.trim();

  if (trimmed.length === 0) {
    return '비밀번호를 입력해주세요.';
  }

  if (trimmed.length < 6 || trimmed.length > 20) {
    return '6~20자로 입력해주세요.';
  }

  if (spacesCheck(trimmed)) {
    return '비밀번호에 공백을 사용할 수 없습니다.';
  }

  return '';
};

export const validatePasswordConfirm = (
  password: string,
  confirm: string
): string => {

  if (confirm.trim().length === 0) {
    return '비밀번호 확인을 입력해주세요.';
  }

  if (password !== confirm) {
    return '비밀번호가 일치하지 않습니다.';
  }

  return '';
};
