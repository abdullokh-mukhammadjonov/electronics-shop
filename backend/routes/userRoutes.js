import express from 'express'
import { protect, adminOnly } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerNewUser,
  updateUserProfile,
  getAllUsers,
  deleteUser
} from '../controllers/userControllers.js'

router.get('/', protect, adminOnly, getAllUsers)

router.post('/login', authUser)

router.post('/signup', registerNewUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.delete('/:id', protect, adminOnly, deleteUser)

export default router
