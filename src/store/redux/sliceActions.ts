import type { AuthStateType, UserDataType } from "@/types/auth/auth";
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
const initialState: AuthStateType = {
  user: null,
  loginTime: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // 구글 신규 가입 시 바로 로그아웃 되는 문제 보안 
    actionUserLogin(state, action: PayloadAction<{ user: UserDataType }>) {
      state.user = action.payload.user;
      state.loginTime = Date.now();
    },
    actionUserLogout(state) {
      state.user = null;
      state.loginTime = 0;
    },
  },
});

export const { actionTest } = testSlice.actions;
export const { actionUserLogin, actionUserLogout} = authSlice.actions;
