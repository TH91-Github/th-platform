import type { AuthStateType, AuthUserType, UserDataType } from "@/types/auth/auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 📍테스트용 
const testState = {
  title: 'UX',
  state: false
};
export const testSlice = createSlice({
  name: "Test Store",
  initialState: testState,
  reducers: {
    actionTest(state, propsAction){
      return { ...state, ...propsAction.payload };
    },
  },
})

// 📍 Login user 정보 
const initialAuthState: AuthStateType = {
  user: null,
  loginTime: 0,
  isAuthReady:false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // 구글 신규 가입 시 바로 로그아웃 되는 문제 보안 
    actionUserLogin(
      state,
      action: PayloadAction<{ user: AuthUserType }>
    ) {
      state.user = action.payload.user;
      state.loginTime = Date.now();
      state.isAuthReady = true;
    },
    actionUserLogout(state) {
      state.user = null;
      state.loginTime = 0;
      state.isAuthReady = true;
    },
    actionAuthReady(state) {
      state.isAuthReady = true;
    },
  },
});

export const { actionTest } = testSlice.actions;
export const { actionUserLogin, actionUserLogout, actionAuthReady} = authSlice.actions;
