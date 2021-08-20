import axios from 'axios'
import { 
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,  
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_REVIEW_ADD_REQUEST,
  PRODUCT_REVIEW_ADD_SUCCESS,
  PRODUCT_REVIEW_ADD_FAIL } from '../constants/productConstants'

const listProducts = (keyword='', pageNumber='') => async (dispatch) => {
  const query = `?keyword=${keyword}&pageNumber=${pageNumber}`
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get(`/api/products${query}`)

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data})
  } catch(error) {
    dispatch({ 
      type: PRODUCT_LIST_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })

    const { data } = await axios.get('/api/products/top')

    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data})
  } catch(error) {
    dispatch({ 
      type: PRODUCT_TOP_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}

const singleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: PRODUCT_SUCCESS, payload: data})
  } catch(error) {
    // const 
    dispatch({ 
      type: PRODUCT_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}



const createProductReview = (id, review) => async (dispatch, getState) => {

  try {
    dispatch({ type: PRODUCT_REVIEW_ADD_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.post(`/api/products/${id}/reviews`, review, CONFIG)

    dispatch({ type: PRODUCT_REVIEW_ADD_SUCCESS })

  } catch(error) {
    // const 
    dispatch({ 
      type: PRODUCT_REVIEW_ADD_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}




// ADMIN ONLY
const deleteProduct = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    await axios.delete(`/api/products/${id}`, CONFIG)

    dispatch({ type: PRODUCT_DELETE_SUCCESS })

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: PRODUCT_DELETE_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const createProduct = () => async(dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.post('/api/products/', {}, CONFIG)

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: PRODUCT_CREATE_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const updateProduct = (product) => async(dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST})

    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.put(`/api/products/${product._id}`, product, CONFIG)

    // payload: which data should be passed
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: PRODUCT_UPDATE_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}

export {
  listProducts,
  singleProduct,
  listTopProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview
}