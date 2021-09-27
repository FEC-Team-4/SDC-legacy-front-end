import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ReviewsContext } from './Rating_and_Reviews.jsx';
import StarRatingBreakdown from './StarRatingBreakdown.jsx';
import CharacteristicsBreakdown from './CharacteristicsBreakdown.jsx';

const ReviewsMetaData = () => {
  const { reviewsMetaData, prodId } = useContext(ReviewsContext)
  const { ratings, recommended, characteristics } = reviewsMetaData;

  const totalStarRatings = () => {
    let sum = 0;

    for (const rating in ratings) {
      sum += Number(ratings[rating]);
    }

    return sum;
  }

  const totalRecommended = () => {
    return Number(recommended.false) + Number(recommended.true);
  }

  const calculateAverage = (ratings) => {
    let sum = 0;
    for (var rating in ratings) {
      sum += rating * ratings[rating];
    }

    return (sum / totalStarRatings()).toPrecision(2);
  }

  let percentRecommended = Math.floor((recommended.true / totalRecommended()) * 100)

  return (
    <div className="col-md-4" style={{height: '70%'}}>
      <div className="row">
        {(calculateAverage(ratings) > 0 && calculateAverage(ratings) !== Infinity) && <div className="col-sm-auto h1">{calculateAverage(ratings)}</div>}
        <div className="col-sm-auto">star rating</div>
      </div>
      {(percentRecommended > 0 && percentRecommended !== Infinity) && <div>{percentRecommended}% of reviews recommend this product</div>}
      <StarRatingBreakdown ratings={ratings} totalStarRatings={totalStarRatings} />
      <CharacteristicsBreakdown characteristics={characteristics} />
    </div>
  )
}

export default ReviewsMetaData;