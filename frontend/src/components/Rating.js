import PropTypes from 'prop-types'


const Rating = ({ value, color, text, base }) => {
  const fullStars = Math.floor(value)
  const halfStar = value - fullStars
  const emptyStars = base-Math.floor(value)
  const range = !halfStar ? fullStars : fullStars-1
  let rating = [];
  for(let i=0; i<range; i++)
    rating.push(<span key={Date.now()+i}>
      <i style={{color}} className="fas fa-star"></i>
    </span>)

  if(halfStar)
    rating.push(<span key={Date.now()+10}>
      <i style={{color}} className="fas fa-star-half-alt"></i>
    </span>)

  for(let i=0; i<emptyStars; i++)
    rating.push(<span key={Date.now()+i+20}>
      <i style={{color}} className="far fa-star"></i>
    </span>)
  return(
    <div>
      {rating}
      <span>{text&&text}</span>
    </div>
  )
}
Rating.defaultProps = {
  color: "#f8e825",
  base: 5,
}

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  base: PropTypes.number,
}

// { [1, 2, 3, 4, 5].map(index => (          <i className={ (value >= index) ? 'fas fa-star' : ((value >= (index - 0.5)) ? 'fas fa-star-half-alt' : 'far fa-star')}></i>        )) }
export default Rating