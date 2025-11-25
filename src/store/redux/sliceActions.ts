import { createSlice } from "@reduxjs/toolkit";

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
