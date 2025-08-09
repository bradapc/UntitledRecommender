const searchAPI = require('./searchAPI');

const addMovieCast = async (id, client) => {
    try {
        const castAPICall = await searchAPI.searchCastByID(id);
        const castResult = castAPICall.cast;
        for (let castMember of castResult) {
            await client.query('INSERT INTO movie_cast (id, name, profile_path, gender) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING', [castMember.id, castMember.name, castMember.profile_path, castMember.gender]);
            await client.query('INSERT INTO casted_in (movie_id, cast_id, character, billing_order) VALUES ($1, $2, $3, $4) ON CONFLICT (movie_id, cast_id) DO NOTHING',
                [id, castMember.id, castMember.character, castMember.order]
            );
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {addMovieCast};