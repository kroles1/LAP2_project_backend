const Habit = require('../models/Habit')
const User = require('./users')

async function index (req, res) { // this will need to change as we want all habits with the user_id now just all habits
    try {
        const habits = await Habit.all
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).send({err})
    }
}

async function getById (req, res) {
    try {
        const habit = await Habit.getById(req.body.id)
        res.status(200).json(habit)
    } catch (err) {
        res.status(500).send({err})
    }
}

async function create (req, res) {
    try {
        const habit = await Habit.create(req.body)
        res.status(201).json(habit)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function update (req, res) { // interacting with + button
    try {
        const habit = await Habit.update()
    } catch (err) {
        
    }
}

async function edit (req, res) { // editing the habit
    try {

    } catch (err) {
        
    }
}

async function destroy (req, res) {
    try {
        const habit = Habit.getById(req.params.id);
        const resp = habit.destroy()
        res.status(204).end()
    } catch (err) {
        res.status(404).json({err})
    }
}

module.exports = {index, create, getById,update, edit, destroy}
