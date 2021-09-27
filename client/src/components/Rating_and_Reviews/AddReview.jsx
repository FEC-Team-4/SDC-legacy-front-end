import React, { useState, useContext } from 'react';
import axios from 'axios';
import validator from 'email-validator';
import { Form } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { ReviewsContext } from './Rating_and_Reviews.jsx';
import CharacteristicsReviewList from './CharacteristicsReviewList.jsx';
import StarRatingReview from './StarRatingReview.jsx';
import RecommendReview from './RecommendReview.jsx';

const AddReview = ({ product_id, handleAddReviewClose }) => {
  const { reviewsMetaData } = useContext(ReviewsContext);
  const { characteristics } = reviewsMetaData;
  const characteristicsById = {};

  for (const characteristic in characteristics) {
    characteristicsById[characteristics[characteristic].id] = 0;
  }

  const methods = useForm({
    defaultValues: {
      name: '',
      email: '',
      summary: '',
      body: '',
      rating: 0,
      photos: '',
      characteristics: '',
      recommend: ''
    }
  });
  const { register, handleSubmit, formState: { errors }, watch } = methods;
  const watchFields = watch(['body', 'photos'], {"body": '', 'photos': []});

  const handleReviewSubmit = (reviewForm) => {
    const { characteristics, photos } = reviewForm;
    const newCharacteristics = {};
    const photosURLs = [...photos].map(photo => URL.createObjectURL(photo));

    for (const id in characteristics) {
      newCharacteristics[id.slice(1)] = Number(characteristics[id]);
    }

    console.log({...reviewForm, rating: Number(reviewForm.rating), characteristics: newCharacteristics, recommend: reviewForm.recommend === 'true', photos: photosURLs});

    axios.post(`/api/reviews/${product_id}`, {
      ...reviewForm,
      rating: Number(reviewForm.rating),
      characteristics: newCharacteristics,
      recommend: reviewForm.recommend === 'true',
      photos: photosURLs
    })
      .then(() => console.log('Added review successfully! :)'))
      .catch((err) => console.log(`Couldn't add the review :(`, err))
      .then(() => handleAddReviewClose());
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleReviewSubmit)}>
        <div className="row">
          {Object.keys(errors).length > 0 && <div className="col text-danger text-opacity-80">Please check fields for any errors.</div>}
          <div className="col text-end">* indicates a required field</div>
        </div>
        <StarRatingReview />
        <RecommendReview />
        <CharacteristicsReviewList characteristics={characteristics} />
        <div className="row mt-2">
          <Form.Group>
            <Form.Label>Review Summary</Form.Label>
            <Form.Control
              type="text"
              name="summary"
              placeholder="Example: Best purchase ever!"
              {...register("summary", {
                required: false,
                maxLength: { value: 60, message: 'Must be less than 60 characters.'}
              })}>
            </Form.Control>
            {errors.summary && <Form.Text className="text-danger text-opacity-80">
              {errors.summary.message}
            </Form.Text>}
          </Form.Group>
        </div>
        <div className="row mt-2">
          <Form.Group>
            <Form.Label>Review Body *</Form.Label>
            <Form.Control
              as="textarea"
              name="body"
              placeholder="Why did you like this product or not?"
              {...register("body", {
                required: {value: true, message: 'Please include a review of the product.'},
                minLength: {value: 50, message: 'Must be at least 50 characters.'},
                maxLength: {value: 1000, message: 'Must be less than 1000 characters.'}
              })}>
            </Form.Control>
            {errors.body && <Form.Text className="text-danger text-opacity-80">
              {errors.body.message}
            </Form.Text>}
            {watchFields[0].length < 50 && <Form.Text muted>
              Minimun required characters left: {50 - watchFields[0].length}
            </Form.Text>}
          </Form.Group>
        </div>
        {[...watchFields[1]].length > 0 &&
          <div className="row mt-2">
            {[...watchFields[1]].map((photo, index) => {
              return (
                <div className="col-auto" key={index} style={{width:100, height:100, borderRadius: '50%'}}>
                  <img className="img-thumbnail col" src={URL.createObjectURL(photo)} style={{maxHeight:'100%', maxWidth:'100%'}}></img>
                </div>
              )
            })}
          </div>}
        {[...watchFields[1]].length < 5 &&
          <div className="row mt-2">
            <input
              type="file"
              accept="image/*"
              multiple
              name="photos"
              {...register("photos", {required: false})}></input>
          </div>}
        <div className="row mt-2">
          <Form.Group>
            <Form.Label>Nickname *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              {...register("name", {
                required: { value: true, message: 'Please include a nickname.' },
                maxLength: {value: 60, message: 'Must be less than 60 characters.'}
              })}></Form.Control>
            {errors.name && <Form.Text className="text-danger text-opacity-80">
              {errors.name.message}
            </Form.Text>}
          </Form.Group>
          <Form.Text muted>For privacy reasons, do not use your full name or e-mail address</Form.Text>
        </div>
        <div className="row mt-2">
          <Form.Group>
            <Form.Label>E-mail *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              {...register("email", {
                required: { value: true, message: 'Please include an email address.' },
                validate: value => validator.validate(value) || 'Please provide a valid email address'
              })}></Form.Control>
            {errors.email && <Form.Text className="text-danger text-opacity-80">
              {errors.email.message}
            </Form.Text>}
            <Form.Text muted>For authentication reasons, you will not be emailed</Form.Text>
          </Form.Group>
        </div>
        <div className="row justify-content-end mt-2">
          <div>
            <button className="btn btn-outline-dark">Submit!</button>
          </div>
        </div>
      </Form>
    </FormProvider>
  )
}

export default AddReview;