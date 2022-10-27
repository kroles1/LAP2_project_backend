const db = require("../dbConfig/init.js");
const User = require("./User.js");

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
    this.current_rep = data.current_rep;
    this.task_start_day = data.task_start_day
    this.user_id = data.user_id;
  }

  static all(user_id) {
    return new Promise(async (res, rej) => {
      try {
        const habitData = await db.query("SELECT * FROM habits WHERE user_id = $1;", [user_id]);
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
        reject(`Error editing habit: ${err}`);
      }
    });
  }

  update() {
    return new Promise(async (resolve, reject) => {
      try {
        const freq = this.frequency
        let currentDate = new Date().toLocaleDateString()
        let last_completed = this.last_completed
        let updatedHabitData
        let difficulty = this.difficulty
        let xp 
        if(currentDate > task_start_day) {
          await db.query(
            `UPDATE habits SET completed = FALSE WHERE id = $1  RETURNING *;`,
            [this.id]
          )
        }
        async function updateStatus(habitId, userId) {
          let habitToBeUpdated = await  Habit.getById(habitId)
          
          habitToBeUpdated = await  Habit.getById(habitId)
          if(habitToBeUpdated.current_rep === habitToBeUpdated.number_of_rep) {
            await db.query(
              `UPDATE habits SET current_rep = 0, streak = streak + 1, completed = TRUE, last_completed = CURRENT_DATE, task_start_day = CURRENT_DATE + 1  WHERE id = $1  RETURNING *;`,
              [habitId]
            );
            const userToUpdateData = await User.getById(userId)
            if(difficulty == 'easy')
              xp = 10;
              if(difficulty == 'medium')
              xp = 20;
              if(difficulty == 'hard')
              xp = 30;
              await userToUpdateData.updateLevelExp(xp)
          }
        }
        switch(freq) {
          case 'd': {
            if(!last_completed) {
              await updateStatus(this.id, this.user_id)
            } else {
              const today = currentDate.split('/')[0]
              let lastDay = last_completed.toLocaleDateString().split('/')[0]
              if(today == 1 && (lastDay == 30 || lastDay == 28 || lastDay == 31 || lastDay == 29))
                lastDay = 0
              if(today - lastDay == 1) {
                await updateStatus(this.id, this.user_id)
              }
              else {
                await db.query(
                  `UPDATE habits SET current_rep = 1, streak = 0, task_start_day = CURRENT_DATE  WHERE id = $1  RETURNING *;`,
                  [this.id]
                )
              }
            }
            break;
          }
          case 'w' : {
            if(!last_completed) {
              await updateStatus(this.id, this.user_id)
            } else {
              const today = currentDate.split('/')[0]
              let taskStartDay = this.task_start_day.toLocaleDateString().split('/')[0]
              if(today - taskStartDay <= 7) 
                await updateStatus(this.id, this.user_id) 
              else {
                await db.query(
                  `UPDATE habits SET current_rep = 1, streak = 0, task_start_day = CURRENT_DATE  WHERE id = $1  RETURNING *;`,
                  [this.id]
                )
              }
            }
            break;
          }
          case 'm': {
            if(!last_completed) {
              await updateStatus(this.id, this.user_id)
            } else {
              const today = currentDate.split('/')[1]
              let lastDay = last_completed.toLocaleDateString().split('/')[1]
              if(today == 1 && lastDay == 12)
                lastDay = 0
              if(today - lastDay == 1) 
                await updateStatus(this.id, this.user_id) 
              else {
                await db.query(
                  `UPDATE habits SET current_rep = 1, streak = 0, task_start_day = CURRENT_DATE  WHERE id = $1  RETURNING *;`,
                  [this.id]
                )
              }
            }
            break;
          }
          default : {
            break;
          }
        }
        updatedHabitData = await Habit.getById(this.id)
        resolve(new Habit(updatedHabitData));
      } catch (err) {
        console.log(err);
        reject(`Error updating completed-status for a habit habit: ${err}`);
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
