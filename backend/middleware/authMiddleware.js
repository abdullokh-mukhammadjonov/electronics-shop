import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token
  
  if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
    try { 
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // if the token is valid and verified, the user 
      // object is assigned to the request object
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch(err) {

      res.status(401)

      throw new Error('Not authorized, token failed')
    }
  }

  if(!token) {
    res.status(401)
    
    throw new Error('Not authorized. No token found')
  }
})

export {
  protect
}