const pg = require('pg');

const filename = 'medData.csv';
const table = 'review';

const elapsedTime = (t0, t1) =>{
  let seconds = (t1 - t0) / 1000;
  const hours = parseInt(seconds / 3600, 10);
  seconds %= 3600;
  const minutes = parseInt(seconds / 60, 10);
  seconds %= 60;
  console.log(`${hours}H, ${minutes}M, ${seconds}S`);
};
const t0 = Date.now();
console.log(new Date());
let t1;
let t2;

const pool = new pg.Pool({
  user: 'zach',
  host: 'localhost',
  database: 'sdc',
  port: '5432',
});

pool
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.log(err));

pool.query(`CREATE TABLE IF NOT EXISTS review
  (
    listing INTEGER,
    "user" INTEGER,
    created_at timestamp with time zone,
    text text,
    overall_rating smallint,
    accuracy_rating smallint,
    communication_rating smallint,
    cleanliness_rating smallint,
    location_rating smallint,
    check_in_rating smallint,
    value_rating smallint,
    has_response boolean,
    host INTEGER,
    response_text text,
    response_created_at timestamp with time zone
  )`).then(() => {
  console.log('table created');
  return pool.query(`COPY review FROM '${__dirname}/${filename}' DELIMITER ',' CSV HEADER`);
}).then(() => {
  t1 = Date.now();
  console.log('database seeded');
  elapsedTime(t0, t1);
  return pool.query(`ALTER TABLE ${table} ADD COLUMN id SERIAL PRIMARY KEY`);
}).then(() => {
  t2 = Date.now();
  console.log('added primary key');
  elapsedTime(t1, t2);
})
  .catch(err => console.log(err));
