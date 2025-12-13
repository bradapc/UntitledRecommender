const handleLogout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/'
    })
    return res.status(200).json({"message": "User logout successful"})
};

module.exports = {handleLogout};