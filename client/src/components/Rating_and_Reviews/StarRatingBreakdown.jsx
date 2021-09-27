import React, { useContext } from 'react';
import { ReviewsContext } from './Rating_and_Reviews.jsx';

const StarRatingBreakdown = ({ ratings, totalStarRatings }) => {
  const { handleStarRatingClick, starRatingsClicked, numberOfFilters, handleResetFilterClick } = useContext(ReviewsContext)
  let starRatings = Object.keys(ratings);
  let reversedRatings = [...starRatings].reverse();
  let selectedRatings = starRatings.filter(rating => starRatingsClicked[rating]).join(', ');

  return (
    <div className="row">
      <div className="h5 mt-1">Rating Breakdown</div>
      {!!numberOfFilters && <div className="row">
        {selectedRatings} star rating filter applied | <span className="text-decoration-underline" style={{cursor: 'pointer'}} onClick={() => handleResetFilterClick()}>Reset review filter</span>
      </div>}
      {totalStarRatings() > 0 && <div className="row">
        {reversedRatings.map(rating => {
          return (
            <div className="row align-items-center" style={{cursor: 'pointer'}} key={rating} data-rating={rating} onClick={(e) => handleStarRatingClick(e)}>
              <div className="col text-decoration-underline star-ratings" data-rating={rating}>{rating} stars</div>
              <div className="col px-0 rating-graph">
                <div className="rating-percent" style={{width: `${(Math.floor((ratings[rating] / totalStarRatings()) * 100))}%`}} data-rating={rating}></div>
              </div>
            </div>
          )
        })}
      </div>}
    </div>
  )
};

export default StarRatingBreakdown;