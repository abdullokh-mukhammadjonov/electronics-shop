import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { singleProduct, createProductReview } from '../actions/productActions'
import { PRODUCT_REVIEW_ADD_RESET } from '../constants/productConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import SelectList from '../UI/selectListFromNumber'

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const {id} = match.params


  // component level state
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [qty, setQty] = useState(1)

  const productSingle = useSelector(state => state.productSingle)
  const { loading, product, error } = productSingle  


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin 


  const productCreateReview = useSelector(state => state.productCreateReview)
  const { 
          loading: loadingReview, 
          success: successReview, 
          error: errorReview } = productCreateReview


  useEffect(() => {
    dispatch(singleProduct(id))
    if(successReview || errorReview){
      setComment('')
      setRating(0)
      dispatch({ type: PRODUCT_REVIEW_ADD_RESET })
    }
    // eslint-ignore-next-line
  }, [dispatch, id, successReview])

  const addToCartHandler = () => {
    history.push(`/cart/${id}/?qty=${qty}`)
  }

  const addReviewHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, {
      rating,
      comment
    }))
  }


  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go back</Link>
      { loading ? <Loader /> 
        : error ? <Message variant='danger'>{error}</Message>
        : (<>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid/>
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating value={product.rating} 
                          color="red" 
                          text={` rating from ${product.numReviews} reviews`}/>
                </ListGroup.Item>

                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>${product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ? 'in stock' : 'out of stock'}</Col>
                      <Col><i style={{color: `${product.countInStock > 0 ? 'green' : 'red'}`}} 
                              className={`fas fa-${product.countInStock > 0 ? 'check' : 'times-circle'}`}></i></Col>
                    </Row>
                  </ListGroup.Item>
                  { product.countInStock > 0 && (
                                    <ListGroup.Item>
                                      <Row>
                                        <Col>Quantity</Col>
                                        <SelectList value={qty}
                                                    size={product.countInStock}
                                                    change={setQty} />
                                      </Row>
                                    </ListGroup.Item>) }
                  

                  <ListGroup.Item>
                    <Button className="btn-dark btn-block" 
                            type="button"
                            onClick={addToCartHandler}
                            disabled={!(product.countInStock > 0)}>Add to cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              { product.reviews && product.reviews.length === 0 && <Message>No reviews</Message> }
              <ListGroup variant='flush'>
                { product.reviews && product.reviews.map(r => {
                  return <ListGroup.Item key={r._id}>
                    <strong>{r.name}</strong>
                    <Rating value={r.rating}
                            color='red'
                            text=''/>
                    <p>{r.createdAt.substr(0, 10)}</p>
                    <p>{r.comment}</p>
                  </ListGroup.Item>
                }) }
                <ListGroup.Item>
                  <h3>Write your review</h3>
                  { errorReview && <Message variant='danger'>{errorReview}</Message> }
                  { loadingReview && <Loader /> }
                  { userInfo 
                    ? (
                    <Form onSubmit={addReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Review</Form.Label>
                        <Form.Control as='select'
                                     value={rating} 
                                     onChange={(e) => setRating(e.target.value)}>
                          <option value=''>select...</option>     
                          <option value='1'>1 - Poor</option>     
                          <option value='2'>2 - Fair</option>     
                          <option value='3'>3 - Good</option>     
                          <option value='4'>4 - Very good</option>     
                          <option value='5'>5 - Excellent</option>     
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea'
                                     row={3}
                                     value={comment} 
                                     onChange={(e) => setComment(e.target.value)}>
   
                        </Form.Control>
                      </Form.Group>

                      <Button type='submit' variant='primary'>Submit</Button>
                      
                    </Form>) 
                    : <Message>Please, <Link to='/signin'>sign in</Link> to write a comment{' '}</Message> }
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row></>)
      }
    </>
  )
}

export default ProductScreen