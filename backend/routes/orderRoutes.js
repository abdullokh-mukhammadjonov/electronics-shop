import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  addOrderItems
} from '../controllers/orderControllers.js'

router
  .route('/')
  .post(protect, addOrderItems)

export default router
