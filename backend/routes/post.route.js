import express from 'express'
import { createPost, getPosts } from '../controllers/post.controller.js'
const router = express.Router()

router.post('/create-post', createPost)

router.get('/posts', getPosts)

export default router
