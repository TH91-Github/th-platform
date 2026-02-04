const THIRTY_MINUTES = 1000 * 60 * 30; // 30분 default
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7; // 7일

export const SESSION_KEY = 'platform_sessionInfo';

interface SessionInfoType {
  lastActive: number; //
  remember: boolean; // 로그인 정보 기억하기
}

// 세션 저장
export const saveSession = (remember: boolean) => {
  const session: SessionInfoType = {
    lastActive: Date.now(),
    remember,
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
  // 세션 없는 경우
  if (!sessionData) return false;

  try {
    // JSON 파싱하여 세션 정보 복원
    const session: SessionInfoType = JSON.parse(sessionData);
    // ✅ 경과시간 계산 (현재 - 마지막 활동시간)
    const diff = Date.now() - session.lastActive;
    // remember 여부에 따라 만료시간 결정
    const limit = session.remember ? SEVEN_DAYS : THIRTY_MINUTES;

    // 유효시간 이내인지 확인
    return diff <= limit;
  } catch {
    return false;
  }
};

// 기준 시간 재설정, 갱신
export const refreshSession = () => {
  const sessionData = localStorage.getItem(SESSION_KEY);
  // 세션 없는 경우
  if (!sessionData) return;

  try {
    // 기존 세션 불러와서 현재 시간으로 갱신
    const session: SessionInfoType = JSON.parse(sessionData);
    session.lastActive = Date.now();
    // 갱신된 세션 저장
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    clearSession();
  }
};
