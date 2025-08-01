import './css/Cast.css';
import { useParams } from "react-router-dom"
import useCastMember from './hooks/useCastMember';
import CastMovieMini from './CastMovieMini';

const Cast = () => {
    const params = useParams();
    const {castInfo, error, loading} = useCastMember(params.id);
    const gender = {
        0: "Not Specified",
        1: "Female",
        2: "Male",
        3: "Other"
    };

  return (
    <div className="CastPage">
        {loading && <span>Loading...</span>}
        {error && !loading && <span style={{color: "red"}}>{`${error}`}</span>}
        {castInfo && !loading && (
            <div className="CastMainWrapper">
                <div className="MainCastInfoWrapper">
                    <div className="CastImageWrapper">
                        <img src={`https://image.tmdb.org/t/p/w185/${castInfo.profile_path}`}
                        className="CastImageLarge"
                        alt="Cast"></img>
                    </div>
                    <div className="CastTextWrapper">
                        <h1 className="actor-name">{castInfo.name}</h1>
                        <p className="actor-infop">DOB: {castInfo.birthday.split('T')[0]}</p>
                        <p className="actor-infop">{gender[castInfo.gender]}</p>
                        <p className="actor-infop">Born: {castInfo.place_of_birth}</p>
                        <div className="MoviesActedIn">
                            {castInfo.movies.map(movie => (
                                <CastMovieMini movie={movie} key={movie.movie_id} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="CastBioWrapper">
                    <p className="actor-infop actor-biography">{castInfo.biography}</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default Cast
