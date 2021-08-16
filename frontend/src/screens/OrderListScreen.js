import { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const { loading, orders, error } = orderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin
 
  useEffect(() => {
    if(userInfo && userInfo.isAdmin)
      dispatch(listOrders())
    else
      history.push('/signin')
  }, [dispatch, history, userInfo])

  return (
  <>
    { loading && <Loader /> }
    { error ? <Message variant='danger'>{error}</Message> 
    : <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>PAYMENT METHOD</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          { orders && orders.length > 0 
            ? orders.map(order => {
            return (
              <tr key={order._id}>
                <td>{order._id}</td>            
                <td>{order.user && order.user.name}</td>                       
                <td>{order.paymentMethod}</td>                     
                <td>{order.createdAt.substr(0, 10)}</td>                     
                <td>${order.totalPrice}</td>                     
                <td>{order.isPaid 
                  ? (order.paidAt.substr(0, 10))
                  : <i className='fas fa-times-circle' style={{ color: 'red' }}></i>}
                </td>                

                <td>{order.isDelivered 
                  ? (order.deliveredAt.substr(0, 10))
                  : <i className='fas fa-times-circle' style={{ color: 'red' }}></i>}
                </td>

                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-info'></i>Details
                    </Button>
                  </LinkContainer>
                </td>                            
              </tr>)
          })

          : <tr><td><h2>No orders found</h2></td></tr> }
        </tbody>
      </Table>}
  </>)
}

export default OrderListScreen