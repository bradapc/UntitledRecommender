const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY_TMDB}`
    }
}

module.exports = options;