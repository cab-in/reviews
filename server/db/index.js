const pg = require('pg');
const password = require('./authentication.js')

const pool = new pg.Pool({
  user: 'postgres',
  host: '54.196.73.233',
  password,
  database: 'sdc',
  port: '5432',
});

pool.connect()
  .then(() => console.log('connected'))
  .catch(err => console.log(err));

module.exports = pool;
