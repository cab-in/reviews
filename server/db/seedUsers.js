const pool = require('./index.js');

const user = false;

const userTable = `CREATE TABLE IF NOT EXISTS users
  ( 
    user_id INTEGER,
    first_name varchar(50),
    last_name varchar(50),
    avatar varchar(255),
    PRIMARY KEY (user_id)
  );`;

const hostTable = `CREATE TABLE IF NOT EXISTS hosts
  ( 
    host_id INTEGER,
    host_first_name varchar(50),
    host_last_name varchar(50),
    host_avatar varchar(255),
    PRIMARY KEY (host_id)
  );`;

const table = user ? userTable : hostTable;
const tableName = user ? 'users' : 'hosts';

pool.query(table)
  .then(() => {
    console.log('Table Created');
    return pool.query(`COPY ${tableName} FROM '${__dirname}/${tableName}.csv' DELIMITER ',' CSV HEADER`);
  }).then((res) => {
    console.log(res);
    console.log(`${tableName} Inserted`);
  })
  .catch(err => console.log(err));
