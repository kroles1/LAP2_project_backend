const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habits')
const authN = require('../middleware/authN')

router.get('/', authN, habitController.index) // get all habits for the user
router.get('/:id', authN, habitController.getById) // used when user interacts with habit
router.post('/', authN ,habitController.create) // create new habit
router.patch('/:id', habitController.edit) // edit existing habit
router.delete('/:id', habitController.destroy) // delete habit

module.exports = router
