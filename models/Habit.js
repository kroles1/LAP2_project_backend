const db = require("../dbConfig/init.js");

class Habit {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.difficulty = data.difficulty;
    this.frequency = data.frequency;
    this.number_of_rep = data.number_of_rep;
    this.completed = data.completed;
    this.last_completed = data.last_completed;
    this.streak = data.streak;
    this.user_id = data.user_id;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const habitData = await db.query("SELECT * FROM habits;");
        const habits = habitData.rows.map((u) => new Habit(u));
        if (!habits.length) throw new Error("No Habits to get");
        res(habits);
      } catch (err) {
        rej(`${err.message}`);
      }
    });
  }

  static getById(id) {
    return new Promise(async (res, rej) => {
      try {
        const habitData = await db.query(
          `SELECT * FROM habits WHERE id = $1;`,
          [id]
        );
        if (!habitData.rows[0]) throw Error("Habit not found");
        let habit = new Habit(habitData.rows[0]);
        res(habit);
      } catch (err) {
        console.log(err);
        rej(`Error retrieving habit: ${err.message}`);
      }
    });
  }

  static create(habitData) {
    return new Promise(async (res, rej) => {
      try {
        const { name, difficulty, frequency, number_of_rep, user_id } =
          habitData;
        const habit = await db.query(
          `INSERT INTO habits (name, difficulty, frequency, number_of_rep, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
          [name, difficulty, frequency, number_of_rep, user_id]
        );
        res(new Habit(habit.rows[0]));
      } catch (err) {
        console.log(err);
        rej(err.message);
      }
    });
  }

  edit(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, difficulty, frequency, number_of_rep } = data;
        let updatedHabitData = await db.query(
          `UPDATE habits SET name = $1, difficulty = $2, frequency = $3, number_of_rep = $4 WHERE id = $5  RETURNING *;`,
          [name, difficulty, frequency, number_of_rep, this.id]
        );
        let updatedHabit = new Habit(updatedHabitData.rows[0]);
        resolve(updatedHabit);
      } catch (err) {
        console.log(err);
        reject("Error editing habit");
      }
    });
  }

  update() {
    return new Promise(async (resolve, reject) => {
      try {
        let updatedHabitData = await db.query(
          `UPDATE users SET level = level + 1 WHERE id = $1  RETURNING *;`,
          [this.id]
        );
        let updatedHabit = new Habit(updatedHabitData.rows[0]);
        resolve(updatedHabit);
      } catch (err) {
        reject("Error updating habit");
      }
    });
  }

  destroy() {
    return new Promise(async (res, rej) => {
      try {
        const result = await db.query(
          "DELETE FROM habits WHERE id = $1 RETURNING user_id;",
          [this.id]
        );
        res("habit was deleted");
      } catch (err) {
        console.log(err);
        rej("Habbit could not be deleted");
      }
    });
  }
}

module.exports = Habit;
