import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'

const CarouselProducts = () => {
  const productTopRated = useSelector(state => state.productTopRated)
  const { loading, products, error } = productTopRated

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return(
    <>
    { error && <Message variant='danger'>{error}</Message>}
    { 
      loading ? <Loader /> 
      : <Carousel pause='hover' className='bg-dark'>
        { products.map(p => (
          <Carousel.Item key={p._id}>
            <Link to={`/products/${p._id}`}>
              <Image src={p.image} alt={p.name} fluid/>
              <Carousel.Caption className='carousel-caption'>
                <h2>{p.name} (${p.price})</h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
          )) }
      </Carousel>
    }
    </>
  )
}

export default CarouselProducts