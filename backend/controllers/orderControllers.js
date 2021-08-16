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


// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Peivate
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params || null

  try {
    if(id){
      const order = await Order.findById(id).populate('user', 'name email')
      if(order){
        res.json({
          order
        })
      }
    }
  } catch(error) {
    res.status(404)
    throw new Error('Order was not found')
  }
})


// @desc    Get orders for specific user
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    if(orders)
      res.json(orders)
  } catch(error) {
    res.status(404)
    throw new Error('Can\'t find orders')
  }
})


//          TO BE SAVED TO NOTES IF VERIFIED TO BE CORRECT
// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const orderUpdateToPaid = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const order = await Order.findById(id)
    if(order){

      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    }
  } catch(error) {
    res.status(404)
    throw new Error('Order to be paid was not found')
  }
})


// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private
const orderUpdateToDelivered = asyncHandler(async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id)

  if(order){

    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order to be paid was not found')
  }
})



// ADMIN ONLY ROUTES
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin only
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  if(orders)
    res.json(orders)
  else {
    res.status(404)
    throw new Error('Can\'t get orders')
  }
})

export { 
  addOrderItems, 
  getOrderById, 
  orderUpdateToPaid, 
  orderUpdateToDelivered,
  getMyOrders,
  getAllOrders
}