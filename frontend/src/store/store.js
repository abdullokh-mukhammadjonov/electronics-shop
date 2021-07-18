import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productReducer } from '../reducers/productReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productSingle: productReducer
})
const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware)))

export default store
