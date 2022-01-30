const express = require('express');
const router = express.Router();

const ordersHandler = require('./handler/orders');

router.get('/', ordersHandler.getAll);

module.exports = router;