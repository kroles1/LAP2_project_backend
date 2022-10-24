const { Pool } = require("pg");

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
  connectionString: 'postgres://postgres:password@localhost:5432/postgres'
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});
// module.exports = pool;

module.exports = {
  query: (text, params) => pool.query(text, params),
};