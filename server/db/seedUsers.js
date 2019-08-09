const pool = require('./index.js');

// testdb 54.196.73.233
// actualdb 3.86.43.121

const user = true;

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
    // return pool.query(`COPY ${tableName} FROM '${__dirname}/${tableName}.csv' DELIMITER ',' CSV HEADER`);
  })
  // .then((res) => {
  //   console.log(res);
  //   console.log(`${tableName} Inserted`);
  // })
  .catch(err => console.log(err));

// psql -h 3.86.43.121 -d sdc -U postgres -c "\copy users
//   (
//     user_id,
//     first_name,
//     last_name,
//     avatar
//   ) from '/Users/zachthomas/HR/SDC/review/server/db/users.csv' with delimiter as ',' NULL AS '' CSV HEADER;"

  // psql -h 3.86.43.121 -d sdc -U postgres -c "\copy hosts
  // (
  //   host_id,
  //   host_first_name,
  //   host_last_name,
  //   host_avatar
  // ) from '/Users/zachthomas/HR/SDC/review/server/db/hosts.csv' with delimiter as ',' NULL AS '' CSV HEADER;"