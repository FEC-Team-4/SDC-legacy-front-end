import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FiPlus } from 'react-icons/fi';
import { ReviewsContext } from './Rating_and_Reviews.jsx';
import Review from './Review.jsx';
import AddReview from './AddReview.jsx';

const ReviewsList = () => {
  const [ displayReviewsAmount, setDisplayReviewsAmount ] = useState(2);
  const [ addReviewClicked, setAddReviewClicked ] = useState(false);
  const { reviews, prodId, getReviewsData, starFilteredList, numberOfFilters } = useContext(ReviewsContext);

  let numberOfTotalReviews = reviews.length;
  let currNumberOfReviews = numberOfFilters ? starFilteredList.length : numberOfTotalReviews;

  const displayedReviews = () => {
    let displayed = numberOfFilters
      ? starFilteredList.slice(0, displayReviewsAmount)
      : reviews.slice(0, displayReviewsAmount);

    return displayed.map(reviewData => <Review key={reviewData.review_id} reviewData={reviewData} />);
  }

  const handleMoreReviewsClick = () => {
    if (currNumberOfReviews > displayReviewsAmount) {
      setDisplayReviewsAmount(displayReviewsAmount + 2);
    }
  }

  const handleAddAReviewClick = () => {
    setAddReviewClicked(true);
  }

  const handleAddReviewClose = () => {
    setAddReviewClicked(false);
  }

  return (
    <div className="col-md-8">
      <div>
        {numberOfTotalReviews} reviews, sorted by
        <select onChange={(e) => getReviewsData(e.target.value) }>
          <option value={'relevant'}>relevant</option>
          <option value={'newest'}>newest</option>
          <option value={'helpful'}>helpful</option>
        </select>
      </div>
      <div className="row reviews-list">
        {displayedReviews()}
      </div>
      <div className="row mt-2">
        {(currNumberOfReviews > 2) &&
        <div className="col align-self-start">
          <button className="btn btn-outline-dark" onClick={handleMoreReviewsClick} >MORE REVIEWS</button>
        </div>
        }
        <div className="col  align-self-end">
          <button className="btn btn-outline-dark" onClick={handleAddAReviewClick}><FiPlus size={'1.25em'}/> ADD A REVIEW</button>
        </div>
      </div>
      {currNumberOfReviews === 0 && <div>There are no reviews!</div>}
      {(currNumberOfReviews !== 0 && currNumberOfReviews <= displayReviewsAmount) && <div>These are all the reviews!</div>}
      <Modal dialogClassName="add-review" show={addReviewClicked} onHide={handleAddReviewClose}>
        <Modal.Header>
          <Modal.Title>Add a Review!</Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleAddReviewClose}></button>
        </Modal.Header>
        <Modal.Body>
          <AddReview product_id={prodId} handleAddReviewClose={handleAddReviewClose} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ReviewsList;