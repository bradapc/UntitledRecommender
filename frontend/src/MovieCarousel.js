import {useContext} from 'react';

const MovieCarousel = ({movieContext}) => {
  const {currentMovie, handleScrollBack, handleScrollForward} = useContext(movieContext);

  return (
    <div className="MovieCarousel">
        <button className="carousel-arrow carousel-arrow--prev"
        onClick={handleScrollBack}>&#8249;</button>
        {currentMovie}
        <button className="carousel-arrow carousel-arrow--next"
        onClick={handleScrollForward}>&#8250;</button>
    </div>
  )
}

export default MovieCarousel
