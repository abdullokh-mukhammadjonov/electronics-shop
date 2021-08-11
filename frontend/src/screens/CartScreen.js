import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'
import { Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap'
import SelectList from '../UI/selectListFromNumber'
import { Link, Redirect } from 'react-router-dom'

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const isAuthenticated = userLogin.userInfo !== null && userLogin.userInfo !== undefined

  // redux state
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const producId = match.params.id
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1

  useEffect(() => {
    if(producId){
      dispatch(addToCart(producId, quantity))
    }
  }, [dispatch, producId, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/signin?redirect=shipping')
  }

  return (
    !isAuthenticated ? <Redirect to='/signin' /> 
    : <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        { cartItems.length === 0 
          ? (<Message>Your cart is empty<Link style={{color: 'red', float: 'right'}} to='/'>Go back</Link></Message>)
          : (<ListGroup variant='flush'>
              {cartItems.map(item => {
                return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <SelectList value={item.qty}
                                  size={item.countInStock}
                                  change={(quant) => dispatch(addToCart(item.product, quant))}/> 
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i></Button>
                    </Col>
                  </Row>
                </ListGroup.Item>)
              })}
             </ListGroup>)
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc+item.qty, 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                type="button"
                className="btn-block"
                onClick={() => checkoutHandler()}
                disabled={cartItems.length === 0}>Proceed to checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen