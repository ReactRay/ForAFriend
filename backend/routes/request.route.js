import express from 'express'

const router = express.Router()

router.post('/new-request', createNewRequest)

export default router
