import Post from '../models/post.model.js'

import cloudinary from '../lib/cloudinary.js'

export async function getOnePost(req, res) {
  const { id } = req.body

  try {
    const post = await Post.findById(id).populate('comments')

    if (post) {
      return res.status(200).json(post)
    }

    return res.status(404).json({ message: 'Post not found' })
  } catch (error) {
    console.error('Error fetching post:', error.message)
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await Post.find().populate('user')
    console.log(posts)

    if (posts) {
      res.status(200).json(posts)
    }
    res.status(500).json({ message: 'Server error', error: err.message })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

export async function createPost(req, res) {
  try {
    const { image, title, description, price, contact, user } = req.body

    let uploadedImageUrl = ''
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      uploadedImageUrl = uploadResponse.secure_url
    }

    const newPost = await Post.create({
      title,
      description,
      price: Number(price),
      contact,
      image: uploadedImageUrl,
      user,
    })

    res.status(201).json({ message: 'post created', newPost })
  } catch (err) {
    console.error('❌ Error in createPost:', err.message)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
