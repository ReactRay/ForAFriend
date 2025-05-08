import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  connectDB()
})
