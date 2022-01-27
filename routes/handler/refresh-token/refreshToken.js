const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');

const {
    URL_SERVICE_USERS,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USERS);

module.exports = async(req, res) => {
    try {
        const refreshToken = req.body.refresh_token;
        const email = req.body.email;

        if (!refreshToken || !email) {
            return res.status(400).json({ status: 400, message: 'Invalid Token' });
        }

        await api.get('/refresh_tokens', { params: { refresh_token: refreshToken } });

        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: 403, message: err.message });
            }

            if (email !== decoded.data.email) {
                return res.status(400).json({ status: 400, message: 'Invalid Email' });
            }

            const token = jwt.sign({ data: decoded.data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });

            return res.json({ status: 200, message: 'Success', data: { token } });
        });
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 500, message: 'Service Unavailable' })
        }

        const { status, data } = error.response;

        return res.status(status).json(data);
    }
};