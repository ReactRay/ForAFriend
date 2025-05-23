import express from 'express'
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
  getUser,
} from '../controllers/auth.controller.js'

const router = express.Router()
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.put('/update-profile', updateProfile)
router.get('/check', checkAuth)
router.get('/user', getUser)
export default router
