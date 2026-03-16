import type { HubTotalType } from "@/types/hub/hub";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface HubState {
  totalData: HubTotalType[] | null;
  isLoading: boolean;
}

const initialState: HubState = {
  totalData: null,
  isLoading: true,
};

export const hubSlice = createSlice({
  name: "hub",
  initialState,
  reducers: {
    actionHubStateUpdate: (state, action: PayloadAction<HubTotalType[]>) => {
      state.totalData = action.payload;
      state.isLoading = false;
    },
    actionClearHubState: (state) => {
      state.totalData = null;
      state.isLoading = true;
    },
  },
});

export const { actionHubStateUpdate, actionClearHubState } = hubSlice.actions;