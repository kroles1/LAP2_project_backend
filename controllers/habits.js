const Habit = require("../models/Habit");

async function index(req, res) {
  try {
    const payload = req.currentUser
    const habits = await Habit.all(payload.id);
    res.status(200).json(habits);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

async function getById(req, res) {
  try {
    const habit = await Habit.getById(+req.params.id);
    res.status(200).json(habit);
  } catch (err) {
    console.log("error get habit by id", err);
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
    console.log("error create a habit", err);
    res.status(422).json({ err });
  }
}

async function updateCompletedStatus(req, res) {
  try {
    const habitToMarkAsCompleted = await Habit.getById(+req.params.id);
    let habit = await habitToMarkAsCompleted.update();
    habit = {
      ...habit,
      task_start_day: habit.task_start_day.toLocaleDateString(),
    }
    if (habit.last_completed)
      habit = {
        ...habit,
        last_completed: habit.last_completed.toLocaleDateString(),
      };

    res.status(200).json(habit);
  } catch (err) {
    console.log("error from controllers", err);
    res.status(422).json({ err });
  }
}

async function edit(req, res) {
  try {
    const newHabitData = req.body;
    const habitId = +req.params.id;
    const habitToBeUpdated = await Habit.getById(habitId);
    const updatedHabit = await habitToBeUpdated.edit(newHabitData);
    res.status(200).json(updatedHabit);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message)
  }
}

async function destroy(req, res) {
  try {
    const habit = await Habit.getById(req.params.id);
    const deltedHabit = await habit.destroy();
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(404).json({ err });
  }
}

module.exports = {
  index,
  create,
  getById,
  updateCompletedStatus,
  edit,
  destroy,
};
