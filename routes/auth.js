const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.post('/', authController.register) // registration
router.get('/:id', authController.login) // login


module.exports = router