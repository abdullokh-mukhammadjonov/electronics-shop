import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  orderUpdateToPaid,
  getMyOrders
} from '../controllers/orderControllers.js'

router
  .route('/')
  .post(protect, addOrderItems)

router.get('/myorders', protect, getMyOrders)
  
router.get('/:id', protect, getOrderById)


router.put('/:id/pay', protect, orderUpdateToPaid)

export default router
