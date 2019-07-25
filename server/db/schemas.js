listings: {
  listingId: String,
  hostId: String,
  .
  .
  . 
  overallRating: Number,
  accuracyRating: Number,
  communicationRating: Number,
  cleanlinessRating: Number,
  locationRating: Number,
  checkInRating: Number,
  valueRating: Number,
  numReviews: Number,
}

reviews: {
  reviewId: String,
  listingId: String,
  userId: String,
  createdAt: Date,
  text: String,
  overallRating: Number,
  accuracyRating: Number,
  communicationRating: Number,
  cleanlinessRating: Number,
  locationRating: Number,
  checkInRating: Number,
  valueRating: Number,
  hasResponse: Boolean,
  hostId: String,
  responseText: String,
  responseCreatedAt: Date,
}

user: {
  userId: String,
  firstName: String,
  lastName: String,
  avatar: String, //PhotoId or url
}