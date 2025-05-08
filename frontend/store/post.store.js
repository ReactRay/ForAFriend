import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = 'http://localhost:5001'

export const usePostStore = create((set) => ({
  posts: [],
  createPost: async (data) => {
    const res = await axios.post(BASE_URL + '/post/create-post', data)
    toast.success('Profile updated successfully')

    set((state) => ({
      posts: [...state.posts, res.data.newPost],
    }))
  },
}))
