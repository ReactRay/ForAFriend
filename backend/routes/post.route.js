import express from 'express'
import {
  createPost,
  getOnePost,
  getPosts,
  deletePost,
  updatePost,
} from '../controllers/post.controller.js'
const router = express.Router()

router.post('/create-post', createPost)

router.get('/posts', getPosts)

router.get('/post', getOnePost)

router.delete('/post/:id', deletePost)

router.put('/post/update-post', updatePost)

export default router
