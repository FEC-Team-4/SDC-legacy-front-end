import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { IoIosStarOutline, IoIosStar } from 'react-icons/io';

const StarRatingReview = () => {
  const methods = useFormContext();
  const { register, watch, formState: { errors } } = methods;
  const ratingSelected = watch('rating')

  const ratingDescriptor = () => {
    if (ratingSelected === '1') {
      return 'Poor';
    }

    if (ratingSelected === '2') {
      return 'Fair';
    }

    if (ratingSelected === '3') {
      return 'Average';
    }

    if (ratingSelected === '4') {
      return 'Good';
    }

    if (ratingSelected === '5') {
      return 'Great';
    }
  }

  return (
    <div className="row mt-2">
      <Form.Group>
        <Form.Label>Overall Rating *</Form.Label>
        <div className="row align-items-center">
          {[...Array(5)].map((starRating, index) => {
            index += 1;
            return (
              <label className="col-auto px-1" style={{transform: 'translate(0.5em, -0.25em)'}} key={`star ${index}`}>
                <input
                  className="star-rating"
                  type="radio"
                  key={index}
                  value={index}
                  name="rating"
                  {...register("rating", { required: { value: true, message: 'Please select a rating.' }})}/>
                {index <= ratingSelected && <IoIosStar size={'2em'} key={`up to star ${index}`}/>}
                {index > ratingSelected && <IoIosStarOutline size={'2em'} key={`less than star ${index}`}/>}
              </label>
            )
          })}
          <label className="col">{ratingDescriptor()}</label>
        </div>
        {errors.rating && <Form.Text className="text-danger text-opacity-80">
          {errors.rating.message}
        </Form.Text>}
      </Form.Group>
    </div>
  )
}

export default StarRatingReview;