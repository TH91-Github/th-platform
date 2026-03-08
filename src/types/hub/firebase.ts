// api/firebase/hub.ts

import type { HubCategoryId, HubVisibility } from "./hub";

// 🔹 api 방 생성 시 전달 data Type
export interface CreateHubRoomPayload {
  title: string;
  desc: string;
  category: HubCategoryId;
  visibility: HubVisibility;
  maxMember: number;
  owner: {
    uid: string;
    name: string;
    email?: string;
    imgSrc?: string;
  };
}

// 방 생성 시 & 토탈 값 관련 user 필드 값
export interface UserRoomStats {
  total: number;
  single: number;
  team: number;
  public: number;
  private: number;
  category: {
    travel: number;
    calendar: number;
    memo: number;
    cashledger: number;
    running: number;
  }
  bookmark: {
    total: number;
    public: number;
    private: number;
  }
}