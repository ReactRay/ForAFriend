import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = 'http://localhost:5001'

export const useAuthStore = create((set) => ({
  user: null, // { _id, fullName, email, profilePic }
  isLoading: false,
  login: async (userData) => {
    console.log(userData)
    const res = await axios.post(BASE_URL + '/auth/login', userData, {
      withCredentials: true,
    })
    set({ user: res.data })
    console.log(res.data)
  },

  signUp: async (userData) => {
    const res = await axios.post(
      'http://localhost:5001/auth/signup',
      userData,
      {
        withCredentials: true,
      }
    )
    set({ user: res.data })
  },

  logout: async () => {
    try {
      const res = await axios.post(
        'http://localhost:5001/auth/logout',
        {},

        {
          withCredentials: true,
        }
      )
      set({ user: null })
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

  checkAuth: async () => {
    try {
      const res = await axios.get(BASE_URL + '/auth/check', {
        withCredentials: true,
      })

      set({ user: res.data })
    } catch (error) {
      console.log('Error in checkAuth:', error)
      set({ user: null })
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isLoading: true })

      const res = await axios.put(BASE_URL + '/auth/update-profile', data, {
        withCredentials: true,
      })
      set({ user: res.data })
      toast.success('Profile updated successfully')
    } catch (error) {
      console.log('error in update profile:', error)
      toast.error(error.response.data.message)
    } finally {
      set({ isLoading: false })
    }
  },
}))
