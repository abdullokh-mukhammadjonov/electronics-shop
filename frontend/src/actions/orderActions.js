import { 
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL
 } from '../constants/orderConstants'
 import axios from 'axios'

const addNewOrder = (order) => async(dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })

    // /api/orders  POST is a private endpoint. So, authontication is needed
    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.post(`/api/orders`, order, CONFIG)

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data})

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: ORDER_CREATE_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}

const getOrderDetails = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    // /api/orders  POST is a private endpoint. So, authontication is needed
    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        // 'Content-Type': 'application/json', // not needed for GET requests
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.get(`/api/orders/${id}`, CONFIG)

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order})

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: ORDER_DETAILS_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const getMyOrders = () => async(dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST })

    // /api/orders  POST is a private endpoint. So, authontication is needed
    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        // 'Content-Type': 'application/json', // not needed for GET requests
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.get('/api/orders/myorders', CONFIG)

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data})

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: MY_ORDERS_FAIL,
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}




const payOrder = (orderID, paymentResult) => async(dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST })

    // /api/orders/:id  PUT is a private endpoint. So, authontication is needed
    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.put(`/api/orders/${orderID}/pay`, paymentResult, CONFIG)

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data})

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: ORDER_PAY_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}

// ADMIN ONLY
const listOrders = () => async(dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST })

    // /api/orders/:id  PUT is a private endpoint. So, authontication is needed
    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.get(`/api/orders`, CONFIG)

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data})

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: ORDER_LIST_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const deliverOrder = (orderID) => async(dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST })

    // /api/orders/:id  PUT is a private endpoint. So, authontication is needed
    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.put(`/api/orders/${orderID}/deliver`, {}, CONFIG)

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data})

  } catch(error) {

    dispatch({ 
      type: ORDER_DELIVER_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


export {
  addNewOrder,
  getOrderDetails,
  getMyOrders,
  payOrder,
  listOrders,
  deliverOrder
}
