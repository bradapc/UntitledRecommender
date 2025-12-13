const handleLogout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        path: '/'
    })
    return res.status(200).json({"message": "User logout successful"})
};

module.exports = {handleLogout};