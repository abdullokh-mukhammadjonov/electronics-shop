import express from 'express'
import { protect, adminOnly } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  orderUpdateToPaid,
  getMyOrders,
  getAllOrders,
  orderUpdateToDelivered
} from '../controllers/orderControllers.js'

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, adminOnly, getAllOrders)

router.get('/myorders', protect, getMyOrders)
  
router.get('/:id', protect, getOrderById)


router.put('/:id/pay', protect, orderUpdateToPaid)
router.put('/:id/deliver', protect, adminOnly, orderUpdateToDelivered)

export default router
