# Project Name

> Project description

Reviews:

Create | **POST** | **/:listingId/reviews** |  create a new review for a listing
      post body: {
        listing_id: ,
        user_id: ,
        text: ,
        overall_rating: ,
        accuracy_rating: ,
        communication_rating: ,
        cleanliness_rating: ,
        location_rating: ,
        check_in_rating: ,
        value_rating: ,
      }
Read | **GET** | **/:listingId/reviews** | read all reviews for a listing
  response Body: {
      review_id
      listing_id
      user_id
      created_at
      text
      overall_rating
      accuracy_rating
      communication_rating
      cleanliness_rating
      location_rating
      check_in_rating
      value_rating
      has_response
      host_id
      response_text
      response_created_at
      user_id
      first_name
      last_name
      avatar
      host_id
      host_first_name
      host_last_name
      host_avatar
    }
Update | **PUT** | **/:listingId/reviews/:reviewId** | update a review for a listing
Update | **PATCH** | **/:listingId/reviews/:reviewId** | update part of a review for a listing
Delete | **DELETE** | **/:listingId/reviews/:reviewId** | delete a review for a listing


## Related Projects

  - https://github.com/bedroost/gallery
  - https://github.com/bedroost/description
  - https://github.com/bedroost/booking

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

