import type { HubTotalType } from "@/types/hub/hub";
import { create } from "zustand";

interface HubStoreType {
  totalData: HubTotalType[];
  isLoading: boolean;
  setHubState: (data: HubTotalType[]) => void;
  clearHubState: () => void;
}

const initialState = {
  totalData: [],
  isLoading: true,
};

export const useHubStore = create<HubStoreType>((set) => ({
  ...initialState,
  setHubState: (data) =>
    set({
      totalData: data,
      isLoading: false,
    }),
  clearHubState: () => set(initialState),
}));

export const useHubTotalData = () => useHubStore((state) => state.totalData);
export const useHubIsLoading = () => useHubStore((state) => state.isLoading);
