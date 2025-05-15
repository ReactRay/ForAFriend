import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = 'http://localhost:5001'

export const usePostStore = create((set, get) => ({
  posts: [],
  filter: '',

  changeFilter: (data) => {
    set({ filter: data })
  },

  getPosts: async () => {
    const res = await axios.get(BASE_URL + '/post/posts')
    const filter = get().filter
    const data = res.data

    let filteredData = data

    if (filter !== '') {
      filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase())
      )
    }

    set({ posts: filteredData })
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
      set({ posts: posts.filter((item) => item._id !== id) })
      toast.success('Post deleted')
    } catch (error) {
      console.log('error in deletion', error)
      toast.error('Failed to delete post')
      throw error
    }
  },
  updatePost: async (updatedData) => {
    const { posts } = get()
    const { id } = updatedData

    try {
      const res = await axios.put(
        `${BASE_URL}/post/post/update-post`,
        updatedData
      )
      const updatedPost = res.data

      set({
        posts: posts.map((item) => (item._id === id ? updatedData : item)),
      })

      toast.success('Post updated successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to update post')
    }
  },
}))
