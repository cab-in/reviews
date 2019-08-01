const pg = require('pg');

const filename = 'fullData.csv';
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
let t3;

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
    review_id INTEGER,
    listing_id INTEGER,
    user_id INTEGER,
    created_at timestamp with time zone,
    text varchar(500),
    overall_rating smallint,
    accuracy_rating smallint,
    communication_rating smallint,
    cleanliness_rating smallint,
    location_rating smallint,
    check_in_rating smallint,
    value_rating smallint,
    has_response boolean,
    host_id INTEGER,
    response_text varchar(500),
    response_created_at timestamp with time zone,
    PRIMARY KEY (review_id)
  )`).then(() => {
  console.log('table created');
  return pool.query(`COPY ${table} FROM '${__dirname}/${filename}' DELIMITER ',' CSV HEADER`);
})
  .then(() => {
    t1 = Date.now();
    console.log('database seeded');
    elapsedTime(t0, t1);
    return pool.query(`CREATE INDEX listing_index ON ${table} (listing_id)`);
  })
  .then(() => {
    t2 = Date.now();
    console.log('added listing ID index');
    elapsedTime(t1, t2);
    return pool.query(`CREATE INDEX user_index ON ${table} (user_id)`);
  })
  .then(() => {
    t3 = Date.now();
    console.log('added listing ID index');
    elapsedTime(t2, t3);
    console.log('Done');
  })
  .catch(err => console.log(err));
