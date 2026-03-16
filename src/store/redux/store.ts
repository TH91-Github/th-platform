import { configureStore } from "@reduxjs/toolkit";
import { authSlice, testSlice } from "./sliceActions";
import { hubSlice } from "./hubSlice";

// 🔹 외부 stroe - api data redux
export const reduxStore = configureStore({
  reducer: { 
    test: testSlice.reducer, // 테스트 확인용
    auth: authSlice.reducer, // 유저정보
    hub: hubSlice.reducer, // 유저 hub 방 토탈
  },
  devTools:true,
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectUserHub = (state: RootState) => state.hub;