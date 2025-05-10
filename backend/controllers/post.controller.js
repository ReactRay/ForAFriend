import Post from '../models/post.model.js'

import cloudinary from '../lib/cloudinary.js'

export async function getOnePost(req, res) {
  const { id } = req.query

  try {
    const post = await Post.findById(id)
      .populate('user') // post owner
      .populate({
        path: 'comments',
        populate: { path: 'user' }, // user of each comment
      })

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
    const posts = await Post.find().populate('user').populate('comments')

    if (posts) {
      return res.status(200).json(posts)
    }

    return res.status(404).json({ message: 'No posts found' })
  } catch (err) {
    console.error('Error in getPosts:', err.message)
    return res.status(500).json({ message: 'Server error', error: err.message })
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

export async function deletePost(req, res) {
  const postId = req.params.id
  console.log(postId, req)

  try {
    await Post.findByIdAndDelete(postId)
    res.status(200).json('Post deleted successfully')
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { id, ...updates } = req.body

    console.log(req.body, 'reached')
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      updates,
      { new: true } // returns the updated document
    )

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.status(200).json(updatedPost)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to update post', error })
  }
}
