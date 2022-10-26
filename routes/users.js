const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

router.get('/', userController.index)
router.get('/:id', userController.getById)

module.exports = router
