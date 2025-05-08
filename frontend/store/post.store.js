import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = 'http://localhost:5001'

export const usePostStore = create((set) => ({
  posts: [],

  getPosts: async () => {
    const res = await axios.get(BASE_URL + '/post/posts')

    set({ posts: res.data })
    toast.success('posts fetched')
  },
  getOnePost: async (id) => {
    const res = await axios.get(BASE_URL + '/post', id)
    console.log(res.data)
    return res.data
  },
  createPost: async (data) => {
    const res = await axios.post(BASE_URL + '/post/create-post', data)
    toast.success('uploaded a post !')
    console.log(res.data, 'lets see!')
    set((state) => ({
      posts: [...state.posts, res.data.newPost],
    }))
  },
}))
