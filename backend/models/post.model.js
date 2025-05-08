import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    contact: {
      type: String,
      default: '058-770-6678',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // ensures every post is tied to a user
    },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
