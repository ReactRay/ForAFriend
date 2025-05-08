import Comment from '../models/comment.model.js'
import Post from '../models/post.model.js'

export async function addComment(req, res) {
  try {
    const { body, user, post } = req.body

    const newComment = await Comment.create({
      body,
      user,
      post,
    })

    await Post.findByIdAndUpdate(
      post,
      { $push: { comments: newComment._id } },
      { new: true }
    )

    res.status(201).json(newComment)
  } catch (error) {
    console.error('Error adding comment:', error.message)
    res.status(500).json({ message: 'Failed to add comment' })
  }
}
