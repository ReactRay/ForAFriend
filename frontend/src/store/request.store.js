import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = 'http://localhost:5001'

export const useRequestStore = create((set, get) => ({
  requests: [],

  createRequest: async (data) => {
    try {
      const res = await axios.post(BASE_URL + '/request/new-request', data)
      toast.success('Request sent!')
      set((state) => ({
        requests: [...state.requests, res.data],
      }))
    } catch (error) {
      toast.error('Failed to create request')
      console.error(error)
    }
  },

  getRequests: async (userId) => {
    try {
      const res = await axios.get(BASE_URL + `/request/all`, {
        params: { userId },
      })
      set({ requests: res.data })
      toast.success('Requests loaded')
    } catch (error) {
      toast.error('Failed to fetch requests')
      console.error(error)
    }
  },
}))
