import { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'


const UsersListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, products, error } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin

  const productDelete = useSelector(state => state.productDelete)
  const { success: successDelete, error: errorDelete } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const { success: successCreate, product: createdProduct, loading: loadingCreate } = productCreate
 
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if(!userInfo.isAdmin)
      history.push('/signin')
    
    if(successCreate)
      history.push(`/admin/products/${createdProduct._id}/edit`)
    else
      dispatch(listProducts())
      
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

  const deleteProductHandler = (id) => {
    if(window.confirm('Are you sure to delete'))
      dispatch(deleteProduct(id))
  }  

  const createProductHandler = () => {
      dispatch(createProduct())
  }

  return (
  <>
    <Row className='align-items-center'>
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className='text-right'>
        <Button className='my-3' onClick={createProductHandler}>
          <i className='fas fa-plus'></i>Create Product
        </Button>
      </Col>
    </Row>
    { loading && <Loader /> }
    { loadingCreate && <Loader /> }
    { errorDelete && <Message variant='danger'>{errorDelete}</Message> }
    { error ? <Message variant='danger'>{error}</Message> 
    : <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          { products && products.length > 0 
            ? products.map(product => {
            return (
              <tr key={product._id}>
                <td>{product._id}</td>            
                <td>{product.name}</td>            
                <td>${product.price}</td>            
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>

                  <Button variant='danger' 
                          className='btn-sm'
                          onClick={() => deleteProductHandler(product._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>                            
              </tr>)
          })

          : <tr><td><h2>No products found</h2></td></tr> }
        </tbody>
      </Table>}
  </>)
}

export default UsersListScreen