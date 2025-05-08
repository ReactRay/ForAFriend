import express from 'express'
import {
  createPost,
  getOnePost,
  getPosts,
} from '../controllers/post.controller.js'
const router = express.Router()

router.post('/create-post', createPost)

router.get('/posts', getPosts)

router.get('/post', getOnePost)

export default router
