import type { UserDataType } from "@/types/auth/auth";
import { capitalizeWords } from "../textUtils"

// 🔹 게스트 아이디
export const HUB_GUEST_UID = "test-9999";

// 🔹 회원 / 비회원 체크
export const getHubUid = (user?: UserDataType) => {
  return user?.uid ?? HUB_GUEST_UID;
};

// 🔹 회원 / 비회원에 따른 컬렉션 선택
type CollectionName = 'hubRooms' | 'hubStats' | 'userRooms';
export const isColName = (isGuest: boolean, baseName: CollectionName): string => {
  return isGuest 
    ? `test${capitalizeWords(baseName)}` 
    : baseName;
};