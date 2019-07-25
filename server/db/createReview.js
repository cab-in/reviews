const faker = require('faker');

// reviews: {
//   reviewId: String,
//   listingId: String,
//   userId: String,
//   createdAt: Date,
//   text: String,
//   overallRating: Number,
//   accuracyRating: Number,
//   communicationRating: Number,
//   cleanlinessRating: Number,
//   locationRating: Number,
//   checkInRating: Number,
//   valueRating: Number,
//   hasResponse: Boolean,
//   hostId: String,
//   responseText: String,
//   responseCreatedAt: Date,
// }

const generateReview = (listingId) => {
  const random = faker.random.number({ min: 0, max: 100 });
  const rating = Math.round(faker.finance.amount(1, 5, 1) / 0.5) * 0.5;
  const review = {
    // reviewId: String,
    listingId,
    userId: faker.finance.amount(1, 200, 0),
    createdAt: faker.date.past(),
    text: random % 2 === 0 ? faker.lorem.paragraph() : faker.lorem.paragraphs(),
    overallRating: rating,
    accuracyRating: Math.round(faker.finance.amount(1, 5, 1) / 0.5) * 0.5,
    communicationRating: Math.round(faker.finance.amount(1, 5, 1) / 0.5) * 0.5,
    cleanlinessRating: Math.round(faker.finance.amount(1, 5, 1) / 0.5) * 0.5,
    locationRating: Math.round(faker.finance.amount(1, 5, 1) / 0.5) * 0.5,
    checkInRating: Math.round(faker.finance.amount(1, 5, 1) / 0.5) * 0.5,
    valueRating: Math.round(faker.finance.amount(1, 5, 1) / 0.5) * 0.5,
    hasResponse: false,
  };

  if (random % 3 === 0) {
    review.hostId = faker.finance.amount(201, 1000, 0);
    review.responseText = faker.lorem.sentence();
    let today = new Date();
    today = today.toISOString().slice(0, 10);
    const reviewdate = review.createdAt.toISOString().slice(0, 10);
    review.responseCreatedAt = faker.date.between(reviewdate, today);
  }

  return review;
};

for (let i = 1; i < 1000000; i += 1) {
  generateReview(i);
}

// const reviews = [];
// for (let j = 0; j < numReviews; j += 1) {
//   const review = {};

//   // generate data for review object
//   const created_at = faker.date.past();
//   const textShort = faker.lorem.paragraph();
//   const textLong = faker.lorem.paragraphs();
//   const username = faker.name.firstName();
//   const avatar = faker.internet.avatar();
//   const response_text = faker.lorem.sentence();
//   // console.log('start: ', created_at.slice(0, 11));
//   const start = created_at.toISOString().slice(0, 10);
//   const currentDate = new Date();
//   const end = currentDate.toISOString().slice(0, 10);
//   const response_created_at = faker.date.between(start, end);

//   // random number to determine if this review has text longer than 50 words
//   const random_reviewLength = faker.random.number({ min: 0, max: 100 });

//   // random number to determine if this review has a response
//   const random_hasResponse = faker.random.number({ min: 0, max: 100 });

//   // populate empty review object
//   // if random number is divisible by 3, review object WILL have a response.
//   // if not, the review object will NOT have a response
//   if (random_hasResponse % 3 === 0) {
//     review.created_at = created_at;
//     review.text = random_reviewLength % 2 === 0 ? textShort : textLong;
//     review.username = username;
//     review.avatar = avatar;
//     review.hasResponse = true;
//     review.response_username = response_username;
//     review.response_avatar = response_avatar;
//     review.response_created_at = response_created_at;
//     review.response_text = response_text;
//   } else {
//     review.created_at = created_at;
//     review.text = random_reviewLength % 2 === 0 ? textShort : textLong;
//     review.username = username;
//     review.avatar = avatar;
//     review.hasResponse = false;
//   }

//   // add the populated review object into the reviews array
//   reviews.push(review);
// }