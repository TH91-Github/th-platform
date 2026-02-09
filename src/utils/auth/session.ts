const THIRTY_MINUTES = 1000 * 60 * 30; // 30분
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7; // 7일

export const SESSION_KEY = 'platform-sessionInfo';

interface SessionInfoType {
  lastActive: number; // 마지막 활동 시간
  remember: boolean; // 로그인 정보 기억 여부
  createdAt: number; // 세션 생성 시간
}

// 세션 저장
export const saveSession = (remember: boolean) => {
  const now = Date.now();
  const session: SessionInfoType = {
    lastActive: now,
    remember,
    createdAt: now,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

// 세션 삭제
export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

// 세션 유효성 검사
export const isSessionValid = (): boolean => {
  const sessionData = localStorage.getItem(SESSION_KEY);

  if (!sessionData) return false;
  try {
    const session: SessionInfoType = JSON.parse(sessionData);
    const elapsed = Date.now() - session.lastActive;
    const expirationTime = session.remember ? SEVEN_DAYS : THIRTY_MINUTES;

    // 유효시간 체크
    return elapsed < expirationTime;
  } catch (error) {
    console.error('세션 확인 실패', error);
    clearSession();
    return false;
  }
};

// 세션 갱신
export const refreshSession = () => {
  const sessionData = localStorage.getItem(SESSION_KEY);

  if (!sessionData) return;
  try {
    const session: SessionInfoType = JSON.parse(sessionData);
    
    // 유효성 체크 후 갱신
    if (isSessionValid()) {
      session.lastActive = Date.now();
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      clearSession(); // 만료된 세션은 삭제
    }
  } catch (error) {
    console.error('세션 확인 실패', error);
    clearSession();
  }
};

// 세션 정보 조회
export const getSessionInfo = (): SessionInfoType | null => {
  const sessionData = localStorage.getItem(SESSION_KEY);

  if (!sessionData) return null;
  try {
    return JSON.parse(sessionData);
  } catch {
    clearSession();
    return null;
  }
};

// 남은 시간 계산
export const getRemainingTime = (): number => {
  const session = getSessionInfo();
  if (!session) return 0;

  const expirationTime = session.remember ? SEVEN_DAYS : THIRTY_MINUTES;
  const elapsed = Date.now() - session.lastActive;
  const remaining = expirationTime - elapsed;

  return Math.max(0, remaining);
};

// 남은 시간 변환
export const getFormattedRemainingTime = (): string => {
  const remaining = getRemainingTime();
  if (remaining === 0) return '만료됨';

  const minutes = Math.floor(remaining / (1000 * 60));
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

  if (days > 0) return `${days}일 남음`;
  if (hours > 0) return `${hours}시간 남음`;
  if (minutes > 0) return `${minutes}분 남음`;
  return '1분 미만';
};
/*
  const remaining = getFormattedRemainingTime();
  console.log(remaining); / 00분 남음
*/