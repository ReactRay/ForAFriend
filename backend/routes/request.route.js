import express from 'express'

import {
  createNewRequest,
  getRequests,
  updateRequest,
} from '../controllers/request.controller.js'

const router = express.Router()

router.post('/new-request', createNewRequest)

router.get('/all', getRequests)
router.put('/update', updateRequest)

export default router
