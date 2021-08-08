import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import generateToken from '../utils/generateJSONWebToken.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Peivate
const addOrderItems = asyncHandler(async (req, res) => {
  const { 
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  if(orderItems && orderItems.length === 0){
    res.status(400) // empty. Bad request
    throw new Error('No order items was provided')
  } else {
    const order = new Order ({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
  return
})

export { addOrderItems }