import { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'


const LoginSreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, userInfo, error } = userLogin

  useEffect(() => {
    // if user is already logged in, userInfo 
    // variable is non-null,  no need to log in
    // again. redirect variable must have a value then

    // if user is not logged in, userInfo is null.
    if(userInfo){
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return(
  <FormContainer>
    <h1>Sign in</h1>
    { error&& <Message variant='danger'>{error}</Message> }
    { loading&& <Loader/> }
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="email">
        <Form.Label>EmailAddress</Form.Label>
        <Form.Control type='email'
                      placeholder='enter email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}></Form.Control>
      </Form.Group>      

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type='password'
                      placeholder='enter password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}></Form.Control>
      </Form.Group>

      <Button type='submit' variant='primary'>Sign in</Button>

      <Row className='py-3'>
        <Col>
          New customer?{'   '}
          <Link style={{color: '#0078D4'}} to={redirect ? `/signup?redirect=${redirect}`
                             : '/signup'}>
            Regiter
          </Link>
        </Col>
      </Row>
    </Form>
  </FormContainer>
  )
}


export default LoginSreen