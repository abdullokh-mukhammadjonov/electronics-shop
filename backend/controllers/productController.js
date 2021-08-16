import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
  return
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
    return
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// ADMIN ONLY ROUTES

// @desc    Delete product (admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product) {
    await product.remove()
    res.json({ message: 'Product has been removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
  return
})



// @desc    Add a new product (admin only)
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // const { name, price, image, description, brand, category, countInStock } = req.body
  // creating product with just sample data. we can update it later in the frontend

  const product = new Product({
    name: "sample product",
    price: 2,
    user: req.user._id,
    image: '/images/sample.jpg',
    description: 'Sample description',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0
  })

  const newProduct = await product.save()

  if(newProduct) {
    res.status(201).json(newProduct)
  } else {
    res.status(400)
    throw new Error('Could not create data')
  }

  return
})



// @desc    Update product (admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, brand, category, countInStock } = req.body

  const product = await Product.findById(req.params.id)

  if(product) {
    product.name = name,
    product.price = price,
    product.image = image,
    product.description = description,
    product.brand = brand,
    product.category = category,
    product.countInStock = countInStock

    // updating instance of Uer model
    const updatedProduct = await product.save()

    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }

  return
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}