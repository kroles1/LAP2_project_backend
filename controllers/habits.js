const Habit = require('../Models/Habit')


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
        const habitData = {
            ...req.body,
            user_id: req.currentUser.id
        }
        const habit = await Habit.create(habitData)
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
        console.log("hitting delete habit route:");
        const habit = await Habit.getById(req.params.id);
        console.log(habit);
        const deltedHabit = await habit.destroy()
        res.status(204).end()
    } catch (err) {
        console.log(err);
        res.status(404).json({err})
    }
}

module.exports = {index, create, getById,update, edit, destroy}
