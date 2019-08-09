const pg = require('pg');
const password = require('./authentication.js');

// testdb 54.196.73.233
// actualdb 3.86.43.121

const pool = new pg.Pool({
  user: 'postgres',
  host: '3.86.43.121',
  password,
  database: 'sdc',
  port: '5432',
});

pool.on('error', (err) => {
  console.error('An idle client has experienced an error', err.stack);
  // pool.connect();
});

// pool.on('remove' (err) => {
//   console.log('Removed from pool', err);
// })

// pool.connect()
//   .then(() => console.log('connected'))
//   .catch(err => console.log(err));

module.exports = pool;
