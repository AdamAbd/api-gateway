const express = require('express');
const router = express.Router();

const coursesHandler = require('./handler/courses');

const verifyToken = require('../middlewares/verifyToken');
const permissionTo = require('../middlewares/permission');

router.get('/', coursesHandler.getAll);
router.get('/:id', coursesHandler.get);
router.post('/', verifyToken, permissionTo('admin'), coursesHandler.create);
router.put('/:id', verifyToken, permissionTo('admin'), coursesHandler.update);
router.delete('/:id', verifyToken, permissionTo('admin'), coursesHandler.destroy);

module.exports = router;