const { init } = require('./initdb')

class User {
    constructor(data) {
        this.id = data.id
        this.username = data.user_name
        this.email = data.email
        this.password = data.user_password
        this.level = data.level
        this.exp = data.exp
    }

    static get all () {
        return new Promise (async (res, rej) => {
            try {
                const db = await init() // depends what taher called this function
                const userData = await db.query('SELECT * FROM users;')
                const users = userData.rows.map( u => new User(u))
                if(!users.length) throw new Error ('No Users to get')
                res(users)
            } catch (err) {
                rej(`Error retrieving users: ${err.message}`)
            }
        })
    }

    static getById (id) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init() // depends what taher called this function
                const userData = await db.query(`SELECT * FROM users WHERE id = $1;`, [id])
                let user = new User(userData.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err.message}`)
            }
        })
    }

    static create (userData) {
        return new Promise (async (res, rej) => {
            try {       
                const db = await init() // depends what taher called this function
                const {username, email, password, level, exp} = userData
                const user = await db.query("INSERT INTO users (username, email, password, level, exp) VALUES ($1, $2, $3, $4, $5);", [username, email, password, level, exp])
                res(user)
            } catch (err) {
                rej(err.message)
            }
        })
    }

    // edit (increase, levelUp) {
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             let updatedUserData = await db.query(`UPDATE users SET exp = exp + $1 CASE WHEN $2 THEN level = level + 1 WHERE id = $3  RETURNING *;`, [ increase, levelUp, this.id ]);
                
    //             let updatedUser = new User(updatedUserData.rows[0]);
    //             resolve (updatedUser);
    //         } catch (err) {
    //             reject('Error updating user');
    //         }
    //     });
    // }

}

module.exports = User
