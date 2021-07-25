import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productReducer } from '../reducers/productReducer'
import cartReducer from '../reducers/cartReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productSingle: productReducer,
  cart: cartReducer,
})

// if there are items in the local 
// storage, start by reading them
// and setting them as initial state
const cartItemsFromLocalStorage = localStorage.getItem('CartItems') 
  ? JSON.parse(localStorage.getItem('CartItems')) 
  : [] 

const initialState = {
  cart: { 
    cartItems: cartItemsFromLocalStorage
  }
}

const middleware = [thunk]

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware)))

export default store
