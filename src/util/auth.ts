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
    return '구글 로그인으로 가능해요! 😁';
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