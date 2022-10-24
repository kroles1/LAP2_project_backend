const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

router.get('/', userController.index) // for loging in
router.get('/:id', userController.getById) // for interaction
router.patch('/:id', userController.edit) // when user want to edit profil / exp - level updates

module.exports = router
