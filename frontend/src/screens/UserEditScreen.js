import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, updateUser } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { validateEmail } from '../utils/validateInputs'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const userId = match.params.id

  const userDetails = useSelector(state => state.userDetails)
  const { loading, user, error } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate

  const [ form, setForm ] = useState({name: '', email: '', isAdmin: false})

  const [ errors, setErrors ] = useState({})


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
    const { name, email } = form
    const newErrors = {}
    // name errors
    if ( !name || name === '' ) newErrors.name = 'cannot be blank!'
    else if ( name.length > 30 || name.length < 4 ) newErrors.name = 'name length must be between 4 and 30!'
    // food errors
    if ( !validateEmail(email) ) newErrors.email = 'email is not valid!'
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
      // alert('Thank you for your feedback!')
      // const {name, email, password} = form
      dispatch(updateUser({ _id: userId, ...form }))
      setForm({name: '', email: '', isAdmin: false})
    }
  }

  useEffect(() => {
    if(successUpdate){
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userslist')
    } else {
      if(!user.name || user._id !== userId)
        dispatch(getUserProfile(userId))
      else
        setForm({ name: user.name, email: user.email, isAdmin: user.isAdmin })
    }
    
  }, [dispatch, user, userId, successUpdate, history])

  return(
  <>
    <Link to='/admin/userslist'>Go back</Link>

    <FormContainer>
      <h1>Edit user</h1>
      { loadingUpdate && <Loader /> }
      { errorUpdate && <Message variant='danger'>{ errorUpdate }</Message> }


      { loading&& <Loader/> }
      { error 
        ? <Message variant='danger'>{error}</Message>
        : <Form onSubmit={handleSubmit}>
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

            <Form.Group controlId="isadmin">
              <Form.Label>Authontication</Form.Label>
              <Form.Check type='checkbox'
                          label='Is admin'
                          checked={form.isAdmin}
                          onChange={ e => setField('isAdmin', e.target.checked) }/>
            </Form.Group>      

            <Button type='submit' 
                    variant='primary'>Update</Button>

          </Form> }
      
    </FormContainer>
  </>
  
  )
}

export default UserEditScreen