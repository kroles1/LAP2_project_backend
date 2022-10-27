const db = require("../dbConfig/init.js");

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.user_name;
    this.email = data.email;
    this.password = data.user_password;
    this.level = data.level;
    this.exp = data.exp;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const userData = await db.query("SELECT * FROM users;");
        const users = userData.rows.map((u) => new User(u));
        if (!users.length) throw new Error("No users registerd to get");
        res(users);
      } catch (err) {
        rej(err);
      }
    });
  }

  static getById(id) {
    return new Promise(async (res, rej) => {
      try {
        const userData = await db.query(`SELECT * FROM users WHERE id = $1;`, [
          id,
        ]);
        if (!userData.rows.length) throw new Error("No user at this entry");
        let user = new User(userData.rows[0]);
        res(user);
      } catch (err) {
        rej(err.message);
      }
    });
  }

  static findByEmail(email) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(`SELECT * FROM users WHERE email = $1;`,[email])
        if (!result.rows.length) throw new Error("No user registered with this email address");
        let user = new User(result.rows[0]);
        res(user);
      } catch (err) {
        rej(`Error retrieving user by email: ${err.message}`);
      }
    });
  }

  static findByUserName(username) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(
          `SELECT * FROM users WHERE user_name = $1;`,
          [username]
        );
        if(!result.rows[0]) throw new Error('no user registerd with this user name')
        let user = new User(result.rows[0]);
        res(user);
      } catch (err) {
        rej(`Error retrieving user by name: ${err}`);
      }
    });
  }

  static create(userData) {
    return new Promise(async (res, rej) => {
      try {
        const { username, email, password } = userData;
        const user = await db.query(
          "INSERT INTO users (user_name, email, user_password) VALUES ($1, $2, $3) RETURNING *;",
          [username, email, password]
        );
        if(!user.rows.length) throw new Error("error creating user")
        res(user);
      } catch (err) {
        console.log(err);
        rej(err.message);
      }
    });
  }

  updateLevelExp(xp) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.query(`UPDATE users SET exp = exp + $1 WHERE id = $2;`, [
          xp,
          this.id,
        ]);
        const userXp = await db.query(`SELECT exp FROM users WhERE id = $1;`, [
          this.id,
        ]);
        if (userXp.rows[0].exp > 100) {
          await db.query(
            `UPDATE users SET level = level + 1, exp = exp - 100 WHERE id = $1;`,
            [this.id]
          );
        }
        resolve("user xp updated");
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}

module.exports = User;
