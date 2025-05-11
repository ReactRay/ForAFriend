import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { connectDB } from './lib/db.js'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import requestRoutes from './routes/request.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use('/auth', authRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)
app.use('/request', requestRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  connectDB()
})
