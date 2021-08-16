import { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, singleProduct } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const INITIAL_DATA = {
  "price": 0,
  "countInStock": 0,
  "name": "",
  "image": "/images/sample.jpg",
  "description": "",
  "brand": "",
  "category": "",
}


const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const [ form, setForm ] = useState(INITIAL_DATA)
  const [ uploading, setUploading ] = useState(false)

  const productId = match.params.id

  // getting user informaion for authentication/authorization
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin || {}

  // getting product details to update
  const productDetails = useSelector(state => state.productSingle)
  const { loading, product, error } = productDetails

  // productUpdate part of state
  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate

  useEffect(() => {
    if(!userInfo || !userInfo.isAdmin)
      history.push('/signin')

    if(successUpdate){
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      // console.log("1 product is ",product)
      if(!product.name || product._id !== productId){
        dispatch(singleProduct(productId))
      }
    }
  // eslint-disable-next-line
  }, [userInfo, history, successUpdate, dispatch, productId])


  useEffect(() => {
    setForm({
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      image: product.image,
      description: product.description,
      brand: product.brand,
      category: product.category,
    })
  }, [product])



  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }


  const handleSubmit = e => {
    e.preventDefault()

    dispatch(updateProduct({
      _id: product._id,
      name: form.name,
      price: form.price,
      countInStock: form.countInStock,
      image: form.image,
      description: form.description,
      brand: form.brand,
      category: form.category,
    }))
  }

  const uploadFileHandler = async(e) => {
    const file = e.target.files[0] // only 1 image
    const formData = new FormData()

    formData.append('image', file)

    setUploading(true)

    try {
      const CONFIG = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, CONFIG)

      setField('image', data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return(
  <>
    <Link to='/admin/productlist'>Go back</Link>

    <FormContainer>
      <h1>Edit product</h1>
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
                            value={form.name || ''}
                            onChange={ e => setField('name', e.target.value) }
                            />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type='number'
                            placeholder='enter price'
                            value={form.price || 0}
                            onChange={ e => setField('price', e.target.value) }
                             />
            </Form.Group>    

            <Form.Group controlId="countInStock">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control type='number'
                            placeholder='enter count'
                            value={form.countInStock || 0}
                            onChange={ e => setField('countInStock', e.target.value) }
                             />
            </Form.Group>    

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <InputGroup>
                <Form.Control type='text'
                              placeholder='enter image url'
                              value={form.image || ''}
                              onChange={ e => setField('image', e.target.value) }
                               />
                <Form.Control type="file"
                            onChange={uploadFileHandler} />
              </InputGroup>
              { uploading && <Loader /> }
            </Form.Group>    

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type='text'
                            placeholder='enter description'
                            value={form.description || ''}
                            onChange={ e => setField('description', e.target.value) }
                             />
            </Form.Group>    

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control type='text'
                            placeholder='enter brand'
                            value={form.brand || ''}
                            onChange={ e => setField('brand', e.target.value) }
                             />
            </Form.Group>    

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control type='text'
                            placeholder='enter category'
                            value={form.category || ''}
                            onChange={ e => setField('category', e.target.value) }
                             />
            </Form.Group>    


            <Button type='submit' 
                    variant='primary'>Update</Button>

          </Form> }
      
    </FormContainer>
  </>
  
  )
}

export default ProductEditScreen