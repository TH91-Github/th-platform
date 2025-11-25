import { configureStore } from "@reduxjs/toolkit";
import { testSlice } from "./sliceActions";

// 🔹 외부 stroe - api data redux
export const reduxStore = configureStore({
  reducer: { 
    storeTest: testSlice.reducer, // 테스트 확인용
  },
  devTools:true,
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch;

export const { actionTest } = testSlice.actions;