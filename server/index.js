/* eslint-disable import/newline-after-import */
require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const redis = require('redis');
const path = require('path');
const model = require('./db/model');

const port = 3000;
const { REDIS_PORT } = process.env;

const client = redis.createClient(REDIS_PORT);

const cache = (req, res, next) => {
  const listing = req.params.listingId;
  client.get(listing, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
};

app.use('/:listingid', express.static(path.join(__dirname, '../client/dist')));

app.get('/:listingId/reviews', cache, (req, res) => {
  // console.log('GET:', req.params);
  const listing = req.params.listingId;
  model.getByListing(listing)
    .then((data) => {
      client.setex(listing, 300, JSON.stringify(data.rows));
      res.send(JSON.stringify(data.rows));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/:listingId/reviews', (req, res) => {
  model.postReview(req.params.listingId, req.body)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).send(err));
});

app.listen(port, () => console.log(`reviews-express listening on port ${port}`));
