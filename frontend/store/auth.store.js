import { create } from 'zustand'

const BASE_URL = 'http://localhost:5001'

export const useAuthStore = create((set) => ({
  user: null, // { _id, fullName, email, profilePic }
  isLoading: false,

  login: (userData) => {
    console.log(userData)
  },

  signUp: (userData) => ({}),

  logOut: () => set({ user: null }),

  checkAuth: () => !!useAuthStore.getState().user,
}))
