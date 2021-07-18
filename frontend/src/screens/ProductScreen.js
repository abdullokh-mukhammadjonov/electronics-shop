import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { singleProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()
  const productSingle = useSelector(state => state.productSingle)
  const { loading, product, error } = productSingle
  const {id} = match.params
  // component level state
  const [qty, setQty] = useState(0)

  useEffect(() => {
    dispatch(singleProduct(id))
  }, [dispatch, id])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go back</Link>
      { loading ? <Loader /> 
        : error ? <Message variant='danger'>{error}</Message>
        : (<Row>
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
                                        <Form.Control as="select"
                                                      variant="info"
                                                      value={qty}
                                                      onChange={(e) => setQty(e.target.value)}>
                                                      {[...Array(product.countInStock).keys()].map(el => (
                                                        <option key={el+1} 
                                                                value={el+1}
                                                                variant="info">{el+1}</option>
                                                      ))}
                                        </Form.Control>
                                      </Row>
                                    </ListGroup.Item>) }
                  

                  <ListGroup.Item>
                    <Button className="btn-dark btn-block" 
                            type="button"
                            disabled={!(product.countInStock > 0)}>Add to cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>)
      }
    </>
  )
}

export default ProductScreen