const Habit = require("../Models/Habit");

async function index(req, res) {
  try {
    const habits = await Habit.all;
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function getById(req, res) {
  try {
    const habit = await Habit.getById(+req.params.id);
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function create(req, res) {
  try {
    const habitData = {
      ...req.body,
      user_id: req.currentUser.id,
    };
    const habit = await Habit.create(habitData);
    res.status(201).json(habit);
  } catch (err) {
    res.status(422).json({ err });
  }
}

async function updateCompletedStatus(req, res) {
  // interacting with + button
  try {
    const habitToMarkAsCompleted = await Habit.getById(+req.params.id)
    let habit = await habitToMarkAsCompleted.update();
    habit = {...habit, last_completed: habit.last_completed.toLocaleDateString()}
    res.status(200).json(habit)
  } catch (err) {
    res.status(422).json({ err });
  }
}

async function edit(req, res) {
  try {
    console.log("hitting update habit route");
    const newHabitData = req.body;
    console.log(newHabitData);
    // get the id for habit
    const habitId = +req.params.id;
    console.log(habitId);
    // find the habit
    const habitToBeUpdated = await Habit.getById(habitId);
    console.log(`Object to be updated:\n`);
    console.log(habitToBeUpdated);
    const updatedHabit = await habitToBeUpdated.edit(newHabitData);
    res.status(200).json(updatedHabit);
  } catch (err) {
    console.log(err);
  }
}

async function destroy(req, res) {
  try {
    console.log("hitting delete habit route:");
    const habit = await Habit.getById(req.params.id);
    console.log(habit);
    const deltedHabit = await habit.destroy();
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(404).json({ err });
  }
}

module.exports = { index, create, getById, updateCompletedStatus, edit, destroy };
