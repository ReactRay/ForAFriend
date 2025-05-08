import Comment from '../models/comment.model.js'

export async function addComment(req, res) {
  try {
    const { body, userId, postId } = req.body

    const newComment = await Comment.create({
      body,
      user: userId,
      post: postId,
    })

    res.status(201).json(newComment)
  } catch (error) {
    console.error('Error adding comment:', error.message)
    res.status(500).json({ message: 'Failed to add comment' })
  }
}
