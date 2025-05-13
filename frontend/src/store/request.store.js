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

  getRequests: async (userId, caller) => {
    try {
      const res = await axios.get(BASE_URL + `/request/all`, {
        params: { userId, caller },
      })
      console.log(userId, res.data)
      set({ requests: res.data })
      toast.success('Requests loaded')
      return res.data
    } catch (error) {
      toast.error('Failed to fetch requests')
      console.error(error)
    }
  },
  updateStatus: async (requestId, status) => {
    try {
      const res = await axios.put(BASE_URL + '/request/update', {
        requestId,
        status,
      })

      const requestsArr = get().requests.map((item) =>
        item._id === requestId ? res.data : item
      )

      set({ requests: requestsArr })
      toast.success(`Request marked as ${status}`)
    } catch (error) {
      toast.error('Failed to update request status')
      console.error(error)
    }
  },
}))
