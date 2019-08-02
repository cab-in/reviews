const pool = require('./index.js');

module.exports = {

  getByListing: (listingId, startingIndex = 0) => {
    const query = `
      SELECT r.*, u.*, h.* 
      FROM review r
      LEFT JOIN users u
      ON r.user_id = u.user_id
      LEFT JOIN hosts h 
      ON h.host_id = r.host_id
      where r.listing_id = ${listingId} 
      ORDER BY r.created_at DESC 
      LIMIT 100 
      OFFSET ${startingIndex};
      `;
    return pool.query(query);
  },

  getByUser: (userId, startingIndex = 0) => {
    const query = `
      SELECT r.*, u.*, h.* 
      FROM review r
      LEFT JOIN users u
      ON r.user_id = u.user_id
      LEFT JOIN hosts h 
      ON h.host_id = r.host_id
      where r.user_id = ${userId} 
      ORDER BY r.created_at DESC 
      LIMIT 100 
      OFFSET ${startingIndex};
      `;
    return pool.query(query);
  },

  postReview: (listingId, review) => {
    const query = `
      INSERT INTO review 
      (
        review_id,
        listing_id,
        user_id,
        created_at,
        text,
        overall_rating,
        accuracy_rating,
        communication_rating,
        cleanliness_rating,
        location_rating,
        check_in_rating,
        value_rating,
        has_response,
        host_id,
        response_text,
        response_created_at,
      )
      VALUES
      (
        ${listingId},
        ${review.userId},
        ${new Date()},
        ${review.text},
        ${review.overallRating},
        ${review.accuracyRating},
        ${review.communicationRating},
        ${review.cleanlinessRating},
        ${review.locationRating},
        ${review.checkInRating},
        ${review.valueRating},
        null,
        null,
        null,
        null,
      );
    `;
    return pool.query(query);
  },

  addResponse: (reviewId, response) => {
    const query = `
    UPDATE review
    SET 
    has_response = ${true},
    host_id = ${response.hostId},
    response_text = ${response.text},
    response_created_at = ${new Date()},
    WHERE review_id = ${reviewId};
    `;
    return pool.query(query);
  },

  patchReview: (reviewId, column, value) => {
    const query = `
      UPDATE review
      SET ${column} = ${value}
      WHERE review_id = ${reviewId};
    `;
    return pool.query(query);
  },

  putReview: (reviewId, review) => {
    const query = `
      UPDATE review
      SET 
      text = ${review.text},
      overall_rating = ${review.overallRating},
      accuracy_rating = ${review.accuracyRating},
      communication_rating = ${review.communicationRating},
      cleanliness_rating = ${review.cleanlinessRating},
      location_rating = ${review.locationRating},
      check_in_rating = ${review.checkInRating},
      value_rating = ${review.valueRating},
      WHERE review_id = ${reviewId};
    `;
    return pool.query(query);
  },

  deleteReview: (reviewId) => {
    const query = `DELETE FROM review WHERE review_id = ${reviewId};`;
    pool.query(query);
  },

};
