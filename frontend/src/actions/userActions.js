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
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  // USER_UPDATE_PROFILE_FAIL,
  // USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'  
  USER_UPDATE_PROFILE_FAIL}from '../constants/userConstants'

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
    dispatch({ type: USER_LOGOUT })

    // removing from the local storage
    localStorage.removeItem('userInfo')
}

export { login, register, logout, getUserProfile, updateUserProfile }