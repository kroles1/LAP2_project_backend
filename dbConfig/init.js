const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// const pool = new Pool(
//     {
//         user: 'postgres',
//         host: 'localhost',
//         database: 'api',
//         password: 'password',
//         port: 5432,
//       }
// );

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Data base successfully connected!');
});
// module.exports = pool;

module.exports = {
  query: (text, params) => pool.query(text, params),
};
