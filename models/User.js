const db = require('../dbConfig/init.js')

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
                console.log('getting data from database')
                // console.log(await db.query('SELECT * FROM users;'))
                const userData = await db.query('SELECT * FROM users;')
                const users = userData.rows.map( u => new User(u))
                if(!users.length) throw new Error ('No users registerd to get')
                res(users)
            } catch (err) {
                rej(err)
            }
        })
    }

    static getById (id) {
        return new Promise (async (res, rej) => {
            try {
                const userData = await db.query(`SELECT * FROM users WHERE id = $1;`, [id])
                if(!userData.rows.length) throw new Error('No user at this entry')
                let user = new User(userData.rows[0])
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

    static findByEmail(email){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM users
                                                WHERE email = $1;`, [email]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err.message}`)
            }
        })
    }


    static create (userData) {
        return new Promise (async (res, rej) => {
            try {       
                console.log("create a new user funtion");
                // to register we need username, password, email and the rest of data will be setup as default values
                const {username, email, password} = userData
                // there is a bug, the next query not working
                // existedUser = await db.query(`SELECT * FROM users WHERE user_name = $1;`, [username])
                // console.log(existedUser.rows[0]);
                // if(existedUser.rows.length) throw new Error('User name already in use')
                const user = await db.query("INSERT INTO users (user_name, email, user_password) VALUES ($1, $2, $3);", [username, email, password])
                res(user)
            } catch (err) {
                console.log(err);
                rej(err.message)
            }
        })
    }

    updateLevelExp(xp) {
        // here a function to increase the xp and level
        // it will recive from habit when completed and then add this amount
        // will be added to user exp profile
        // if exp reach a certain limit "100 for example" then level up
        return new Promise(async (resolve, reject) => {
            try{
                console.log("update xp function");
                console.log(this.id);
                console.log(this);
                await db.query(`UPDATE users SET exp = exp + $1 WHERE id = $2;`, [xp,this.id])
                const userXp = await db.query(`SELECT exp FROM users WhERE id = $1;`, [this.id])
                console.log("userXp = ",userXp.rows[0].exp);
                // needs to write a condition to upgrade level every time gain 100exp
                if(userXp.rows[0].exp%100 === 0) {
                    await db.query(`UPDATE users SET level = level + 1 WHERE id = $1;`, [this.id])
                }
                resolve('user xp updated')
            }catch(err){
                console.log(err);
                reject(err)
            }
        })
    }
}

module.exports = User
