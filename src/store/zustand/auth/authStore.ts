
import { create } from 'zustand'

// 🔹 로그인 정보 값만 zustand로 관리
interface UserInfoStoreType {
  login: boolean
  actions: {
    userClear: () => void
  }
}

export const useUserInfoStore = create<UserInfoStoreType>((set, get) => ({
  login: false,
  actions: {
    userClear: () =>
      set({
        login: false,
      })
  }
}))

export const useIsLogin = () => useUserInfoStore((state) => state.login)
export const useUserAction = () => useUserInfoStore((state) => state.actions)
