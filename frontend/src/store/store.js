import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productReducer } from '../reducers/productReducer'
import cartReducer from '../reducers/cartReducer'
import { 
  userRegisterReducer, 
  userLoginReducer,
  userProfileReducer,
  userUpdateProfileReducer } from '../reducers/userReducer'
import orderCreateReducer from '../reducers/orderReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productSingle: productReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer
})

// if there are items in the local 
// storage, start by reading them
// and setting them as initial state
const cartItemsFromLocalStorage = localStorage.getItem('CartItems') 
  ? JSON.parse(localStorage.getItem('CartItems')) 
  : [] 


const userInfoFromLocalStorage = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) 
  : null


const shippingAdressFromLocalStorage = localStorage.getItem('ShippingAdress') 
  ? JSON.parse(localStorage.getItem('ShippingAdress')) 
  : {}

const paymentMethodFromLocalStorage = localStorage.getItem('PaymentMethod') 
  ? JSON.parse(localStorage.getItem('PaymentMethod')) 
  : ''

const initialState = {
  cart: { 
    cartItems: cartItemsFromLocalStorage, 
    shippingAddress: shippingAdressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage
  },

  userLogin: {
    userInfo: userInfoFromLocalStorage
  },
}

const middleware = [thunk]

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware)))

export default store
