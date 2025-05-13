import express from 'express'

import {
  createNewRequest,
  getRequests,
} from '../controllers/request.controller.js'

const router = express.Router()

router.post('/new-request', createNewRequest)

router.get('/all', getRequests)

export default router
