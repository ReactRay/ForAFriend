import express from 'express'

import { createNewRequest } from '../controllers/request.controller.js'

const router = express.Router()

router.post('/new-request', createNewRequest)

export default router
