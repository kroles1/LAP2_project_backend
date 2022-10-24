const { init } = require('../dbConfig/init')

class Habit {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email; //??
        this.difficulty = data.difficulty;
        this.frequency = data.frequency;
        this.number_of_rep = data.number_of_rep;
        this.completed = data.completed;
        this.last_completed = data.last_completed;
        this.streak = data.streak;
    }

    static get all () {
        return new Promise (async (res, rej) => {
            try {
                const db = await init() // depends what taher called this function
                const habitData = await db.query('SELECT * FROM habits;')
                const habits = habitData.rows.map( u => new Habit(u))
                if(!habits.length) throw new Error ('No Users to get')
                res(habits)
            } catch (err) {
                rej(`Error retrieving users: ${err.message}`)
            }
        })
    }

    static getById (id) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init() // depends what taher called this function
                const habitData = await db.query(`SELECT * FROM habits WHERE id = $1;`, [id])
                let habit = new Habit(habitData.rows[0])
                res(habit)
            } catch (err) {
                rej(`Error retrieving user: ${err.message}`)
            }
        })
    }

    static create (habitData) {
        return new Promise (async (res, rej) => {
            try {       
                const db = await init() // depends what taher called this function
                const {name, email, password, difficulty, frequency, number_of_rep, completed, last_completed, streak} = habitData
                const habit = await db.query("INSERT INTO users (name, email, password, difficulty, frequency, number_of_rep, completed, last_completed, streak) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [name, email, password, difficulty, frequency, number_of_rep, completed, last_completed, streak])
                res(habit)
            } catch (err) {
                rej(err.message)
            }
        })
    }

    edit (data) {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedHabitData = await db.query(`UPDATE users SET name = $1, difficulty = $2, frequency = $3, number_of_rep = $4 WHERE id = $5  RETURNING *;`, [ data.name, data.difficulty, data.frequency, data.number_of_rep, this.id ]);
                let updatedHabit = new Habit(updatedHabitData.rows[0]);
                resolve (updatedHabit);
            } catch (err) {
                reject('Error updating user');
            }
        });
    }

    update () {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedHabitData = await db.query(`UPDATE users SET  WHERE id = $1  RETURNING *;`, [this.id ]);
                let updatedHabit = new Habit(updatedHabitData.rows[0]);
                resolve (updatedHabit);
            } catch (err) {
                reject('Error updating user');
            }
        });
    }

    destroy(){
        return new Promise( async (res, rej) => {
            try {
                const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING user_id', [ this.id ]);
                res('Book was deleted')
            } catch (err) {
                rej('Book could not be deleted')
            }
        })
    };
}
