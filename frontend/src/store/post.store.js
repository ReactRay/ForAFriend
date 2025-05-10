import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = 'http://localhost:5001'

export const usePostStore = create((set, get) => ({
  posts: [],

  getPosts: async () => {
    const res = await axios.get(BASE_URL + '/post/posts')

    set({ posts: res.data })
    toast.success('posts fetched')
  },
  getOnePost: async (id) => {
    const res = await axios.get(BASE_URL + '/post/post', {
      params: { id },
    })
    console.log(res.data)
    return res.data
  },
  createPost: async (data) => {
    const res = await axios.post(BASE_URL + '/post/create-post', data)
    toast.success('uploaded a post !')
    set((state) => ({
      posts: [...state.posts, res.data.newPost],
    }))
  },
  addComment: async (data) => {
    try {
      const res = await axios.post(BASE_URL + '/comment/add-comment', data)
      const newComment = res.data

      toast.success('comment added')

      // Update the right post in state
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === data.post
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        ),
      }))
    } catch (error) {
      console.error('Error adding comment:', error.message)
      toast.error('Failed to add comment')
    }
  },

  deletePost: async (id) => {
    const { posts } = get()
    try {
      const res = await axios.delete(BASE_URL + `/post/post/${id}`)
      console.log(res.data)
      set({ posts: posts.filter((item) => item._id !== id) })
      toast.success('Post deleted')
    } catch (error) {
      console.log('error in deletion', error)
      toast.error('Failed to delete post')
      throw error
    }
  },
}))
