import { 
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL
 } from '../constants/orderConstants'
 import axios from 'axios'

export const addNewOrder = (order) => async(dispatch, getState) => {
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

