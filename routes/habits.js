const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habits')
const authN = require('../middleware/authN')

// get all habits for the user
router.get('/', authN, habitController.index) 
// used when user interacts with habit
router.get('/:id', authN, habitController.getById) 
// create new habit
router.post('/', authN, habitController.create) 
// update habit with completed status
router.patch('/:id', authN, habitController.updateCompletedStatus) 
// this router with put method
router.put('/:id', authN, habitController.edit)   
// delete habit
router.delete('/:id', authN, habitController.destroy) 

module.exports = router
