const cassandra = require('cassandra-driver');

const tableName = 'review_by_user';
const columnList = 'review_id,listing_id,user_id,created_at,text,overall_rating,accuracy_rating,communication_rating,cleanliness_rating,location_rating,check_in_rating,value_rating,has_response,host_id,response_text,response_created_at';
const fileName = 'fullData.csv';

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  port: '9042',
  localDataCenter: 'datacenter1',
  keyspace: 'sdc',
});

// client.connect()
//   .then(() => console.log('success'))
//   .catch(err => console.log(err));

const reviewByUser = `CREATE TABLE IF NOT EXISTS review_by_user (
  review_id int,
  listing_id int,
  user_id int,
  created_at timestamp,
  text varchar,
  overall_rating int,
  accuracy_rating int,
  communication_rating int,
  cleanliness_rating int,
  location_rating int,
  check_in_rating int,
  value_rating int,
  has_response boolean,
  host_id bigint,
  response_text varchar,
  response_created_at timestamp,
  PRIMARY KEY (user_id, created_at, review_id)
  );`;

const reviewByListing = `CREATE MATERIALIZED VIEW IF NOT EXISTS review_by_listing AS
  SELECT 
  review_id,
  listing_id,
  user_id,
  created_at,
  text,
  has_response,
  host_id,
  response_text,
  response_created_at
  FROM review_by_user
  WHERE user_id IS NOT NULL AND created_at IS NOT NULL AND review_id IS NOT NULL AND listing_id IS NOT NULL
  PRIMARY KEY (listing_id, created_at, user_id, review_id)
;`;

const copyQuery = `COPY ${tableName} (${columnList}) FROM '${__dirname}/${fileName}' WITH HEADER = true;`;

console.log(copyQuery);
client.execute(reviewByUser)
  .then(() => client.execute(reviewByListing))
  .then(res => console.log(res))
  .catch(err => console.log(err));

//  ./cassandra-loader -f ./review/server/db/medData.csv -host 127.0.0.1 -schema "sdc.review_by_user(review_id,listing_id,user_id,created_at,text,overall_rating,accuracy_rating,communication_rating,cleanliness_rating,location_rating,check_in_rating,value_rating,has_response,host_id,response_text,response_created_at)" -dateFormat "yyyy-mm-dd'T'HH:mm:ss'Z'"
