/* eslint-disable import/newline-after-import */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const model = require('./db/model');

const port = 3000;

app.use('/:listingid', express.static(path.join(__dirname, '../client/dist')));

app.get('/:listingId/reviews', (req, res) => {
  console.log('GET:', req.params);
  model.getByListing(req.params.listingId)
    .then((data) => {
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
