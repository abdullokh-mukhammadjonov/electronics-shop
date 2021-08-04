import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerNewUser,
  updateUserProfile
} from '../controllers/userControllers.js'

router.post('/login', authUser)

router.post('/signup', registerNewUser)


router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
export default router
