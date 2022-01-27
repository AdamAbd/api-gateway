const express = require('express');
const router = express.Router();

const refreshTokensHandler = require('./handler/refresh-token');

router.post('/', refreshTokensHandler.refreshToken);

module.exports = router;