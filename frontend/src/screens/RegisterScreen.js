import { useState, useEffect } from 'react'
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { validateEmail, validatePassword } from '../utils/validateInputs'
const INITIAL_FORM_STATE = {name: '', email: '', password: '', confirmPassword: ''}

const RegisterSreen = ({ location, history }) => {
  const [ form, setForm ] = useState(INITIAL_FORM_STATE)
  const [ errors, setErrors ] = useState({})
  const [type, setType] = useState('password')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const { loading, userInfo, error } = userRegister

  const showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setType((type) => type === 'text' ? 'password' : 'text');
  }

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const { name, email, password, confirmPassword } = form
    const newErrors = {}
    // name errors
    if ( !name || name === '' ) newErrors.name = 'cannot be blank!'
    else if ( name.length > 30 || name.length < 4 ) newErrors.name = 'name length must be between 4 and 30!'
    // food errors
    if ( !validateEmail(email) ) newErrors.email = 'email is not valid!'
    // rating errors
    if ( !validatePassword(password) ) newErrors.password = 'password must be between 6 and 16 characters including at least 1 number!'
    if ( confirmPassword.length === 0 ) newErrors.confirmPassword = 'please rewrite the password you chose!'
    else if ( password !== confirmPassword ) newErrors.confirmPassword = 'passwords do not match!'
    return newErrors
  }

  const handleSubmit = e => {
    e.preventDefault()
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    } else {
      // No errors! Put any logic here for the form submission!
      alert('Thank you for your feedback!')
      const {name, email, password} = form
      dispatch(register(name, String(email).toLowerCase(), password))
      setForm({name: '', email: '', password: ''})
    }
  }

  useEffect(() => {
    // if user is already logged in, userInfo 
    // variable is non-null,  no need to log in
    // again. redirect variable must have a value then

    // if user is not logged in, userInfo is null.
    if(userInfo){
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return(
  <FormContainer>
    <h1>Sign up</h1>
    { error&& <Message variant='danger'>{error}</Message> }
    { loading&& <Loader/> }
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type='text'
                      placeholder='enter name'
                      value={form.name}
                      onChange={ e => setField('name', e.target.value) }
                      isInvalid={ !!errors.name } />
        <Form.Control.Feedback type='invalid'>
          { errors.name }
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type='email'
                      placeholder='enter email'
                      value={form.email}
                      onChange={ e => setField('email', e.target.value) }
                      isInvalid={ !!errors.email } />
        <Form.Control.Feedback type='invalid'>
              { errors.email }
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control type={type}
                        placeholder='enter password'
                        value={form.password}
                        onChange={ e => setField('password', e.target.value) }
                        isInvalid={ !!errors.password } />
          <InputGroup.Prepend>
            <InputGroup.Text style={{background: '#F7F7F9'}}>
              <i className={(type !== 'password' && form.password.length>0) ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showHide}></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control.Feedback type='invalid'>
            { errors.password }
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>      

      <Form.Group controlId="passwordConfirm">
        <Form.Label>Confirm password</Form.Label>
        <InputGroup>
          <Form.Control type="password"
                        placeholder='confirm password'
                        value={form.confirmPassword}
                        onChange={ e => setField('confirmPassword', e.target.value) }
                        isInvalid={ !!errors.confirmPassword } />
          <InputGroup.Prepend>
            <InputGroup.Text style={{background: '#F7F7F9'}}>
              <i className={(type !== 'password' && form.password.length>0) ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showHide}></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control.Feedback type='invalid'>
            { errors.confirmPassword }
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Button type='submit' 
              variant='primary'>Sign up</Button>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link style={{color: '#0078D4'}} to={redirect ? `/signin?redirect=${redirect}`
                             : '/signin'}>
            Login
          </Link>
        </Col>
      </Row>
    </Form>
  </FormContainer>
  )
}

export default RegisterSreen