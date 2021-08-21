import axios from 'axios'
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_LOGOUT,
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_REGISTER_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from '../constants/userConstants'

import {
  MY_ORDERS_RESET,
  ORDER_DETAILS_RESET
} from '../constants/orderConstants'

import { CART_RESET } from '../constants/cartConstants'


const login = (email, password) => async(dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const CONFIG = {
      headers: {
        'content-type': 'application/json'
      }
    }
    
    const { data } = await axios.post('/api/users/login', {
      email,
      password
    }, CONFIG)

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data})

    // saving in the local storage
    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch(error) {

    dispatch({ 
      type: USER_LOGIN_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const getUserProfile = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        // 'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.get(`/api/users/${id}`, CONFIG)

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data})

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: USER_PROFILE_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const register = (name, email, password) => async(dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const CONFIG = {
      headers: {
        'content-type': 'application/json'
      }
    }
    
    const { data } = await axios.post('/api/users/signup', {
      name,
      email,
      password,
    }, CONFIG)

    // registered successfully
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data})

    // so, login
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data})

    // saving in the local storage
    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch(error) {

    dispatch({ 
      type: USER_REGISTER_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const updateUserProfile = (user) => async(dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.put(`/api/users/profile`, user, CONFIG)

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data})

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data})

    // saving in the local storage
    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: USER_UPDATE_PROFILE_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const logout = () => async(dispatch) => {
    // clearing profile state
    dispatch({ type: USER_PROFILE_RESET })

    // clearing myorders state
    dispatch({ type: MY_ORDERS_RESET })

    // clearing users list (for admin) state
    dispatch({ type: USER_LIST_RESET })

    // clearing order details state
    dispatch({ type: ORDER_DETAILS_RESET })    


    // clearing cart state
    dispatch({ type: CART_RESET })

    // logging out
    dispatch({ type: USER_LOGOUT })

    // removing from the local storage
    localStorage.removeItem('userInfo')
}


// ADMIN ONLY

const getUsersList = () => async(dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        // no 'content-type' is needed for gt requests
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.get('/api/users/', CONFIG)

    dispatch({ type: USER_LIST_SUCCESS, payload: data})

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: USER_LIST_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}



const updateUser = (user) => async(dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    const { data } = await axios.put(`/api/users/${user._id}`, user, CONFIG)

    dispatch({ type: USER_UPDATE_SUCCESS })

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data})

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: USER_UPDATE_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}


const deleteUser = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const CONFIG = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    await axios.delete(`/api/users/${id}`, CONFIG)
    // const { data } = await axios.delete(`/api/users/${id}`, CONFIG)

    dispatch({ type: USER_DELETE_SUCCESS })

  } catch(error) {
    // console.log(error)
    dispatch({ 
      type: USER_DELETE_FAIL, 
      payload: error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message })
  }
}

export { 
  login, 
  register, 
  logout, 
  getUserProfile, 
  updateUserProfile, 
  getUsersList,
  deleteUser,
  updateUser }