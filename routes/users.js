const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

router.get('/', userController.index) // for loging in
router.get('/:id', userController.getById) // for interaction
router.post('/', userController.create) // when registering new user
router.patch('/:id', userController.edit) // when user want to edit profil / exp - level updates
// router.delete('/:id', userController.delete) // delete user - probably wont use this one

module.exports = router
