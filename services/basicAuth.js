function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401)
            return res.send("not allowed Guy!")
        }

        next()
    }
}

module.exports = { authRole }