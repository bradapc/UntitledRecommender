import MovieCarousel from "./MovieCarousel"
import { PopularContext } from "./context/PopularContext"

const Popular = () => {
  return (
    <div>
        <MovieCarousel movieContext={PopularContext}/>
    </div>
  )
}

export default Popular
