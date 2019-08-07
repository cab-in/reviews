const model = require('./model');

model.getByListing(21)
  .then(res => console.log(res))
  .catch(err => console.log(err));