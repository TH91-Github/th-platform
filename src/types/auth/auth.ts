
// 🔹 firebase DB 유저
export interface UserDataType {
  uid: string; // 고유 uid - firebase
  email: string; // 가입 email
  simpleID: string; // 간편 ID
  nickName: string; // 이름 or 닉네임
  lockPW?: string; // 임의 비번 암호화 - 잠금 암호 걸때 사용
  rank: 'basic' | 'admin'; // 회원등급 
  signupTime: number; // 계정 생성 시간
  lastLoginTime: number;// 마지막 접속
  theme: 'dark' | 'light';
  permission:boolean; // 계정 승인 / 비승인
  profile: string; // 프로필 이미지 
}

export interface AuthUserType {
  uid: string;
  email: string | null;
}

export interface AuthStateType {
  user: null | AuthUserType,
  loginTime: number,
  isAuthReady: boolean,
}