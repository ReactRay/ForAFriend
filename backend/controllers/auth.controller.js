import User from '../models/user.model.js'
import cloudinary from '../lib/cloudinary.js'
import bcrypt from 'bcrypt'

// Helper to set user cookie
const setUserCookie = (res, user) => {
  res.cookie(
    'user',
    JSON.stringify({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    }),
    {
      httpOnly: false,
      sameSite: 'Lax',
      secure: false,
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    }
  )
}

// Helper to clear user cookie
const clearUserCookie = (res) => {
  res.clearCookie('user', {
    httpOnly: false,
    sameSite: 'Lax',
    secure: false,
    path: '/',
  })
}

// ===============================
// SIGNUP
// ===============================
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ fullName, email, password: hashedPassword })

    await newUser.save()
    setUserCookie(res, newUser)

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    })
  } catch (error) {
    console.log('Error in signup controller:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// ===============================
// LOGIN
// ===============================
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    setUserCookie(res, user)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    })
  } catch (error) {
    console.log('Error in login controller:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// ===============================
// LOGOUT
// ===============================
export const logout = (req, res) => {
  try {
    clearUserCookie(res)
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log('Error in logout controller:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// ===============================
// UPDATE PROFILE PIC
// ===============================
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, userId } = req.body

    if (!profilePic) {
      return res.status(400).json({ message: 'Profile pic is required' })
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log('Error in update profile:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// ===============================
// CHECK AUTH
// ===============================
export const checkAuth = (req, res) => {
  try {
    const userCookie = req.cookies.user

    if (!userCookie) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    const user = JSON.parse(userCookie)

    res.status(200).json(user)
  } catch (error) {
    console.log('Error in checkAuth controller:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function getUser(req, res) {
  const { id } = req.body

  try {
    const user = await User.findOne({ _id: id })

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error('Error in find user:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
