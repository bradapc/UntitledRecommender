const db = require('../db');
const searchAPI = require('./searchAPI');

const addMovieCast = async (id) => {
    try {
        const castAPICall = await searchAPI.searchCastByID(id);
        const castResult = await castAPICall.cast;
        for (let castMember of castResult) {
            await db.query('INSERT INTO movie_cast (id, name, profile_path, gender) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING', [castMember.id, castMember.name, castMember.profile_path, castMember.gender]);
            await db.query('INSERT INTO casted_in (movie_id, cast_id, character, billing_order) VALUES ($1, $2, $3, $4) ON CONFLICT (movie_id, cast_id) DO NOTHING',
                [id, castMember.id, castMember.character, castMember.order]
            );
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {addMovieCast};