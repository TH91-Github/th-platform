
export interface UserDataType { // 🔹 DB 유저 정보
  id: string; // 필드 id
  email: string; // 가입 email
  simpleID: string; // 간편 ID
  nickName: string; // 이름 or 닉네임
  password: string; // 임의 비번 암호화 - 잠금 암호 걸때 사용
  rank: 'basic' | 'admin'; // 회원등급
  signupTime: Date; // 계정 생성 시간
  theme: {
    color:string; // 색상 저장
    mode: 'dark' | 'light';
  };
  permission:boolean; // 계정 승인 / 비승인
  profile: string; // 프로필 이미지 
  uid: string; // 고유 uid - firebase
}

export interface AuthStateType {
  user: null | UserDataType,
  loginTime: null | Date,
}
