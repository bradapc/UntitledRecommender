const handleLogout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        path: '/'
    })
    return res.status(200).json({"message": "User logout successful"})
};

module.exports = {handleLogout};