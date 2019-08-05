const pg = require('pg');

const pool = new pg.Pool({
  user: 'zach',
  host: 'localhost',
  database: 'sdc',
  port: '5432',
});

pool.connect()
  .then(() => console.log('connected'))
  .catch(err => console.log(err));

module.exports = pool;
