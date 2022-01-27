const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = async(req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, JWT_SECRET, function(err, decode) {
        if (err) {
            return res.status(403).json({ status: 403, message: err.message });
        }

        req.user = decode;

        return next();
    });
}