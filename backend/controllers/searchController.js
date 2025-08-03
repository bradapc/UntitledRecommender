require('dotenv').config();
const searchAPI = require('../services/searchAPI');
const db = require('../db');
const {cacheMovie} = require('../services/cacheMovie');
const {limiter} = require('../services/apiLimiter');

const handleSearch = async (req, res) => {
    try {
        if (!req || (!req.query.title && !req.query.id)) {
            return res.status(400).json({"message": "Error: You must supply an id or a title"});
        }

        if (req.query.id) {
            const movieIdQuery = await db.query('SELECT * FROM movie WHERE id = $1', [req.query.id]);
            if (movieIdQuery.rowCount > 0) {
                const genresResult = await db.query('SELECT genre_id FROM movie_genre WHERE movie_id = $1', [req.query.id]);
                const movie = {...movieIdQuery.rows[0], genres: genresResult.rows.map(g => {
                    return {id: g.genre_id};
                })};
                return res.status(200).json({movieResult: movie});
            }
            const movieResult = await searchAPI.searchById(req.query.id);
            cacheMovie(movieResult);
            return res.status(200).json({movieResult});
        } else if (req.query.title) {
            const movieResult = await searchAPI.searchByTitle(req.query.title);
            return res.status(200).json({movieResult})
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({"error": "Internal server error"})
    }
};

const handleGetCast = async (req, res) => {
    if (!req || !req.params.id) {
        return res.status(400).json({"message": "Error: You must supply a movie id to get cast"});
    }
    try {
        const castDbQuery = await db.query('SELECT * FROM movie_cast JOIN casted_in ON movie_cast.id=casted_in.cast_id WHERE movie_id = $1 ORDER BY billing_order', [req.params.id]);
        if (castDbQuery.rowCount > 0) {
            return res.status(200).json(castDbQuery.rows);
        }
        const castResult = await searchAPI.searchCastByID(req.params.id);
        return res.status(200).json(castResult.cast);
    } catch (err) {
        console.error(err);
        return res.status(500).json({"error": "Internal server error"});
    }
};

const handleGetPerson = async (req, res) => {
    const {cast_id} = req.params;
    if (!cast_id) {
        return res.status(400).json({"message": "Error: You must supply a cast member id to get person info"})
    }
    try {
        const personDbQuery = await db.query(`SELECT movie_cast.*, ARRAY_AGG(JSON_BUILD_OBJECT
            ('movie_id', casted_in.movie_id, 
            'character', casted_in.character, 
            'billing_order', casted_in.billing_order,
            'title', movie.title,
            'poster_path', movie.poster_path,
            'release_date', movie.release_date,
            'overview', movie.overview,
            'budget', movie.budget,
            'runtime', movie.runtime,
            'revenue', movie.revenue
            ) ORDER BY movie.revenue DESC
             ) AS movies FROM movie_cast LEFT JOIN casted_in ON movie_cast.id=casted_in.cast_id
              LEFT JOIN movie ON casted_in.movie_id=movie.id WHERE movie_cast.id = $1 GROUP BY movie_cast.id`, [cast_id]);
        if (personDbQuery.rowCount > 0) {
            const person = personDbQuery.rows[0];
            if (person.biography === null) {
                const updatedPersonFetch = await limiter.schedule(() => searchAPI.searchPersonById(cast_id));
                if (updatedPersonFetch.biography !== null) {
                    await db.query("UPDATE movie_cast SET biography = $1, imdb_id = $2, place_of_birth = $3, birthday = $4 WHERE id = $5", [updatedPersonFetch.biography, updatedPersonFetch.imdb_id, updatedPersonFetch.place_of_birth, updatedPersonFetch.birthday, cast_id]);
                    person.biography = updatedPersonFetch.biography;
                    person.imdb_id = updatedPersonFetch.imdb_id;
                    person.place_of_birth = updatedPersonFetch.place_of_birth;
                    person.birthday = updatedPersonFetch.birthday;
                }
            }
            if (person.movies.length < 10) {
                const castedInResult = await getCastedInResult(cast_id);
                cacheCastedIn(castedInResult, cast_id);
                person.movies = castedInResult?.cast;
                person.movies = renameIdToMovieId(person);
                return res.status(200).json({personResult: person});
            }
            return res.status(200).json({personResult: person});
        }
        const personResult = await limiter.schedule(() => searchAPI.searchPersonById(cast_id));
        if (personResult.success != undefined && personResult.success === false) {
            throw new Error("Error: Invalid cast id entered on handleGetPerson call in search");
        }
        await db.query("INSERT INTO movie_cast VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO NOTHING", [personResult.id, personResult.name, personResult.profile_path, personResult.gender, personResult.biography, personResult.imdb_id, personResult.place_of_birth, personResult.birthday]);
        const castedInResult = await getCastedInResult(cast_id);
        cacheCastedIn(castedInResult, cast_id);
        personResult.movies = await castedInResult?.cast;
        personResult.movies = renameIdToMovieId(personResult);
        console.log(personResult.movies);
        return res.status(200).json({personResult});
    } catch (err) {
        console.error(err);
        return res.status(500).json({"error": "Internal server error"})
    }
};

const renameIdToMovieId = (personResult) => {
    const newMovies = personResult.movies.map(movie => {
            const newMovie = {...movie, movie_id: movie.id};
            delete newMovie.id;
            return newMovie;
        })
    return newMovies;
};

const getCastedInResult = async (cast_id) => {
    const res = await limiter.schedule(() => searchAPI.searchCastedInByCastId(cast_id));
    return res;
};

const cacheCastedIn = async (castedInResult, cast_id) => {
    if (!castedInResult) return;
    try {
        if (!castedInResult.cast || !Array.isArray(castedInResult.cast)) {
            console.error("Invalid castedInResult.cast array");
            return;
        }
        for (const entry of castedInResult.cast) {
            const movieResult = await limiter.schedule(() => searchAPI.searchById(entry.id));
            const success = await cacheMovie(movieResult);
            if (success) {
                await db.query("INSERT INTO casted_in (movie_id, cast_id, character, billing_order) VALUES ($1, $2, $3, $4) ON CONFLICT (movie_id, cast_id) DO NOTHING", [entry.id, cast_id, entry.character, entry.order]);
            }
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {handleSearch, handleGetCast, handleGetPerson}