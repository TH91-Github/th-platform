import { configureStore } from "@reduxjs/toolkit";
import { authSlice, testSlice } from "./sliceActions";

// 🔹 외부 stroe - api data redux
export const reduxStore = configureStore({
  reducer: { 
    test: testSlice.reducer, // 테스트 확인용
    auth: authSlice.reducer, // 유저정보
  },
  devTools:true,
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch;

export const selectAuthUser = (state: RootState) => state.auth.user;