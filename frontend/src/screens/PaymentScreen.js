import { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'


const PaymentScreen = ({ history }) => {
  // if shipping address alrdy exists in 
  // the state||storage load it by default
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if(!shippingAddress) {
    history.push('/shipping')
  }

  const [ paymentMethod, setPaymentMethod ] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    // console.log(form)
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <Form onSubmit={submitHandler}>
        <h1>Payment Method</h1>

        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check type='radio' 
                        label='PayPal or Credit Card' 
                        id='PayPal' 
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={ e => setPaymentMethod(e.target.value) }>
              
            </Form.Check>            

            <Form.Check type='radio' 
                        label='Stripe' 
                        id='Stripe' 
                        name='paymentMethod'
                        value='Stripe'
                        onChange={ e => setPaymentMethod(e.target.value) }>
              
            </Form.Check>
          </Col>
        </Form.Group>

        <Button variant='primary' type='submit'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen