import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateJSONWebToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({email})
  if(user){
    if(await user.matchPassword(password)){
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error('Invalid password')
    }
  } else {
    res.status(404)
    throw new Error('Couldn\'t authonticate. User not found')
  }
  return
})

// @desc    Get user profilee
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  return
})


// @desc    Get user profilee
// @route   GET /api/users/profile
// @access  Private
const registerNewUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body

  const userExists = await User.findOne({ email })
  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

  return
})


// @desc    Update user profilee
// @route   POST /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user) {
    user.name = req.body.name || user.name
    user.email = String(req.body.email).toLowerCase() || user.email
    if(req.body.password)
      user.password = req.body.password

    // updating instance of Uer model
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  return
})


// ADMIN ONLY ROUTES

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user) {
    await user.remove()
    res.json({ message: 'User has been removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  return
})


// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
  return
})


// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if(user)
    res.json(user)
  else {
    res.status(404)
    throw new Error('User not found')
  }
  return
})


// @desc    Update user profile (admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user) {
    user.name = req.body.name || user.name
    user.email = String(req.body.email).toLowerCase() || user.email
    user.isAdmin = req.body.isAdmin

    // updating instance of User model
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  return
})


export { 
  authUser,
  getUserProfile,
  registerNewUser,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
}
