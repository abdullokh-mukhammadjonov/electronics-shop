import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

const cartReducer = (state = { cartItems: [] }, action) => {
  // cartItems: [ {count: 5, product: {...}} ]
  switch(action.type){
    case CART_ADD_ITEM:
      const item = action.payload
      const exists = state.cartItems.find(i => i.product === item.product)

      if(exists) {
        return {
          ...state,
          cartItems: state.cartItems.map(i => i.product === item.product ? item : i)
        }
      } else {
        return {
          ...state, cartItems: [...state.cartItems, item]
        }
      }
    case CART_REMOVE_ITEM:
      const id = action.payload
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.product !== id)
      }
    default:
      return state
  }
}

export default cartReducer