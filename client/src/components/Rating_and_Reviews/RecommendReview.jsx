import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

const RecommendReview = () => {
  const methods = useFormContext();
  const { register, formState: { errors } } = methods;

  return (
    <div className="row mt-2">
      <Form.Label>Would you recommend this product? *</Form.Label>
      <div className="form-check-inline form-check">
        <div className="form-check-inline form-check">
            <input
              className="form-check-input"
              type="radio"
              name="recommend"
              value={true}
              {...register("recommend", { required: { value: true, message: 'Please select an option.' }})} ></input>
          <label className="form-check-label">
            Yes
          </label>
        </div>
        <div className="form-check-inline form-check">
            <input
              className="form-check-input"
              type="radio"
              name="recommend"
              value={false}
              {...register("recommend", { required: { value: true, message: 'Please select an option.' }})} ></input>
          <label className="form-check-label">
            No
          </label>
        </div>
      </div>
      {errors.recommend && <Form.Text className="text-danger text-opacity-80">
        {errors.recommend.message}
      </Form.Text>}
    </div>
  )
}

export default RecommendReview;