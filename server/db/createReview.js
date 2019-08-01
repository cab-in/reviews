const faker = require('faker');
const stream = require('stream');
const fs = require('fs');

const test = false;
const numberOfListings = 1000000;
const outputFile = 'medData.csv';
const t0 = Date.now();
console.log(new Date());
let t1;
let count = 0;

const generateReviewCSV = (listingId) => {
  const random = faker.random.number({ min: 0, max: 100 });
  let reviewDate = faker.date.past().toISOString();
  reviewDate = reviewDate.slice(0, 19) + reviewDate.slice(23);
  let review = [];
  review.push(count);
  review.push(listingId);
  review.push(faker.finance.amount(201, 1000, 0)); //   userId: String,
  review.push(reviewDate); //   createdAt: Date,
  review.push(random % 5 === 0
    ? faker.lorem.paragraph().split(' ').slice(0, 55).join(' ') : faker.lorem.paragraph().split(' ').slice(0, 30).join(' ')); //   text: String,
  review.push(faker.finance.amount(1, 5, 0)); //   overallRating: Number,
  review.push(faker.finance.amount(1, 5, 0)); //   accuracyRating: Number,
  review.push(faker.finance.amount(1, 5, 0)); //   communicationRating: Number,
  review.push(faker.finance.amount(1, 5, 0)); //   cleanlinessRating: Number,
  review.push(faker.finance.amount(1, 5, 0)); //   locationRating: Number,
  review.push(faker.finance.amount(1, 5, 0)); //   checkInRating: Number,
  review.push(faker.finance.amount(1, 5, 0)); //   valueRating: Number,

  if (random % 3 === 0) {
    review.push(true); //   hasResponse: Boolean,
    review.push(faker.finance.amount(1, 200, 0)); //   hostId: String,
    review.push(faker.lorem.sentence()); //   responseText: String,
    let today = new Date();
    today = today.toISOString().slice(0, 10);
    let responseDate = faker.date.between(reviewDate.slice(0, 10), today).toISOString();
    responseDate = responseDate.slice(0, 19) + responseDate.slice(23);
    review.push(responseDate); //   responseCreatedAt: Date,
  } else {
    review.push(false);//   hasResponse: Boolean,
    review.push(null);
    review.push(null);
    review.push(null);
  }
  review = review.join(',');
  review += '\n';
  count += 1;
  return review;
};
// console.log(generateReviewCSV(1));

const generateListingReviews = (num, listingId) => {
  let string = '';
  for (let i = 0; i < num; i += 1) {
    string = string.concat(generateReviewCSV(listingId));
  }
  return string;
};
// console.log(generateListingReviews(10, 1));
const printProgress = (progress) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`${progress}%`);
};

const headerCSV = 'review_id,listing_id,user_id,created_at,text,overall_rating,accuracy_rating,communication_rating,cleanliness_rating,location_rating,check_in_rating,value_rating,has_response,host_id,response_text,response_created_at\n';

const generateData = (writeStream, encoding, num, cb) => {
  let listingId = num;
  const stellar = listingId - Math.ceil(num * 0.00005);
  const prettyDamnGood = listingId - Math.ceil(num * 0.005);
  const meh = listingId - Math.ceil(num * 0.05);
  let nextProgress = -1;
  const write = () => {
    let ok = true;
    while (listingId > 0 && ok) {
      let quantity = 1;
      if (listingId > stellar) {
        quantity = Math.floor(Math.random() * 1000) + 1000;
      } else if (listingId > prettyDamnGood) {
        quantity = Math.floor(Math.random() * 400) + 100;
      } else if (listingId > meh) {
        quantity = Math.floor(Math.random() * 40) + 10;
      } else {
        quantity = Math.floor(Math.random() * 5) + 1;
      }
      if (test) {
        quantity = 2;
      }
      let progress = (1 - (listingId / num)) * 100;
      if (progress > nextProgress) {
        progress = Math.trunc(progress);
        printProgress(Math.trunc(progress));
        nextProgress = progress + 1;
      }

      // console.log('listingId: ', listingId);
      // console.log('Number of Reviews: ', quantity);
      if (listingId === 1) {
        writeStream.write(generateListingReviews(quantity, listingId), encoding, cb);
      } else {
        ok = writeStream.write(generateListingReviews(quantity, listingId), encoding);
      }
      listingId -= 1;
    }
    if (listingId > 0) {
      writeStream.once('drain', write);
    }
  };

  // writeStream.write(headerCSV, encoding);
  write();
};

const writeStreamCSV = fs.createWriteStream(`${outputFile}`);

generateData(writeStreamCSV, 'utf8', numberOfListings, (err) => {
  if (err) {
    console.log(err);
  } else {
    printProgress(100);
    console.log('Rows Created: ', count);
    t1 = Date.now();
    let seconds = (t1 - t0) / 1000;
    const hours = parseInt(seconds / 3600, 10);
    seconds %= 3600;
    const minutes = parseInt(seconds / 60, 10);
    seconds %= 60;
    console.log(`${hours}H, ${minutes}M, ${seconds}S`);
  }
});
