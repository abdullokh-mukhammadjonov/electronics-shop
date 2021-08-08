import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import Countries from '../data/countries'
import CheckoutSteps from '../components/CheckoutSteps'


const ShippingScreen = ({ history }) => {
  // if shipping address alrdy exists in 
  // the state||storage load it by default
  const cart = useSelector(state => state.cart)
  const { shippingAddress: { address, postalCode, city, country } } = cart

  const [ form, setForm ] = useState({ 
    address: address||'', 
    postalCode: postalCode||'', 
    city: city||'', 
    country: country||'' 
  })

  const dispatch = useDispatch()
   const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    // if ( !!errors[field] ) setErrors({
    //   ...errors,
    //   [field]: null
    // })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // console.log(form)
    dispatch(saveShippingAddress({ ...form }))
    history.push('/payment')
  }

  return(
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <Form onSubmit={submitHandler}>
        <h1>Shipping</h1>
        <Form.Group controlId="address">
          <Form.Label>Adress</Form.Label>
          <Form.Control type='text'
                        placeholder='enter address'
                        value={form.address || ''}
                        onChange={ e => setField('address', e.target.value) }
                        required 
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type='text'
                        placeholder='enter city'
                        value={form.city || ''}
                        onChange={ e => setField('city', e.target.value) }
                        required 
          />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal code</Form.Label>
          <Form.Control type='text'
                        placeholder='enter postal code'
                        value={form.postalCode || ''}
                        onChange={ e => setField('postalCode', e.target.value) } 
                        required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control as="select"
                  defaultValue={country||''}
                  onChange={(e) => {
                    setField('country', e.target.value)
                  }}
                  required>
                  {Countries.map((country, i) => (
                    <option key={i+1}
                            value={country.name}>{country.name}</option>
                  ))}
          </Form.Control>
        </Form.Group>

        <Button variant='primary' type='submit'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen