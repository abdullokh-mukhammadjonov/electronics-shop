import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview
} from '../controllers/productController.js'

import { protect, adminOnly } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getProducts)
  .post(protect, adminOnly, createProduct)

router
  .route('/:id/reviews')
  .post(protect, createReview)

router
  .route('/:id')
  .get(getProductById)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct)



export default router
