const pg = require('pg');
const fs = require('fs');

const elapsedTime = (t0, t1) => {
  let seconds = (t1 - t0) / 1000;
  return seconds;
};

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

const testListingQuery = (startingId, num) => {
  const times = [];

  for (let i = 0; i < num; i += 1) {
    const listingId = startingId - i;
    const query = `select * from review where listing_id = ${listingId};`;
    let t1;
    const t0 = Date.now();
    pool.query(query)
      .then((data) => {
        t1 = Date.now();
        times.push({
          time: elapsedTime(t0, t1),
          entries: data.rowCount,
        });
      });
  }
  // setTimeout(() => console.log(times), 2000);
  return times;
};


let test = testListingQuery(1000000, 50);

setTimeout(() => {
  console.log(test);
  let time = 0;
  let quantity = 0;
  test.forEach((val) => {
    time += val.time;
    quantity += val.entries;
  });

  const avgTime = time / test.length;
  const avgSize = quantity / test.length;
  console.log('AvgTime: ', avgTime);
  console.log('AvgSize: ', avgSize);
  console.log('AvgTime/AvgSize: ', avgTime / avgSize);
}, 3000);

// const writeAsCSV = (data, fileName, cb) => {
//   // console.log(data);
//   let csv = 'listingId,queryTime,rows\n';
//   for (let id in data) {
//     csv = csv.concat(`${id},${data[id].time},${data[id].entries}\n`);
//   }
//   // console.log(csv);
//   fs.writeFile(fileName, csv, cb);
// }

// setTimeout(() => {
//   writeAsCSV(test, 'postgresTestData.csv', () => console.log('done'));
// }, 5000);
