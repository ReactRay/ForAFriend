import Request from '../models/request.schema.js'

export async function createNewRequest(req, res) {
  try {
    const { postId, senderId, receiverId } = req.body

    if (!postId || !senderId || !receiverId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const newRequest = await Request.create({
      post: postId,
      sender: senderId,
      receiver: receiverId,
      status: 'pending',
    })

    return res.status(201).json(newRequest)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// Route: GET /request/all?userId=123

export async function getRequests(req, res) {
  const { userId, caller } = req.query

  if (!userId) {
    return res.status(400).json({ message: 'Missing sender id' })
  }

  try {
    const results = await Request.find({ [caller]: userId })
      .populate('post')
      .populate('sender')
      .populate('receiver')
    return res.status(200).json(results)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateRequest(req, res) {
  const { requestId, status } = req.body

  if (!requestId || !status) {
    return res.status(400).json({ message: 'missing info' })
  }

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    )

    if (updatedRequest) {
      return res.status(200).json(updatedRequest)
    } else {
      return res.status(404).json({ message: 'Request not found' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'internal server error' })
  }
}
