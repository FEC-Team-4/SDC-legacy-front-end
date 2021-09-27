import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import ReviewsMetaData from './ReviewsMetaData.jsx';

export const ReviewsContext = createContext();

const Reviews = (props) => {
  const [ reviewsData, setReviewsData ] = useState({
    reviews: [],
    reviewsMetaData: {
      "product_id": "",
      "ratings": {
          "1": "",
          "2": "",
          "3": "",
          "4": "",
          "5": ""
      },
      "recommended": {
          "false": "",
          "true": ""
      },
      "characteristics": {
          "Fit": {
              "id": 0,
              "value": ""
          },
          "Length": {
              "id": 0,
              "value": ""
          },
          "Comfort": {
              "id": 0,
              "value": ""
          },
          "Quality": {
              "id": 0,
              "value": ""
          },
          "Width": {
              "id": 0,
              "value": ""
          },
          "Size": {
              "id": 0,
              "value": ""
          }
      }
    },
    prodId: props.prodId,
    sortParam: 'relevance',
    starFilteredList: [],
    starRatingsClicked: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    },
    numberOfFilters: 0
  });
  const { reviews, reviewsMetaData, sortParam, starFilteredList, starRatingsClicked, numberOfFilters } = reviewsData;

  const getReviewsData = (sorter) => {
    let config = {
      params: {
        sortBy: sorter
      }
    }

    axios.get(`/api/reviews/${props.prodId}`, config)
      .then(results => {
        if (numberOfFilters) {
          setReviewsData(prevReviewsData => ({
            ...prevReviewsData,
            starFilteredList: []
          }));

          let filteredReviews = results.data.results.filter(review => {
            for (const rating  in starRatingsClicked) {
              if (starRatingsClicked[rating] && Number(rating) === review.rating) {
                return true;
              }
            }
          })

          setReviewsData(prevReviewsData => ({
            ...prevReviewsData,
            starFilteredList: [...prevReviewsData.starFilteredList, ...filteredReviews]
          }))
        }

        setReviewsData(prevReviewsData => ({
          ...prevReviewsData,
          reviews: results.data.results,
          sortParam: sorter
        }));
      })
      .catch(err => console.log(`Couldn't fetch reviews :(`, err));
  };

  const getReviewsMetaData =(() => {
    axios.get(`/api/reviews/meta/${props.prodId}`)
      .then((results) => {
        setReviewsData(prevReviewsData =>({
          ...prevReviewsData,
          reviewsMetaData: {
            "product_id": results.data.product_id,
            "ratings": {...prevReviewsData.reviewsMetaData.ratings, ...results.data.ratings},
            "recommended": results.data.recommended,
            "characteristics": results.data.characteristics
          }
        }));
      })
      .catch((err) => console.log(`Couldn't get the metadata on reviews :(`, err));
  });

  const handleStarRatingClick = (e) => {
    let starRating = e.target.dataset.rating;
    let filteredReviews = reviews.filter(review => Number(starRating) === review.rating);

    if (!starRatingsClicked[starRating]) {
      setReviewsData(prevReviewsData => ({
        ...prevReviewsData,
        starFilteredList: [...prevReviewsData.starFilteredList, ...filteredReviews],
        starRatingsClicked: {...prevReviewsData.starRatingsClicked, [starRating]: true},
        numberOfFilters: prevReviewsData.numberOfFilters + 1
      }));

      return;
    }

    filteredReviews = starFilteredList.filter(review => Number(starRating) !== review.rating);
    setReviewsData(prevReviewsData => ({
      ...prevReviewsData,
      starFilteredList: filteredReviews,
      starRatingsClicked: {...prevReviewsData.starRatingsClicked, [starRating]: false},
      numberOfFilters: prevReviewsData.numberOfFilters - 1
    }));
  }

  const handleResetFilterClick = () => {
    setReviewsData(prevReviewsData => ({
      ...prevReviewsData,
      starFilteredList: [],
      numberOfFilters: 0,
      starRatingsClicked: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      }
    }));
  }

  const providerValue = {
    ...reviewsData,
    getReviewsData,
    handleStarRatingClick,
    handleResetFilterClick
  }

  useEffect(() => {
    getReviewsData(sortParam);
    getReviewsMetaData();
  }, [props.prodId]);

  return (
    <div className="row mx-3 my-5">
      <div className="row lead">RATINGS & REVIEWS</div>
      <div className="row justify-content-center">
        <ReviewsContext.Provider value={providerValue}>
          <ReviewsMetaData />
          <ReviewsList />
        </ReviewsContext.Provider>
      </div>
    </div>
  )
}

export default Reviews;
