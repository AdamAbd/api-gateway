const express = require('express');
const router = express.Router();

const chaptersHandler = require('./handler/chapters');

const verifyToken = require('../middlewares/verifyToken');

router.get('/', chaptersHandler.getAll);
router.get('/:id', chaptersHandler.get);
router.post('/', verifyToken, chaptersHandler.create);
router.put('/:id', verifyToken, chaptersHandler.update);
router.delete('/:id', verifyToken, chaptersHandler.destroy);

module.exports = router;