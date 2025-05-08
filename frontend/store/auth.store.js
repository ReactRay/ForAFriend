import { create } from 'zustand'

export const useUserAuthStore = create((set) => ({
  user: null, // { _id, fullName, email, profilePic }

  login: (userData) => set({ user: userData }),

  signUp: (userData) => ({}),

  logOut: () => set({ user: null }),

  checkAuth: () => !!useUserAuthStore.getState().user,
}))
